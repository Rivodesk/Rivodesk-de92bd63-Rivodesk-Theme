"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on all products. If you're not satisfied with your purchase, you can return it in its original condition for a full refund. Simply contact our support team to initiate the return process.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "We offer free standard shipping which typically takes 5-7 business days. Express shipping options are also available at checkout for faster delivery. You'll receive a tracking number via email once your order ships.",
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. You can see the shipping cost and estimated delivery date at checkout before placing your order.",
  },
  {
    id: 4,
    question: "What warranty does the product come with?",
    answer:
      "All our products come with a 2-year manufacturer warranty covering defects in materials and workmanship. If you experience any issues, please contact our support team and we'll help you with a replacement or repair.",
  },
  {
    id: 5,
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 24 hours of purchase. After 24 hours, the order enters our fulfillment process and cannot be changed. Please contact us immediately if you need to make changes.",
  },
  {
    id: 6,
    question: "Do you offer bulk discounts?",
    answer:
      "Yes, we offer special pricing for bulk orders. For orders of 10 or more units, please contact our sales team at sales@store.com to receive a custom quote.",
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
  },
  {
    id: 8,
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on the carrier's website to track your package in real-time.",
  },
  {
    id: 9,
    question: "Is the product compatible with my device?",
    answer:
      "The Premium Wireless Headphones are compatible with any device that supports Bluetooth 5.0, including smartphones, tablets, laptops, and computers. Check your device's specifications to ensure Bluetooth compatibility.",
  },
  {
    id: 10,
    question: "Do you offer customer support?",
    answer:
      "Yes, we have a dedicated customer support team available Monday through Friday, 9:00 AM to 6:00 PM EST. You can reach us via email at support@store.com or by phone at +1 (234) 567-890.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg">
          Find answers to common questions about our products and services.
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden transition"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition text-left"
            >
              <h3 className="font-semibold text-gray-900 text-lg">
                {faq.question}
              </h3>
              <span
                className={`text-gray-600 transition transform ${
                  openId === faq.id ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* Answer */}
            {openId === faq.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Help */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Didn't find your answer?
        </h2>
        <p className="text-gray-600 mb-6">
          Our support team is here to help. Don't hesitate to reach out.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
