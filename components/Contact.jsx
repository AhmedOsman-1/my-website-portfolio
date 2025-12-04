"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const PERSONAL_INFO = {
  email: "osmangonidevx@gmail.com",
  phone: "+8801874787550",
  linkedin: "https://www.linkedin.com/in/osman-goni-devx",
  location: "Chittagong, Bangladesh",
};

const VALIDATION_RULES = {
  name: { minLength: 2, maxLength: 50 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  subject: { minLength: 5, maxLength: 100 },
  message: { minLength: 10, maxLength: 500 },
};

const INPUT_FIELDS = ["name", "email", "subject"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const inputRefs = useRef([]);
  const statusRef = useRef(null);
  const scrollTriggers = useRef([]);

  const canSubmit = useCallback(() => Date.now() - lastSubmissionTime > 2000, [lastSubmissionTime]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.length < VALIDATION_RULES.name.minLength)
      newErrors.name = `Name must be at least ${VALIDATION_RULES.name.minLength} characters`;
    else if (form.name.length > VALIDATION_RULES.name.maxLength)
      newErrors.name = `Name must be less than ${VALIDATION_RULES.name.maxLength} characters`;

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!VALIDATION_RULES.email.pattern.test(form.email))
      newErrors.email = "Please enter a valid email";

    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    else if (form.subject.length < VALIDATION_RULES.subject.minLength)
      newErrors.subject = `Subject must be at least ${VALIDATION_RULES.subject.minLength} characters`;
    else if (form.subject.length > VALIDATION_RULES.subject.maxLength)
      newErrors.subject = `Subject must be less than ${VALIDATION_RULES.subject.maxLength} characters`;

    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.length < VALIDATION_RULES.message.minLength)
      newErrors.message = `Message must be at least ${VALIDATION_RULES.message.minLength} characters`;
    else if (form.message.length > VALIDATION_RULES.message.maxLength)
      newErrors.message = `Message must be less than ${VALIDATION_RULES.message.maxLength} characters`;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit()) return setStatus("⏳ Please wait a moment before sending another message");
    if (!validateForm()) return setStatus("Please fix the errors below");

    setLoading(true);
    setStatus("");
    setLastSubmissionTime(Date.now());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully! I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        statusRef.current?.focus();
      } else setStatus(`❌ Failed to send: ${data.error || "Unknown error"}`);
    } catch {
      setStatus("❌ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!leftCardRef.current || !rightCardRef.current) return;

    const leftTrigger = ScrollTrigger.create({
      trigger: leftCardRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        leftCardRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      ),
      toggleActions: "play none none none",
    });

    const rightTrigger = ScrollTrigger.create({
      trigger: rightCardRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        rightCardRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
      ),
      toggleActions: "play none none none",
    });

    const inputTriggers = inputRefs.current.map((input, i) => {
      if (!input) return null;
      return ScrollTrigger.create({
        trigger: rightCardRef.current,
        start: "top 90%",
        animation: gsap.fromTo(
          input,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: i * 0.08, ease: "power3.out" }
        ),
      });
    }).filter(Boolean);

    scrollTriggers.current = [leftTrigger, rightTrigger, ...inputTriggers];

    return () => scrollTriggers.current.forEach(t => t.kill());
  }, []);

  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-transparent" aria-labelledby="contact-heading">
      <div  className="max-w-5xl mx-auto  bg-white rounded-[32px] shadow-[0_18px_60px_rgba(15,23,42,0.12)] px-10 py-12 md:px-14 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left info */}
        <div ref={leftCardRef} className="space-y-6">
          <p className="text-xs tracking-[0.25em] uppercase text-sky-500">We&apos;re here to help you</p>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            <span className="font-medium">Discuss</span>{" "}
            <span className="font-bold">Your Project Needs</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-sm">
            Looking for a high-quality, conversion-focused website tailored to your business? Reach out and let&apos;s plan the perfect solution.
          </p>

          <div className="mt-6 space-y-4 text-sm text-slate-600">
            {Object.entries(PERSONAL_INFO).map(([key, value]) => {
              let icon = "✉️";
              if (key === "phone") icon = "📞";
              else if (key === "linkedin") icon = "💼";
              else if (key === "location") icon = "📍";

              const link = key === "email" ? `mailto:${value}` :
                           key === "phone" ? `tel:${value}` :
                           key === "linkedin" ? value : null;

              return (
                <div key={key} className="flex items-start gap-3">
                  <span className="mt-0.5 text-sky-500">{icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                    {link ? (
                      <a href={link} target={key === "linkedin" ? "_blank" : undefined} rel="noreferrer" className="hover:text-sky-600">
                        {value}
                      </a>
                    ) : <p>{value}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right form */}
        <div ref={rightCardRef} className="bg-slate-50 rounded-[26px] shadow-[0_10px_40px_rgba(15,23,42,0.06)] px-6 py-7 md:px-8 md:py-8" role="form" aria-label="Contact form">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {INPUT_FIELDS.map((field, i) => (
              <div key={field} className="space-y-1">
                <label htmlFor={field} className="text-xs font-medium text-slate-500">
                  {field === "subject" ? "Project type / Subject" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={
                    field === "name" ? "Your name" :
                    field === "email" ? "name@example.com" :
                    "Tell me what you need"
                  }
                  required
                  ref={el => inputRefs.current[i] = el}
                  className={`w-full h-11 px-3 rounded-xl border text-sm bg-white/80 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition ${
                    errors[field] ? "border-red-400 focus:ring-red-400" : "border-slate-200"
                  }`}
                  aria-invalid={errors[field] ? "true" : "false"}
                  aria-describedby={errors[field] ? `${field}-error` : undefined}
                />
                {errors[field] && <p id={`${field}-error`} className="text-red-500 text-xs" role="alert">{errors[field]}</p>}
              </div>
            ))}

            <div className="space-y-1">
              <label htmlFor="message" className="text-xs font-medium text-slate-500">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Briefly describe your project, timeline, and budget…"
                rows={4}
                required
                ref={el => inputRefs.current[3] = el}
                className={`w-full px-3 py-3 rounded-xl border text-sm bg-white/80 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition resize-none ${
                  errors.message ? "border-red-400 focus:ring-red-400" : "border-slate-200"
                }`}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && <p id="message-error" className="text-red-500 text-xs" role="alert">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit()}
              className="w-full h-11 rounded-full bg-sky-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-sky-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-sky-600 text-xs">→</span>
                  Get a solution
                </>
              )}
            </button>
          </form>

          {status && (
            <div ref={statusRef} className="mt-4 px-3 py-2 rounded-lg bg-slate-100 text-xs text-slate-700" role="status" aria-live="polite" tabIndex={-1}>
              {status}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
