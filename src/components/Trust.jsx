import React from "react";

const Trust = () => {
  return (
    <section className="trust">
      <div className="container">
        <p className="trust-title" data-reveal>
          Trusted by leading companies worldwide
        </p>
        <div className="logo-cloud" data-reveal>
          {[
            {
              name: "Google",
              url: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
            },
            {
              name: "Amazon",
              url: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg",
            },
            {
              name: "Meta",
              url: "https://www.vectorlogo.zone/logos/facebook/facebook-official.svg",
            },
            {
              name: "Microsoft",
              url: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg",
            },
            {
              name: "Netflix",
              url: "https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg",
            },
          ].map((company) => (
            <div key={company.name} className="company-logo-wrap">
              <img
                src={company.url}
                alt={company.name}
                className="company-img"
                style={{
                  height: company.name === "Microsoft" ? "30px" : "35px",
                  filter: "brightness(1.1)",
                  opacity: 0.9,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%) brightness(1)";
                  e.currentTarget.style.opacity = 1;
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = 0.9;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
