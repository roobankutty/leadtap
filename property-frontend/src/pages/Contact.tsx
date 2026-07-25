import { useState } from "react";
import { submitLead } from "../services/lead.service";
import "../assets/styles/property.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Track field-specific error messages
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Helper validation function
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!name.trim()) {
      errors.name = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address (e.g., john@example.com).";
    }

    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid phone number (at least 7–10 digits).";
    }

    if (!message.trim()) {
      errors.message = "Please enter your requirement message.";
    }

    return errors;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSuccess("");
    setError("");
    setFieldErrors({});

    // 1. Run local frontend validation
    const clientValidationErrors = validateForm();
    if (Object.keys(clientValidationErrors).length > 0) {
      setFieldErrors(clientValidationErrors);
      setError("Please fix the highlighted errors below before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await submitLead({
        propertyId: 1, // Default ID for site-wide contact enquiries
        name,
        email,
        phone,
        message,
      });

      setSuccess(response.message || "Enquiry submitted successfully!");

      // Clear form on success
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      const responseData = err.response?.data;

      // 2. Parse field errors from backend array (express-validator / zod / joi)
      if (responseData?.errors && Array.isArray(responseData.errors)) {
        const extractedErrors: { [key: string]: string } = {};
        responseData.errors.forEach((item: any) => {
          const fieldName = item.path || item.param || item.field;
          if (fieldName) {
            extractedErrors[fieldName] = item.msg || item.message;
          }
        });
        setFieldErrors(extractedErrors);
      } 
      // 3. Parse key-value object error format
      else if (responseData?.errors && typeof responseData.errors === "object") {
        setFieldErrors(responseData.errors);
      }

      // 4. Set general alert message
      if (err.response?.status === 409) {
        setError("You have already submitted an enquiry recently.");
      } else if (responseData?.message) {
        setError(responseData.message);
      } else {
        setError("Failed to submit enquiry. Please check your inputs.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Get In Touch With LeadTap Properties</h1>
          <p className="lead mt-3">
            Looking for your dream home or a profitable investment?
            <br />
            Our property experts are here to help.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card contact-card shadow-sm border-0 h-100 p-4 text-center">
                <div className="display-4 mb-3">📍</div>
                <h4>Our Office</h4>
                <p className="text-muted mb-0">
                  LeadTap Properties
                  <br />
                  Coimbatore, Tamil Nadu
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card contact-card shadow-sm border-0 h-100 p-4 text-center">
                <div className="display-4 mb-3">📞</div>
                <h4>Call Us</h4>
                <p className="text-muted mb-0">
                  +91 98765 43210
                  <br />
                  Mon - Sat
                  <br />
                  9:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card contact-card shadow-sm border-0 h-100 p-4 text-center">
                <div className="display-4 mb-3">✉️</div>
                <h4>Email Us</h4>
                <p className="text-muted mb-0">
                  info@leadtapproperties.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h2 className="fw-bold mb-3">
                Send Us Your Property Requirement
              </h2>

              <p className="text-muted">
                Tell us what you're looking for and one of our experienced
                property consultants will contact you shortly with the best
                options that match your requirements.
              </p>

              <ul className="list-unstyled mt-4 text-start">
                <li className="mb-3">✅ Verified Property Listings</li>
                <li className="mb-3">✅ Expert Property Guidance</li>
                <li className="mb-3">✅ Home Loan Assistance</li>
                <li className="mb-3">✅ Legal Documentation Support</li>
                <li className="mb-3">✅ End-to-End Property Assistance</li>
              </ul>
            </div>

            <div className="col-lg-6">
              <div className="card shadow border-0 p-4 rounded-4">
                <h4 className="mb-4">Quick Enquiry</h4>

                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Name Input */}
                  <div className="mb-3 text-start">
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name) {
                          setFieldErrors((prev) => ({ ...prev, name: "" }));
                        }
                      }}
                    />
                    {fieldErrors.name && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="mb-3 text-start">
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) {
                          setFieldErrors((prev) => ({ ...prev, email: "" }));
                        }
                      }}
                    />
                    {fieldErrors.email && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="mb-3 text-start">
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) {
                          setFieldErrors((prev) => ({ ...prev, phone: "" }));
                        }
                      }}
                    />
                    {fieldErrors.phone && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.phone}
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="mb-3 text-start">
                    <textarea
                      className={`form-control ${fieldErrors.message ? "is-invalid" : ""}`}
                      rows={4}
                      placeholder="Your Requirement"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: "" }));
                        }
                      }}
                    />
                    {fieldErrors.message && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-bold"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">
            Visit Our Office
          </h2>

          <div className="ratio ratio-21x9 rounded overflow-hidden shadow">
            <iframe
              title="LeadTap Properties Location"
              src="https://maps.google.com/maps?q=Coimbatore&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}