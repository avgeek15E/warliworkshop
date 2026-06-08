import { useState } from "react";

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question:
        "मला Drawing किंवा Painting चा अनुभव नाही, तरी मी join करू शकतो/शकते का?",
      answer:
        "होय, नक्की! ही workshop पूर्णपणे beginners साठी design केलेली आहे. आपण अगदी basic पासून step by step Warli Art शिकणार आहोत.",
    },

    {
      question: "Workshop साठी कोणते materials लागतील?",
      answer:
        "फक्त साधे materials जसे की drawing paper, pencil, black marker/brush आणि white acrylic paint लागेल. Registration नंतर complete material list तुम्हाला WhatsApp वर पाठवली जाईल.",
    },

    {
      question: "Workshop live असेल का?",
      answer:
        "होय, ही live online workshop असेल. तुम्ही घरी बसून थेट instructor सोबत शिकू शकता आणि प्रश्नही विचारू शकता.",
    },

    {
      question: "Workshop ची recording मिळेल का?",
      answer:
        "होय. Workshop नंतर recording उपलब्ध करून दिली जाईल, त्यामुळे तुम्ही तुमच्या सोयीनुसार पुन्हा practice करू शकता.",
    },

    {
      question: "Workshop मध्ये final artwork पूर्ण करून घेणार का?",
      answer:
        "होय. Workshop दरम्यान आपण Warli basics पासून सुरुवात करून एक सुंदर complete Warli artwork तयार करणार आहोत.",
    },

    {
      question: "Workshop join करण्यासाठी link कशी मिळेल?",
      answer:
        "Registration नंतर तुम्हाला confirmation email आणि WhatsApp group link मिळेल. Workshop ची joining link group मध्ये आणि email द्वारे share केली जाईल.",
    },

    {
      question: "Kids आणि Adults दोघेही join करू शकतात का?",
      answer:
        "होय. ही workshop 10+ वयोगटातील मुलांसाठी तसेच adults साठी योग्य आहे. Art शिकण्याची आवड असलेला कोणीही सहभागी होऊ शकतो.",
    },

    {
      question: "Workshop नंतर काही support मिळेल का?",
      answer:
        "होय. Workshop नंतरही WhatsApp group मध्ये तुमचे questions विचारू शकता आणि artwork वर guidance मिळवू शकता.",
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
