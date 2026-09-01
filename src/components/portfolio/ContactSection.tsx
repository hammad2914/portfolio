"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { FormEvent, useState } from "react";
import { contact, socialLinks } from "@/data/content";
import { SocialIcons } from "./Shared";

/**
 * Web3Forms access keys are public by design (the request is made from the
 * browser). Overridable via env so the key can be rotated without a code change.
 */
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "2abe0d3b-d4e6-487b-a3d2-15f9939353b8";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const EMPTY = { name: "", email: "", subject: "", message: "" };

export function ContactSection() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [form, setForm] = useState(EMPTY);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.state === "error" || status.state === "sent") {
      setStatus({ state: "idle" });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ state: "sending" });

    // Honeypot — bots fill hidden fields, humans can't see this one.
    const botcheck = new FormData(e.currentTarget).get("botcheck");
    if (botcheck) {
      setStatus({ state: "sent" });
      setForm(EMPTY);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...form,
          access_key: ACCESS_KEY,
          from_name: "Portfolio contact form",
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setForm(EMPTY);
        setStatus({ state: "sent" });
        return;
      }

      setStatus({
        state: "error",
        message:
          data?.message ??
          "Something went wrong sending your message. Please email me directly.",
      });
    } catch {
      setStatus({
        state: "error",
        message:
          "Couldn't reach the server — check your connection, or email me directly.",
      });
    }
  };

  const sending = status.state === "sending";
  const email = contact.contactInfo.find((i) => "email" in i && i.email);

  return (
    <section id="contactus" className="section contactus-section">
      <div className="container">
        <div className="contactus-box rounded oveflow-hidden gray-bg">
          <div className="row g-0 p-4 p-lg-5">
            <div className="col-lg-4" />
            <div className="col-lg-8">
              <div
                className="contactus-title"
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <h5>{contact.sectionHeading.title}</h5>
                <p className="m-0">{contact.sectionHeading.subTitle}</p>
              </div>
            </div>
          </div>
          <div className="row g-0 contactus-form p-4 p-lg-5 flex-row-reverse">
            <div className="col-lg-8">
              <div className="contact-form">
                <form id="contact-form" onSubmit={onSubmit} noValidate={false}>
                  <div className="row gx-3 gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-name">
                          Your Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          placeholder="Name *"
                          className="form-control"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={onChange}
                          disabled={sending}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-email">
                          Your Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          placeholder="Email *"
                          className="form-control"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={onChange}
                          disabled={sending}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-subject">
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          placeholder="Subject *"
                          className="form-control"
                          type="text"
                          value={form.subject}
                          onChange={onChange}
                          disabled={sending}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-message">
                          Your message
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          placeholder="Your message *"
                          rows={4}
                          className="form-control"
                          value={form.message}
                          onChange={onChange}
                          disabled={sending}
                          required
                        />
                      </div>
                    </div>

                    {/* Honeypot — hidden from users, catches naive spam bots. */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="visually-hidden-honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />

                    <div className="col-md-12">
                      <div className="send">
                        <button
                          className={`px-btn w-100 ${sending ? "disabled" : ""}`}
                          type="submit"
                          disabled={sending}
                        >
                          {sending ? "Sending…" : "Send Message"}
                        </button>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div aria-live="polite" role="status">
                        {status.state === "sent" ? (
                          <p className="form-feedback form-feedback--success">
                            <Icon
                              icon="mdi:check-circle-outline"
                              aria-hidden="true"
                            />
                            <span>
                              Thanks — your message is on its way. I&apos;ll
                              reply within 24 hours.
                            </span>
                          </p>
                        ) : null}
                        {status.state === "error" ? (
                          <p className="form-feedback form-feedback--error">
                            <Icon
                              icon="mdi:alert-circle-outline"
                              aria-hidden="true"
                            />
                            <span>
                              {status.message}
                              {email && "email" in email ? (
                                <>
                                  {" "}
                                  <a href={`mailto:${email.email}`}>
                                    {email.email}
                                  </a>
                                </>
                              ) : null}
                            </span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 pe-md-5">
              <div className="contact-banner d-none d-lg-block">
                <Image
                  src={contact.contactImg}
                  alt="Hammad Ali"
                  width={320}
                  height={400}
                  className="img-fluid"
                />
              </div>
              <div className="contact-info">
                {contact.contactInfo.map((info, index) => (
                  <div
                    className="contact-info-in"
                    key={info.title}
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay={100 * index}
                  >
                    <label>{info.title}</label>
                    {"email" in info && info.email ? (
                      <a href={`mailto:${info.email}`}>{info.email}</a>
                    ) : null}
                    {"text" in info && info.text ? <p>{info.text}</p> : null}
                  </div>
                ))}
              </div>
              <SocialIcons socialBtns={socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
