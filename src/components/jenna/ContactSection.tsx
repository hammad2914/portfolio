"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { contact, socialLinks } from "@/data/jenna";
import { SocialIcons } from "./Shared";

export function ContactSection() {
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      const payload = {
        ...form,
        access_key: "2abe0d3b-d4e6-487b-a3d2-15f9939353b8",
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } finally {
      setSending(false);
    }
  };

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
                <form id="contact-form" onSubmit={onSubmit}>
                  <div className="row gx-3 gy-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input
                          name="name"
                          placeholder="Name *"
                          className="form-control"
                          type="text"
                          value={form.name}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-label">Your Email</label>
                        <input
                          name="email"
                          placeholder="Email *"
                          className="form-control"
                          type="email"
                          value={form.email}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input
                          name="subject"
                          placeholder="Subject *"
                          className="form-control"
                          type="text"
                          value={form.subject}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Your message</label>
                        <textarea
                          name="message"
                          placeholder="Your message *"
                          rows={4}
                          className="form-control"
                          value={form.message}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="send">
                        <button
                          className={`px-btn w-100 ${sending ? "disabled" : ""}`}
                          type="submit"
                          disabled={sending}
                        >
                          {sending ? "Sending..." : "Send Message"}
                        </button>
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
                  alt="Avatar"
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
                    {info.email ? (
                      <a href={`mailto:${info.email}`}>{info.email}</a>
                    ) : null}
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
