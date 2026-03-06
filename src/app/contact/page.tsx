"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Send Message
            </button>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600">
              Have a question or want to place an order? We're here to help!
              Reach out to us through any of the following channels.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Email</h4>
            <p className="text-gray-600">
              <a href="mailto:support@store.com" className="text-gray-900 hover:underline">
                support@store.com
              </a>
            </p>
            <p className="text-gray-600">
              <a href="mailto:sales@store.com" className="text-gray-900 hover:underline">
                sales@store.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Phone
            </h4>
            <p className="text-gray-600">
              <a href="tel:+1234567890" className="text-gray-900 hover:underline">
                +1 (234) 567-890
              </a>
            </p>
            <p className="text-sm text-gray-500">Monday - Friday, 9:00 AM - 6:00 PM</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Address
            </h4>
            <p className="text-gray-600">
              123 Main Street<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Social Media
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
