import { contact } from "@/lib/site";
import { inquiryTrapField, validateInquiry, type InquiryState } from "@/lib/inquiry";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const TIMEOUT_MS = 15_000;

/**
 * Cosmox's Web3Forms access key. It is public by design (Web3Forms puts it in the page's HTML) and
 * only lets people send email to the inbox it was created for. NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
 * overrides it, e.g. to point a test deployment at another inbox.
 */
const COSMOX_WEB3FORMS_KEY = "c497795b-0428-4899-b0fa-fd077b7e952d";
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || COSMOX_WEB3FORMS_KEY;

const tryEmail = `email us at ${contact.email}`;

/**
 * Checks a contact-form submission and, if it is complete, sends it to Web3Forms, which emails it
 * to the inbox the access key belongs to. Runs in the browser: Web3Forms' free plan refuses
 * submissions sent from a server.
 */
export async function sendInquiry(previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const attempt = previous.attempt + 1;
  const reply = (status: InquiryState["status"], message: string, extra: Partial<InquiryState> = {}): InquiryState => ({
    status,
    message,
    errors: {},
    values: {},
    attempt,
    ...extra,
  });

  const { values, errors } = validateInquiry(formData);
  if (Object.keys(errors).length > 0) {
    return reply("error", "Please check the highlighted fields.", { errors, values });
  }

  // Bots tend to fill every field, including this hidden one. Flag rather than drop, so an
  // inquiry is never lost if a browser's autofill fills it by mistake.
  const suspectedSpam = Boolean(String(formData.get(inquiryTrapField) ?? "").trim());

  const subject = [suspectedSpam && "[Possible spam]", `Website inquiry: ${values.type}`, values.division, `from ${values.name}`]
    .filter(Boolean)
    .join(" · ");

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Cosmox Industries website",
        // Web3Forms makes `email` the reply-to address, so replies go straight to the sender.
        Name: values.name,
        Company: values.company || "—",
        email: values.email,
        Phone: values.phone || "—",
        "Country / region": values.country,
        "Inquiry type": values.type,
        "Business division": values.division || "Not specific to one division",
        Requirement: values.message,
        Page: window.location.href,
        ...(suspectedSpam && { "Spam check": "The hidden anti-spam field was filled in." }),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!response.ok || !result?.success) {
      throw new Error(`Web3Forms responded ${response.status}: ${result?.message ?? "no message"}`);
    }
  } catch (error) {
    console.error("[contact] Could not deliver inquiry:", error);
    return reply("error", `Sorry, we could not send your inquiry. Please try again in a few minutes, or ${tryEmail}.`, {
      values,
    });
  }

  return reply("success", "Thank you. Your inquiry has been received and will be routed to the right team.");
}
