// api/contact.mjs  (ESM)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const html = ({ name, email, message }) => `<!doctype html>
<html><body style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
<div style="max-width:640px;margin:auto;padding:16px;border:1px solid #eee;border-radius:12px">
  <h2 style="margin:0 0 8px">New portfolio contact</h2>
  <p style="margin:0 0 8px"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
  <pre style="white-space:pre-wrap;background:#fafafa;border:1px solid #eee;border-radius:8px;padding:12px;margin:0">${message}</pre>
</div>
</body></html>`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
    console.error('Missing env vars');
    return res.status(500).json({ ok:false, error:'Email not configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name = '', email = '', message = '', company = '' } = body || {};

    // honeypot
    if (company && company.trim() !== '') return res.status(204).end();

    if (!name || !email || !message) {
      return res.status(400).json({ ok:false, error:'Invalid input' });
    }

    const resp = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'onboarding@resend.dev',
      to: process.env.CONTACT_TO,
      subject: 'Portfolio: New message',
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: html({ name, email, message }),
    });

    if (resp?.error) return res.status(502).json({ ok:false, error:'Email service error' });
    return res.status(200).json({ ok:true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, error:'Server error' });
  }
}
