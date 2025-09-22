"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const inputRefs = useRef([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Failed: " + data.error);
      }
    } catch {
      setStatus("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!leftCardRef.current || !rightCardRef.current) return;

    // Left card
    gsap.fromTo(
      leftCardRef.current,
      { x: -60, opacity: 0, scale: 0.95 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftCardRef.current,
          start: "top 90% bottom",
          toggleActions: "play none none none",
        },
      }
    );

    // Right card
    gsap.fromTo(
      rightCardRef.current,
      { x: 50, opacity: 0, scale: 0.95 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightCardRef.current,
          start: "top 90% bottom",
          toggleActions: "play none none none",
        },
      }
    );

    // Form inputs animation
    if (inputRefs.current.length) {
      inputRefs.current.forEach((input, i) => {
        gsap.fromTo(
          input,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rightCardRef.current,
              start: "top 90% bottom",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="py-24 relative mt-24 border-t border-[#13adff] border-b mb-16 overflow-hidden rounded-[40px] px-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Card */}
        <div
          ref={leftCardRef}
          className="bg-white/20 backdrop-blur-sm rounded-[32px] shadow-[0_15px_35px_rgba(0,200,255,0.15)] 
          p-10 flex flex-col justify-between min-h-[500px] hover:scale-105 
          hover:shadow-[0_25px_50px_rgba(0,200,255,0.3)] transition-transform"
        >
          <h2 className="text-3xl font-bold font-Bebas text-[#00a6ff]">Let’s Talk</h2>
          <p className="text-white/90 leading-relaxed">
            Whether you’ve got a crazy idea, need a fresh website, or just feel like saying hi, I’m always up for a good conversation and new connections.
          </p>
          <div className="space-y-4 text-white/80">
            <p>
              📧 <span className="font-bold">Email:</span>{" "}
              <a href="mailto:osmangonidevx@gmail.com" className="hover:underline">
                osmangonidevx@gmail.com
              </a>
            </p>
            <p>
              📱 <span className="font-bold">Phone:</span>{" "}
              <a href="tel:+8801874787550" className="hover:underline">
                +880 1874-787550
              </a>
            </p>
            <p>
              💼 <span className="font-bold">LinkedIn:</span>{" "}
              <a
                href="https://www.linkedin.com/in/osman-goni-devx"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/osman-goni
              </a>
            </p>
            <p>📍 <span className="font-bold">Location:</span> Chittagong, Bangladesh</p>
          </div>
        </div>

        {/* Right Card */}
        <div
          ref={rightCardRef}
          className="bg-white/20 backdrop-blur-xl rounded-[32px] shadow-[0_15px_35px_rgba(0,200,255,0.15)] 
          p-10 hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,200,255,0.3)] transition-transform relative"
        >
          <div className="text-center mb-4">
            <p className="text-white/90 mt-3 max-w-2xl mx-auto">
              Got a project in mind or just want to say hello?{" "}
              <span className="text-[#0caaff]">Drop a message and I’ll reply faster than light ⚡</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {["name", "email", "subject"].map((field, i) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                required
                ref={(el) => (inputRefs.current[i] = el)}
                className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 
                focus:outline-none focus:ring-2 focus:ring-[#13adff]"
              />
            ))}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              ref={(el) => (inputRefs.current[3] = el)}
              className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/60 
              focus:outline-none focus:ring-2 focus:ring-[#13adff]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#13adff] text-black font-bold rounded-xl 
              hover:bg-[#09c6ff] transition-all"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {status && <p className="text-center mt-4 text-white font-medium">{status}</p>}
        </div>
      </div>
    </section>
  );
}
