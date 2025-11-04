"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Personal information constants
const PERSONAL_INFO = {
  email: "osmangonidevx@gmail.com",
  phone: "+880 1874-787550",
  linkedin: "https://www.linkedin.com/in/osman-goni-devx",
  location: "Chittagong, Bangladesh",
};

// Form validation rules
const VALIDATION_RULES = {
  name: { minLength: 2, maxLength: 50 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  subject: { minLength: 5, maxLength: 100 },
  message: { minLength: 10, maxLength: 500 },
};

// Input fields array
const INPUT_FIELDS = ["name", "email", "subject"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const inputRefs = useRef([]);
  const statusRef = useRef(null);
  const scrollTriggers = useRef([]);

  const canSubmit = useCallback(() => {
    const now = Date.now();
    return now - lastSubmissionTime > 2000;
  }, [lastSubmissionTime]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < VALIDATION_RULES.name.minLength) {
      newErrors.name = `Name must be at least ${VALIDATION_RULES.name.minLength} characters`;
    } else if (form.name.trim().length > VALIDATION_RULES.name.maxLength) {
      newErrors.name = `Name must be less than ${VALIDATION_RULES.name.maxLength} characters`;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!VALIDATION_RULES.email.pattern.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (form.subject.trim().length < VALIDATION_RULES.subject.minLength) {
      newErrors.subject = `Subject must be at least ${VALIDATION_RULES.subject.minLength} characters`;
    } else if (form.subject.trim().length > VALIDATION_RULES.subject.maxLength) {
      newErrors.subject = `Subject must be less than ${VALIDATION_RULES.subject.maxLength} characters`;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < VALIDATION_RULES.message.minLength) {
      newErrors.message = `Message must be at least ${VALIDATION_RULES.message.minLength} characters`;
    } else if (form.message.trim().length > VALIDATION_RULES.message.maxLength) {
      newErrors.message = `Message must be less than ${VALIDATION_RULES.message.maxLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit()) {
      setStatus("⏳ Please wait a moment before sending another message");
      return;
    }

    if (!validateForm()) {
      setStatus("❌ Please fix the errors below");
      return;
    }

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
        setStatus("✅ Message sent successfully! I&apos;ll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
        setErrors({});
        if (statusRef.current) statusRef.current.focus();
      } else {
        setStatus(`❌ Failed to send message: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("❌ Network error. Please check your connection and try again.");
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
        { x: -60, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      ),
      toggleActions: "play none none none",
    });

    const rightTrigger = ScrollTrigger.create({
      trigger: rightCardRef.current,
      start: "top 90%",
      animation: gsap.fromTo(
        rightCardRef.current,
        { x: 50, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      ),
      toggleActions: "play none none none",
    });

    const inputTriggers = [];
    if (inputRefs.current.length) {
      inputRefs.current.forEach((input, i) => {
        if (input) {
          const trigger = ScrollTrigger.create({
            trigger: rightCardRef.current,
            start: "top 90%",
            animation: gsap.fromTo(
              input,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: "power3.out" }
            ),
          });
          inputTriggers.push(trigger);
        }
      });
    }

    scrollTriggers.current = [leftTrigger, rightTrigger, ...inputTriggers];
    return () => {
      scrollTriggers.current.forEach((trigger) => trigger.kill());
      scrollTriggers.current = [];
    };
  }, []);

  return (
    <section
      className="py-24 relative mt-24 border-t border-[#13adff] border-b mb-16 overflow-hidden rounded-[40px] px-6"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Card */}
        <div
          ref={leftCardRef}
          className="bg-white/20 backdrop-blur-md rounded-[32px] shadow-[0_15px_35px_rgba(0,200,255,0.15)] 
          p-10 flex flex-col justify-between min-h-[500px] hover:scale-105 
          hover:shadow-[0_25px_50px_rgba(0,200,255,0.3)] transition-transform duration-300"
          role="complementary"
          aria-label="Contact information"
        >
          <h2 id="contact-heading" className="text-3xl font-bold font-Bebas text-[#00a6ff]">
            Let&apos;s Talk
          </h2>
          <p className="text-white/90 leading-relaxed">
            Whether you&apos;ve got a crazy idea, need a fresh website, or just feel like saying hi, I&apos;m always up for a good conversation and new connections.
          </p>
          <div className="space-y-4 text-white/80" role="list">
            <p role="listitem">
              📧 <span className="font-bold">Email:</span>{" "}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-[#13adff] focus:ring-offset-2 rounded"
                aria-label={`Send email to ${PERSONAL_INFO.email}`}
              >
                {PERSONAL_INFO.email}
              </a>
            </p>
            <p role="listitem">
              📱 <span className="font-bold">Phone:</span>{" "}
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-[#13adff] focus:ring-offset-2 rounded"
                aria-label={`Call ${PERSONAL_INFO.phone}`}
              >
                {PERSONAL_INFO.phone}
              </a>
            </p>
            <p role="listitem">
              💼 <span className="font-bold">LinkedIn:</span>{" "}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-[#13adff] focus:ring-offset-2 rounded"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                linkedin.com/in/osman-goni
              </a>
            </p>
            <p role="listitem">
              📍 <span className="font-bold">Location:</span> {PERSONAL_INFO.location}
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div
          ref={rightCardRef}
          className="bg-white/20 backdrop-blur-md rounded-[32px] shadow-[0_15px_35px_rgba(0,200,255,0.15)] 
          p-10 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,200,255,0.3)] transition-transform duration-300 relative"
          role="form"
          aria-label="Contact form"
        >
          <div className="text-center mb-6">
            <p className="text-white/90 mt-3 max-w-2xl mx-auto">
              Got a project in mind or just want to say hello?{" "}
              <span className="text-[#0caaff]">
                Drop a message and I&apos;ll reply faster than light ⚡
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {INPUT_FIELDS.map((field, i) => (
              <div key={field} className="space-y-1">
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  required
                  ref={(el) => (inputRefs.current[i] = el)}
                  className={`w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 
                  focus:outline-none focus:ring-2 focus:ring-[#13adff] transition-all duration-200
                  ${errors[field] ? "ring-2 ring-red-400 bg-red-500/10" : ""}`}
                  aria-label={`${field.charAt(0).toUpperCase() + field.slice(1)} input`}
                  aria-describedby={errors[field] ? `${field}-error` : undefined}
                  aria-invalid={errors[field] ? "true" : "false"}
                />
                {errors[field] && (
                  <p
                    id={`${field}-error`}
                    className="text-red-400 text-sm mt-1"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="space-y-1">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
                ref={(el) => (inputRefs.current[3] = el)}
                className={`w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 
                focus:outline-none focus:ring-2 focus:ring-[#13adff] transition-all duration-200 resize-none
                ${errors.message ? "ring-2 ring-red-400 bg-red-500/10" : ""}`}
                aria-label="Message input"
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && (
                <p
                  id="message-error"
                  className="text-red-400 text-sm mt-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit()}
              className="w-full py-4 bg-[#13adff] text-black font-bold rounded-xl 
              hover:bg-[#09c6ff] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-[#13adff] focus:ring-offset-2 relative"
              aria-label={loading ? "Sending message, please wait" : "Send message"}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 
7.962 0 014 12H0c0 3.042 1.135 5.824 3 
7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          {status && (
            <div
              ref={statusRef}
              className="text-center mt-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              <p className="text-white font-medium">{status}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
