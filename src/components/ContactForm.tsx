import React, { useState,useId } from "react";
import "../components/ContactForm.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", company: "" }); // +honeypot
  const [status, setStatus] = useState<"idle"|"success"|"error"|"sending">("idle");
  const nameId = useId();
  const emailId = useId();
  const msgId = useId();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company, // honeypot
        }),
      });
      if (r.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", company: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-header">
        <h2 id="contact-title" className="contact-title">Contact Me</h2>
        <p className="contact-intro">
          Have a question, collaboration idea, or just want to say hi?
          Fill out the form and I’ll get back to you.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot — keep in DOM but off-screen */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
        />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor={nameId}>Name</label>
            <input
              id={nameId}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              autoComplete="name"
              minLength={2}
              maxLength={80}
            />
          </div>

          <div className="form-group">
            <label htmlFor={emailId}>Email</label>
            <input
              id={emailId}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              maxLength={120}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={msgId}>Message</label>
          <textarea
            id={msgId}
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
            minLength={10}
            maxLength={5000}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={status==="sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`form-status ${status !== "idle" ? "show" : ""} ${status}`}
        >
          {status === "success" && "Thanks! Your message has been sent."}
          {status === "error" && "Something went wrong. Please try again."}
        </p>
      </form>
    </section>
  );
};

export default ContactForm;
