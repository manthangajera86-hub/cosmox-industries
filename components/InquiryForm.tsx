"use client";

import { useActionState, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";
import { sendInquiry } from "@/lib/send-inquiry";
import {
  initialInquiryState,
  inquiryDivisions,
  inquiryFields,
  inquiryMaxLength,
  inquiryTrapField,
  inquiryTypes,
  quoteFormValues,
  quoteRequestValues,
  type InquiryField,
  type QuoteRequest,
} from "@/lib/inquiry";
import { ChevronIcon } from "@/components/icons";

type InquiryFormProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  /** A quote request to start the form with, in place of one carried by the page's address. */
  quote?: QuoteRequest;
  /** Guidance beside the form: what to include, what happens next. */
  children: ReactNode;
};

// The page's query string doesn't change while the form is on screen, so there is nothing to listen for.
const subscribeToNothing = () => () => {};

/** Contact form beside guidance text; checked in the browser and delivered by Web3Forms (lib/send-inquiry.ts). */
export default function InquiryForm({ id, label, title, quote, children }: InquiryFormProps) {
  const [state, formAction, pending] = useActionState(sendInquiry, initialInquiryState);
  const { errors, values } = state;
  const statusRef = useRef<HTMLParagraphElement>(null);

  // "Request a quote" links on the product pages carry the division and product, so the form
  // starts with them filled in. Read on the client only: the page itself stays static.
  const search = useSyncExternalStore(
    subscribeToNothing,
    () => window.location.search,
    () => "",
  );
  const quoteRequest = useMemo(() => (quote ? quoteFormValues(quote) : quoteRequestValues(search)), [quote, search]);
  const initial = state.attempt === 0 ? quoteRequest : {};

  // The form remounts after each submission, which drops focus. Send it to the first field
  // that needs fixing, or to the result message so screen-reader users hear the outcome.
  useEffect(() => {
    if (state.attempt === 0) return;
    const invalid = inquiryFields.find((name) => state.errors[name]);
    if (invalid) document.getElementById(`inquiry-${invalid}`)?.focus();
    else statusRef.current?.focus();
  }, [state]);

  // Wires a field's label, error message and aria attributes together.
  const field = (name: InquiryField) => ({
    id: `inquiry-${name}`,
    name,
    defaultValue: values[name] ?? initial[name] ?? "",
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `inquiry-${name}-error` : undefined,
  });
  const textField = (name: InquiryField) => ({ ...field(name), maxLength: inquiryMaxLength[name] });
  const error = (name: InquiryField) =>
    errors[name] && (
      <p className="inquiry-error" id={`inquiry-${name}-error`}>
        {errors[name]}
      </p>
    );

  return (
    <section id={id} className="inquiry" aria-labelledby="inquiry-title">
      <div className="container inquiry-inner">
        <div className="inquiry-side">
          <p className="statement-label">{label}</p>
          <h2 className="inquiry-title" id="inquiry-title">
            {title}
          </h2>
          <div className="inquiry-guidance">{children}</div>
        </div>

        <div className="inquiry-form">
          {/* Remount after each submission, and once a quote request is read, so the fields pick up the new values. */}
          <form key={`${state.attempt}${search}`} action={formAction} noValidate>
            <div className="inquiry-grid">
              <div>
                <label htmlFor="inquiry-name">Full name *</label>
                <input type="text" autoComplete="name" required {...textField("name")} />
                {error("name")}
              </div>
              <div>
                <label htmlFor="inquiry-company">Company</label>
                <input type="text" autoComplete="organization" {...textField("company")} />
              </div>
              <div>
                <label htmlFor="inquiry-email">Business email *</label>
                <input type="email" autoComplete="email" required {...textField("email")} />
                {error("email")}
              </div>
              <div>
                <label htmlFor="inquiry-phone">Phone</label>
                <input type="tel" autoComplete="tel" {...textField("phone")} />
              </div>
              <div>
                <label htmlFor="inquiry-country">Country / region *</label>
                <input type="text" autoComplete="country-name" required {...textField("country")} />
                {error("country")}
              </div>
              <div>
                <label htmlFor="inquiry-type">Inquiry type *</label>
                <select required {...field("type")}>
                  <option value="">Choose one…</option>
                  {inquiryTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                {error("type")}
              </div>
              <div className="inquiry-wide">
                <label htmlFor="inquiry-division">Business division (optional)</label>
                <select {...field("division")}>
                  <option value="">Not specific to one division</option>
                  {inquiryDivisions.map((division) => (
                    <option key={division}>{division}</option>
                  ))}
                </select>
                {error("division")}
              </div>
              <div className="inquiry-wide">
                <label htmlFor="inquiry-message">Your requirement *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Product, specification, quantity, application, destination, timeline…"
                  {...textField("message")}
                />
                {error("message")}
              </div>
            </div>

            {/* Hidden from people; submissions that fill it are flagged as likely spam. */}
            <div className="inquiry-trap" aria-hidden="true">
              <label htmlFor="inquiry-trap">Leave this field empty</label>
              <input type="text" id="inquiry-trap" name={inquiryTrapField} tabIndex={-1} autoComplete="off" />
            </div>

            <div className="inquiry-actions">
              <button type="submit" className="pill-link pill-link-solid" disabled={pending}>
                {pending ? "Sending…" : "Submit Inquiry"}
                <ChevronIcon />
              </button>
            </div>
          </form>
          {/* Outside the remounted form, so the live region persists and its updates are announced. */}
          <p
            ref={statusRef}
            className={`inquiry-status is-${state.status}`}
            role="status"
            aria-live="polite"
            tabIndex={-1}
          >
            {state.message}
          </p>
        </div>
      </div>
    </section>
  );
}
