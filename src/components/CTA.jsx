import React from "react";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box glass" data-reveal>
          <h2>Ready to transform your career?</h2>
          <p>Join thousands of students already learning on PreppRight.</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScOFaALLkOnFhOG68XtrikDhuRgKEFJvOu-EXoHiO5ghqFgZg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
