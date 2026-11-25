import { pageSeo } from "@/lib/seo";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContactLead } from "@/lib/contact-leads.functions";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  BadgeCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Instagram,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollectionBreadcrumb } from "@/components/CollectionBreadcrumb";
import { InformationDialog } from "@/components/SiteChrome";

const WHATSAPP_URL = "https://wa.me/919664366547";
const EMAIL = "Er.neha17071993@gmail.com";
const PHONE_DISPLAY = "9664366547";
const PHONE_TEL = "tel:+919664366547";
const INSTAGRAM_URL = "https://www.instagram.com/nehalifestyle_93/";

const description =
  "Questions about an order, a product or a custom design? We are happy to help.";

const SUBJECTS = [
  "Product Enquiry",
  "Order Enquiry",
  "Payment Issue",
  "Shipping & Delivery",
  "Return & Exchange",
  "Other",
] as const;

const messageSchema = z.object({
  name: z.string().trim().nonempty({ message: "Please enter your name." }).max(100, { message: "Name must be under 100 characters." }),
  email: z.string().trim().email({ message: "Please enter a valid email address." }).max(255, { message: "Email must be under 255 characters." }),
  phone: z.string().trim().max(20, { message: "Phone number must be under 20 characters." }).regex(/^[0-9+\-\s()]*$/, { message: "Please enter a valid phone number." }).optional().or(z.literal("")),
  subject: z.enum(SUBJECTS),
  message: z.string().trim().nonempty({ message: "Please write your message." }).max(1000, { message: "Message must be under 1000 characters." }),
});

type MessageForm = z.infer<typeof messageSchema>;
type FormErrors = Partial<Record<keyof MessageForm, string>>;

const contactCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: PHONE_DISPLAY,
    action: { label: "Chat With Us", href: WHATSAPP_URL },
  },
  {
    icon: Mail,
    title: "Email",
    detail: EMAIL,
    action: { label: "Write to Us", href: `mailto:${EMAIL}` },
  },
  {
    icon: Phone,
    title: "Phone",
    detail: PHONE_DISPLAY,
    action: { label: "Call Now", href: PHONE_TEL },
  },
  {
    icon: Instagram,
    title: "Instagram",
    detail: "@nehalifestyle_93",
    action: { label: "Follow", href: INSTAGRAM_URL },
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Jaipur, Rajasthan, India",
    action: {
      label: "View on Map",
      href: "https://www.google.com/maps/search/?api=1&query=Jaipur%2C+Rajasthan",
    },
  },
];

const benefits = [
  { icon: Truck, label: "Free Delivery" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: ShieldCheck, label: "Secure Payment" },
  { icon: BadgeCheck, label: "Authentic Quality" },
];

const helpTopics = ["FAQ", "Shipping", "Returns", "Order Tracking"];

export const Route = createFileRoute("/contact")({
  head: () => pageSeo({ path: "/contact", title: "Contact Us — NEHA Lifestyle", description }),
  component: ContactPage,
});

const inputClass =
  "h-11 w-full border border-gold/30 bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-wine focus:ring-1 focus:ring-wine placeholder:text-foreground/40";

function ContactPage() {
  const [topic, setTopic] = useState<string | null>(null);
  const [form, setForm] = useState<MessageForm>({
    name: "",
    email: "",
    phone: "",
    subject: "Product Enquiry",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const saveLead = useServerFn(submitContactLead);

  function update(field: keyof MessageForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSent(false);
    setSubmitError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const result = messageSchema.safeParse(form);
    if (!result.success) {
      const next: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !next[field as keyof MessageForm]) {
          next[field as keyof MessageForm] = issue.message;
        }
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await saveLead({ data: { ...result.data, phone: result.data.phone ?? "" } });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", subject: "Product Enquiry", message: "" });
      } else {
        setSubmitError(res.error);
      }
    } catch {
      setSubmitError("Message save nahi ho paya. Kripya dobara try karein.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 lg:py-16">
        <CollectionBreadcrumb current="Contact" />
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">
          NEHA Lifestyle · Contact
        </p>
        <h1 className="mt-3 font-display text-4xl font-normal text-wine sm:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70">{description}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div className="space-y-4">
            {contactCards.map(({ icon: Icon, title, detail, action }) => (
              <div
                key={title}
                className="flex items-center gap-4 border border-gold/25 bg-card p-5 shadow-[0_1px_0_0_var(--color-blush,transparent)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-wine">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    {title}
                  </h2>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">{detail}</p>
                </div>
                <a
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                  className="shrink-0 border border-wine/60 px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-wine transition-colors hover:bg-wine hover:text-wine-foreground"
                >
                  {action.label}
                </a>
              </div>
            ))}
          </div>

          <div>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-gold/25 bg-card p-6 sm:p-8"
              aria-label="Send us a message"
            >
              <h2 className="font-display text-2xl font-normal text-wine">Send Us a Message</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                    Name <span className="text-wine">*</span>
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-wine">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                    Email <span className="text-wine">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-1 text-xs text-wine">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                    Phone <span className="font-normal normal-case tracking-normal text-foreground/50">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone ?? ""}
                    onChange={(event) => update("phone", event.target.value)}
                    className={inputClass}
                    placeholder="Your phone number"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-wine">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(event) => update("subject", event.target.value)}
                    className={inputClass}
                  >
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                    Message <span className="text-wine">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    className={`${inputClass} h-32 resize-y py-3`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="mt-1 text-xs text-wine">{errors.message}</p>}
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="mt-6 h-12 w-full rounded-none bg-wine text-xs font-semibold uppercase tracking-[0.22em] text-wine-foreground hover:bg-wine/90"
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
              {sent && (
                <p className="mt-3 text-center text-xs text-foreground/70">
                  Thank you! Aapka message mil gaya hai — hum jald hi aapse contact karenge.
                </p>
              )}
              {submitError && (
                <p role="alert" className="mt-3 text-center text-xs text-wine">{submitError}</p>
              )}
            </form>

            <nav aria-label="Help topics" className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {helpTopics.map((label, index) => (
                <span key={label} className="flex items-center gap-5">
                  {index > 0 && <span aria-hidden="true" className="text-gold/60">|</span>}
                  <Button
                    variant="link"
                    onClick={() => setTopic(label)}
                    className="h-auto rounded-none p-0 text-xs font-semibold uppercase tracking-[0.16em] text-wine no-underline hover:text-wine/70 hover:no-underline"
                  >
                    {label}
                  </Button>
                </span>
              ))}
            </nav>

            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {benefits.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2 border border-gold/20 bg-card px-2 py-4 text-center"
                >
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-foreground/75">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <InformationDialog topic={topic} close={() => setTopic(null)} />
    </main>
  );
}
