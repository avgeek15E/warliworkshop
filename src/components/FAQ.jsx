import { useState } from "react";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need prior drawing experience?",
      answer:
        "No problem at all! This workshop is beginner-friendly. आपण अगदी scratch पासून सुरुवात करणार आहोत, त्यामुळे आधी painting चा experience नसला तरी चालेल.",
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
        "You will receive the Google Meet or Zoom link via email before the workshop starts.",
    },
    {
      question: "Is this class suitable for kids or only adults?",
      answer:
        "This class is suitable for both kids and adults. Anyone who is interested in art can join.",
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
