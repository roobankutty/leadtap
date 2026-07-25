import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { submitLead } from "../services/lead.service";
import { getPropertyBySlug } from "../services/property.service";
import type { Property } from "../types/property";
import "../assets/styles/property.css";

function PropertyDetails() {
  const { slug } = useParams();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  // Enquiry form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Track field-specific error messages
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function loadProperty() {
      if (!slug) return;

      try {
        const data = await getPropertyBySlug(slug);
        setProperty(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [slug]);

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
      errors.message = "Please enter your message or requirement.";
    }

    return errors;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!property) return;

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
        propertyId: property.id,
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

      // 2. Parse field errors from backend array
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
        setError("You have already submitted an enquiry for this property recently.");
      } else if (responseData?.message) {
        setError(responseData.message);
      } else {
        setError("Failed to submit enquiry. Please check your inputs.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h3>Property not found</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Property Image & Description */}
        <div className="col-lg-7">
          {/* Featured Image */}
          <div className="card shadow-sm border-0 mb-4">
            {property.image && (
              <img
                src={property.image}
                alt={property.imageAlt || property.title}
                className="card-img-top"
                style={{
                  height: "650px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* Property Description */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="mb-3 details-title">Property Details</h3>

              <div
                className="property-description"
                dangerouslySetInnerHTML={{
                  __html: property.description,
                }}
              />
            </div>
          </div>
        </div>

        {/* Property Information */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <span className="badge bg-success mb-3">{property.status}</span>

              <h2 className="fw-bold">{property.title}</h2>

              <h3 className="text-primary fw-bold my-3">₹ {property.price}</h3>

              <p className="text-muted">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                {property.address}
              </p>

              <hr />

              <div className="row text-center mb-4">
                <div className="col-6">
                  <i className="bi bi-house-door-fill fs-3 text-primary real-icon"></i>
                  <h5 className="mt-2">{property.bedrooms}</h5>
                  <small>Bedrooms</small>
                </div>

                <div className="col-6">
                  <i className="bi bi-droplet-fill fs-3 text-info real-icon"></i>
                  <h5 className="mt-2">{property.bathrooms}</h5>
                  <small>Bathrooms</small>
                </div>
              </div>

              <p>
                <strong>Property Type:</strong>
                <span className="badge bg-primary ms-2 real-tag">
                  {property.type}
                </span>
              </p>

              <hr />

              <h4 className="mb-3">Contact Agent</h4>

              <div className="list-group">
                <div className="list-group-item">
                  <i className="bi bi-person-fill me-2"></i>
                  {property.agentName}
                </div>

                <div className="list-group-item">
                  <i className="bi bi-telephone-fill me-2"></i>
                  <a
                    href={`tel:${property.phone}`}
                    className="text-decoration-none"
                  >
                    {property.phone}
                  </a>
                </div>

                <div className="list-group-item">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a
                    href={`mailto:${property.email}`}
                    className="text-decoration-none"
                  >
                    {property.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form Section */}
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h3 className="mb-4">Send Enquiry</h3>

              {success && (
                <div className="alert alert-success">{success}</div>
              )}

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  {/* Name Input */}
                  <div className="col-md-6 mb-3 text-start">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (fieldErrors.name) {
                          setFieldErrors((prev) => ({ ...prev, name: "" }));
                        }
                      }}
                      placeholder="Enter your full name"
                    />
                    {fieldErrors.name && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="col-md-6 mb-3 text-start">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) {
                          setFieldErrors((prev) => ({ ...prev, email: "" }));
                        }
                      }}
                      placeholder="Enter your email address"
                    />
                    {fieldErrors.email && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  {/* Phone Input */}
                  <div className="col-md-6 mb-3 text-start">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (fieldErrors.phone) {
                          setFieldErrors((prev) => ({ ...prev, phone: "" }));
                        }
                      }}
                      placeholder="Enter your phone number"
                    />
                    {fieldErrors.phone && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.phone}
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="col-md-6 mb-3 text-start">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className={`form-control ${fieldErrors.message ? "is-invalid" : ""}`}
                      rows={3}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: "" }));
                        }
                      }}
                      placeholder="Enter your message or property enquiry"
                    />
                    {fieldErrors.message && (
                      <div className="invalid-feedback d-block fw-semibold text-danger mt-1">
                        {fieldErrors.message}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary real-btn py-2 px-4 fw-bold"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;