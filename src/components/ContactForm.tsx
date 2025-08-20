import React, { useState,useId } from "react";
import "../components/ContactForm.css";
const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const nameId = useId();
  const emailId = useId();
  const msgId = useId();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: wire to your backend or email service
      console.log("Form submitted:", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
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
          />
        </div>

        <button type="submit" className="btn-submit">Send Message</button>

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