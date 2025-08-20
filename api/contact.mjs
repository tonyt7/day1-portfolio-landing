// api/contact.mjs
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

const html = ({ name, email, message }) => `<!doctype html><html><body>
<div style="max-width:640px;margin:auto;padding:16px;border:1px solid #eee;border-radius:12px;font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif">
  <h2 style="margin:0 0 8px">New portfolio contact</h2>
  <p style="margin:0 0 8px"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
  <pre style="white-space:pre-wrap;background:#fafafa;border:1px solid #eee;border-radius:8px;padding:12px;margin:0">${message}</pre>
</div></body></html>`;

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ ok:false, error:'Method Not Allowed' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return res.status(500).json({ ok:false, error:'Email not configured' });
    }
    if (!process.env.CONTACT_TO) {
      console.error('Missing CONTACT_TO');
      return res.status(500).json({ ok:false, error:'Email not configured' });
    }

    // robust body parse (covers missing content-type)
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch { body = {}; }
    } else if (!body) {
      const raw = await new Promise((resolve) => {
        let data = ''; req.on('data', c => data += c); req.on('end', () => resolve(data));
      });
      try { body = JSON.parse(raw || '{}'); } catch { body = {}; }
    }

    const { name = '', email = '', message = '', company = '' } = body;

    // honeypot
    if (company && company.trim() !== '') return res.status(204).end();

    // basic validation
    const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    if (name.length < 2 || !validEmail || message.length < 10) {
      return res.status(400).json({ ok:false, error:'Invalid input' });
    }

    const sent = await resend.emails.send({
      from: `Portfolio <${process.env.CONTACT_FROM || 'onboarding@resend.dev'}>`,
      to: process.env.CONTACT_TO,
      subject: 'Portfolio: New message',
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: html({ name, email, message }),
    });

    if (sent?.error) {
      console.error('Resend error:', sent.error);
      return res.status(502).json({ ok:false, error:'Email service error' });
    }

    return res.status(200).json({ ok:true });
  } catch (e) {
    console.error('Handler crash:', e);
    return res.status(500).json({ ok:false, error:'Server error' });
  }
}
