import { useState } from "react";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Can I start even if I don't have confidence in drawing?",
      answer:
        "Absolutely! This course is specially designed for beginners to build your confidence step by step.",
    },
    {
      question: "What materials will I need for the workshop?",
      answer:
        "You will need basic materials like paper, pencil, black pen/brush, and white paint. A complete material list will be sent after registration.",
    },
    {
      question: "Will I receive recording of the workshop?",
      answer:
        "Yes, the workshop recording will be shared with participants so you can practice later as well.",
    },
    {
      question: "How will I join the workshop?",
      answer:
        "You will receive the Google Meet or Zoom link via whatsapp group before the workshop starts.",
    },
    {
      question: "Is this class suitable for kids or only adults?",
      answer:
        "This class is suitable for both kids and adults. Anyone who is interested in art can join.",
    },
    {
      question: "Will I get support if I have doubts?",
      answer:
        "Yes, you will get full guidance and support during your learning journey.",
    },
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>

              <span className="faq-arrow">
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQs;
