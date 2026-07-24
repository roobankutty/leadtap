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

  // ✅ Add it here
  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (!property) return;

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const response = await submitLead({
        propertyId: property.id,
        name,
        email,
        phone,
        message,
      });

      setSuccess(response.message || "Enquiry submitted successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

    } catch (err: any) {

      if (err.response?.status === 409) {
        setError("You have already submitted an enquiry recently.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to submit enquiry.");
      }

    } finally {

      setSubmitting(false);

    }
  }

  if (loading) {
    return <>Loading property...</>;
  }

  if (!property) {
    return <>Property not found</>;
  }


return (
	  <div className="container py-5">

		<div className="row g-5">

		  {/* Property Image */}

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
					objectFit: "cover"
					}}
				/>
				)}

			</div>

			{/* Property Description */}
			<div className="card shadow-sm border-0">

				<div className="card-body">

				<h3 className="mb-3">
					Property Details
				</h3>

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

				<span className="badge bg-success mb-3">
				  {property.status}
				</span>

				<h2 className="fw-bold">
				  {property.title}
				</h2>

				<h3 className="text-primary fw-bold my-3">
				  ₹ {property.price}
				</h3>

				<p className="text-muted">
				  <i className="bi bi-geo-alt-fill text-danger me-2"></i>

				  {property.address}
				</p>

				<hr />

				<div className="row text-center mb-4">

				  <div className="col-6">

					<i className="bi bi-house-door-fill fs-3 text-primary real-icon"></i>

					<h5 className="mt-2">
					  {property.bedrooms}
					</h5>

					<small>Bedrooms</small>

				  </div>

				  <div className="col-6">

					<i className="bi bi-droplet-fill fs-3 text-info real-icon"></i>

					<h5 className="mt-2">
					  {property.bathrooms}
					</h5>

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

				<h4 className="mb-3">
				  Contact Agent
				</h4>

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

		<div className="row mt-5">

			<div className="col-lg-12">

				<div className="card shadow-sm border-0">

					<div className="card-body">

						<h3 className="mb-4">
							Send Enquiry
						</h3>

						{success && (
							<div className="alert alert-success">
								{success}
							</div>
						)}

						{error && (
							<div className="alert alert-danger">
								{error}
							</div>
						)}

						<form onSubmit={handleSubmit}>

							<div className="row">

								<div className="col-md-6 mb-3">

									<label className="form-label">
										Full Name
									</label>

									<input
										className="form-control"
										value={name}
										onChange={(e)=>setName(e.target.value)}
										required
									/>

								</div>

								<div className="col-md-6 mb-3">

									<label className="form-label">
										Email
									</label>

									<input
										type="email"
										className="form-control"
										value={email}
										onChange={(e)=>setEmail(e.target.value)}
										required
									/>

								</div>

							</div>

							<div className="row">

								<div className="col-md-6 mb-3">

									<label className="form-label">
										Phone
									</label>

									<input
										className="form-control"
										value={phone}
										onChange={(e)=>setPhone(e.target.value)}
										required
									/>

								</div>

								<div className="col-md-6 mb-3">

									<label className="form-label">
										Message
									</label>

									<textarea
										className="form-control"
										rows={3}
										value={message}
										onChange={(e)=>setMessage(e.target.value)}
										required
									/>

								</div>

							</div>

							<button
								className="btn btn-primary real-btn"
								disabled={submitting}
							>
								{submitting
									? "Submitting..."
									: "Submit Enquiry"}
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