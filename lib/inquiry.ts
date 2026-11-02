import { divisions } from "@/lib/divisions";

/** Choices for the contact form, shared by the form and its server-side validation. */
export const inquiryTypes = [
  "Product & Sales",
  "Technical Inquiry",
  "Custom Requirement",
  "Manufacturing",
  "Supplier & Procurement",
  "Partnership",
  "Research & Innovation",
  "Global Business & Distribution",
  "Sustainability & ESG",
  "Media",
  "Careers",
  "Existing Customer or Supplier",
  "Quality or Safety Matter",
  "General Inquiry",
] as const;

export const inquiryDivisions = divisions.map((division) => division.name);

export const inquiryFields = ["name", "company", "email", "phone", "country", "type", "division", "message"] as const;

export type InquiryField = (typeof inquiryFields)[number];

/** Longest accepted value per field; the form sets these as `maxLength` and the server checks them. */
export const inquiryMaxLength: Record<InquiryField, number> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  country: 80,
  type: 60,
  division: 60,
  message: 5000,
};

/** Name of the hidden anti-spam field. Deliberately unlike any field browsers autofill. */
export const inquiryTrapField = "cx_leave_empty";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<InquiryField, string>>;
  /** What was submitted, so the form can be refilled after an error. */
  values: Partial<Record<InquiryField, string>>;
  /** Changes on every submission, so the form can remount with `values`. */
  attempt: number;
};

export const initialInquiryState: InquiryState = { status: "idle", message: "", errors: {}, values: {}, attempt: 0 };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Reads the form's fields, trimmed, and checks them. No errors means the inquiry can be sent. */
export function validateInquiry(formData: FormData) {
  const values = Object.fromEntries(
    inquiryFields.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  ) as Record<InquiryField, string>;

  const errors: InquiryState["errors"] = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.country) errors.country = "Please tell us your country or region.";
  if (!(inquiryTypes as readonly string[]).includes(values.type)) errors.type = "Please choose an inquiry type.";
  if (values.division && !inquiryDivisions.includes(values.division))
    errors.division = "Please choose a listed division.";
  if (values.message.length < 10) errors.message = "Please describe your requirement in a little more detail.";
  for (const field of inquiryFields) {
    if (!errors[field] && values[field].length > inquiryMaxLength[field]) {
      errors[field] = `Please keep this under ${inquiryMaxLength[field].toLocaleString("en")} characters.`;
    }
  }

  return { values, errors };
}

export type QuoteRequest = { division: string; category?: string; product?: string };

/** Link to the contact form with a quote request started for a division and, optionally, one product. */
export function quoteRequestHref({ division, category, product }: QuoteRequest) {
  const query = new URLSearchParams({ division });
  if (category) query.set("category", category);
  if (product) query.set("product", product);
  return `/contact?${query}#send-us-an-inquiry`;
}

/** Form values for a link made by `quoteRequestHref`, given the page's query string. */
export function quoteRequestValues(search: string): Partial<Record<InquiryField, string>> {
  const query = new URLSearchParams(search);
  const text = (name: string) => (query.get(name) ?? "").trim().slice(0, 200);
  return quoteFormValues({ division: text("division"), category: text("category"), product: text("product") });
}

/** Form values for a quote request: the division, and for one product a message to complete. */
export function quoteFormValues({ division, category, product }: QuoteRequest): Partial<Record<InquiryField, string>> {
  if (!inquiryDivisions.includes(division)) return {};

  const values: Partial<Record<InquiryField, string>> = { type: "Product & Sales", division };
  if (product) {
    values.message = [
      `Product: ${product}`,
      category && `Category: ${category}`,
      "Quantity and unit: ",
      "Grade or specification: ",
      "Delivery destination: ",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return values;
}
