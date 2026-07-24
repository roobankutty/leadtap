import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/styles/property.css";

function Services() {
  const services = [
    {
      icon: "🏠",
      title: "Property Search",
      description:
        "Find residential and commercial properties easily with advanced search options."
    },
    {
      icon: "📋",
      title: "Property Listing Management",
      description:
        "Manage property listings with detailed information, images, and updates."
    },
    {
      icon: "🤝",
      title: "Property Enquiry Support",
      description:
        "Get quick assistance for property enquiries and connect with owners."
    },
    {
      icon: "🏢",
      title: "Real Estate Consultation",
      description:
        "Professional guidance to help you make better property decisions."
    }
  ];

  return (
    <div className="bg-light">

      {/* Hero Section */}
      <section className="py-5 text-center bg-white">
        <div className="container">

          <h1 className="display-5 fw-bold">
            Our Services
          </h1>

          <p className="lead text-muted mt-3">
            Complete real estate solutions to help you find your perfect property.
          </p>

        </div>
      </section>


      {/* Services Cards */}
      <section className="py-5">

        <div className="container">

          <div className="row g-4">

            {services.map((service, index) => (

              <div className="col-md-6 col-lg-3" key={index}>

                <div className="card h-100 border-0 shadow-sm text-center p-4">

                  <div
                    className="display-4 mb-3"
                  >
                    {service.icon}
                  </div>


                  <h5 className="fw-bold">
                    {service.title}
                  </h5>


                  <p className="text-muted">
                    {service.description}
                  </p>


                  <button className="btn btn-outline-primary mt-auto">
                    Learn More
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">

        <div className="container text-center">

          <h2>
            Looking for your dream property?
          </h2>

          <p className="mt-3">
            Our experts are ready to help you find the right place.
          </p>

          <a
            href="/contact"
            className="btn btn-primary px-4 mt-2"
          >
            Contact Us
          </a>

        </div>

      </section>
	
	<section className="py-5 bg-light">
	  <div className="container">

		<div className="text-center mb-5">
		  <h2 className="fw-bold">Why Choose LeadTap Property?</h2>
		  <p className="text-muted">
			We make your property journey simple, transparent, and successful with
			professional guidance from search to settlement.
		  </p>
		</div>

		<div className="row g-4">

		  <div className="col-md-4">
			<div className="card h-100 border-0 shadow-sm p-4 text-center">
			  <div className="mb-3">
				<i className="bi bi-house-door fs-1 text-primary"></i>
			  </div>
			  <h4 className="fw-bold">Verified Properties</h4>
			  <p className="text-muted">
				Explore carefully selected residential and commercial properties
				with accurate details and trusted information.
			  </p>
			</div>
		  </div>


		  <div className="col-md-4">
			<div className="card h-100 border-0 shadow-sm p-4 text-center">
			  <div className="mb-3">
				<i className="bi bi-people fs-1 text-primary"></i>
			  </div>
			  <h4 className="fw-bold">Expert Assistance</h4>
			  <p className="text-muted">
				Our experienced property consultants guide you through every step
				of buying, selling, or renting.
			  </p>
			</div>
		  </div>


		  <div className="col-md-4">
			<div className="card h-100 border-0 shadow-sm p-4 text-center">
			  <div className="mb-3">
				<i className="bi bi-shield-check fs-1 text-primary"></i>
			  </div>
			  <h4 className="fw-bold">Secure Transactions</h4>
			  <p className="text-muted">
				We focus on transparent processes and reliable support for a
				smooth property experience.
			  </p>
			</div>
		  </div>

		</div>

	  </div>
	</section>
    </div>
	
  );
}

export default Services;