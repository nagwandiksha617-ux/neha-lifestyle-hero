import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendLead } from "./contact-leads.server";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().default(""),
  subject: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(2000),
});

export const submitContactLead = createServerFn({ method: "POST" })
  .inputValidator((d) => leadSchema.parse(d))
  .handler(async ({ data }) => {
    try {
      // Prevent formula injection in the sheet
      const clean = (s: string) => (/^[=+\-@]/.test(s) ? `'${s}` : s);
      await appendLead({
        name: clean(data.name), email: clean(data.email), phone: clean(data.phone),
        subject: clean(data.subject), message: clean(data.message),
      });
      return { ok: true as const };
    } catch {
      return { ok: false as const, error: "Message save nahi ho paya. Kripya dobara try karein." };
    }
  });
