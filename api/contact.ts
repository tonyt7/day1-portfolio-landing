// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const Schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().min(10).max(5000),
  // honeypot (should be empty)
  company: z.string().optional(),
});

const html = (d: {name:string; email:string; message:string}) => `<!doctype html>
<html><body style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
<div style="max-width:640px;margin:auto;padding:16px;border:1px solid #eee;border-radius:12px">
  <h2 style="margin:0 0 8px">New portfolio contact</h2>
  <p style="margin:0 0 8px"><strong>From:</strong> ${d.name} &lt;${d.email}&gt;</p>
  <pre style="white-space:pre-wrap;background:#fafafa;border:1px solid #eee;border-radius:8px;padding:12px;margin:0">${d.message}</pre>
</div>
</body></html>`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok:false, error:'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return res.status(400).json({ ok:false, error:'Invalid input' });
    }

    const { name, email, message, company } = parsed.data;

    // Honeypot: if filled, silently succeed
    if (company && company.trim() !== '') return res.status(204).end();

    // Very-short linky messages → likely spam (soft-accept)
    if (/(https?:\/\/|<a\s)/i.test(message) && message.length < 80) {
      return res.status(202).json({ ok:true });
    }

    const resp = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'portfolio@yourdomain.dev',
      to: process.env.CONTACT_TO || 'you@example.com',
      subject: 'Portfolio: New message',
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: html({ name, email, message }),
    });

    if ('error' in resp && resp.error) {
      return res.status(502).json({ ok:false, error:'Email service error' });
    }

    return res.status(200).json({ ok:true });
  } catch {
    return res.status(500).json({ ok:false, error:'Server error' });
  }
}
