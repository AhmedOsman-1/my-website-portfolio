"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "sonner";

const PERSONAL_INFO = {
  email: "osmangonidevx@gmail.com",
  phone: "+880 1874-787550",
  linkedin: "https://www.linkedin.com/in/osman-goni-devx",
  location: "Chittagong, Bangladesh",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-24 px-6"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 flex flex-col justify-between min-h-[400px]">
          <h2 id="contact-heading" className="text-3xl font-bold text-[#00a6ff] mb-4">
            Let&apos;s Talk
          </h2>
          <p className="text-white/90 mb-6">
            Got a project in mind or just want to say hi? I&apos;m always up for a good conversation.
          </p>
          <div className="space-y-3 text-white/80">
            <p>📧 <strong>Email:</strong> <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>📱 <strong>Phone:</strong> <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, "")}`} className="hover:underline">{PERSONAL_INFO.phone}</a></p>
            <p>💼 <strong>LinkedIn:</strong> <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/osman-goni</a></p>
            <p>📍 <strong>Location:</strong> {PERSONAL_INFO.location}</p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>Name</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>Email</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup>
              <InputGroupTextarea
                name="message"
                placeholder="Enter your message..."
                value={form.message}
                onChange={handleChange}
                className="min-h-[120px]"
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="text-xs text-muted-foreground">
                  {300 - form.message.length} characters left
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
