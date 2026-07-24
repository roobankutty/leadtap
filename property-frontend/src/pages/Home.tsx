import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/styles/property.css";

import { getProperties } from "../services/property.service";
import { getTaxonomies } from "../services/taxonomy.service";

import type { Property } from "../types/property";
import type { Taxonomy } from "../services/taxonomy.service";

function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Taxonomies
  const [cities, setCities] = useState<Taxonomy[]>([]);
  const [types, setTypes] = useState<Taxonomy[]>([]);
  const [statuses, setStatuses] = useState<Taxonomy[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
	  loadTaxonomies();
	}, []);

	useEffect(() => {
	  loadProperties({
		search,
		city,
		type,
		status,
	  });
	}, [page]);

	async function loadProperties(
	  filters = {
		search,
		city,
		type,
		status,
	  }
	) {
	  try {
		setLoading(true);

		const data = await getProperties({
		  ...filters,
		  page,
		  limit: 6,
		});

		setProperties(data.properties);
		setTotalPages(data.totalPages);
		
	  } catch (err: any) {
    console.error("API Error:", err);
    console.error("Response:", err.response);
    console.error("Data:", err.response?.data);

    setError(
      err.response?.data?.message ||
      err.message ||
      "Failed to load properties"
    ) finally {
		setLoading(false);
	  }
	}

  async function loadTaxonomies() {
    try {
      const data = await getTaxonomies();

      setCities(data.cities);
      setTypes(data.types);
      setStatuses(data.statuses);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
		<div className="container py-5">

			<div className="text-center mb-5">
				<h3 className="display-4 fw-bold">Loading properties...</h3>
			</div>
		</div>
	);
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
  <div className="container py-5">

    <div className="text-center mb-5">
      <h1 className="display-4 fw-bold">Find Your Dream Property</h1>
      <p className="text-muted">
        Search from our latest apartments, villas and commercial properties.
      </p>
    </div>

    {/* Search Filters */}

    <div className="card shadow-sm border-0 mb-5">
      <div className="card-body">

        <div className="row g-3">

          <div className="col-lg-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-lg-2">
            <select
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">All Cities</option>

              {cities.map((city) => (
                <option
                  key={city.slug}
                  value={city.name}
                >
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-2">
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All Types</option>

              {types.map((type) => (
                <option
                  key={type.slug}
                  value={type.name}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-2">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>

              {statuses.map((status) => (
                <option
                  key={status.slug}
                  value={status.name}
                >
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-3 d-flex gap-2">

            <button
              className="btn btn-primary w-100"
              onClick={() => {
                setPage(1);

                loadProperties({
                  search,
                  city,
                  type,
                  status,
                });
              }}
            >
              <i className="bi bi-search me-2"></i>
              Search
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                setSearch("");
                setCity("");
                setType("");
                setStatus("");
                setPage(1);

                loadProperties({
                  search: "",
                  city: "",
                  type: "",
                  status: "",
                });
              }}
            >
              Reset
            </button>

          </div>

        </div>

      </div>
    </div>

    {/* Property Grid */}
     <div className="row g-4">

		  {properties.map((property) => (

			<div
			  className="col-12 col-md-6 col-lg-4"
			  key={property.id}
			>

			  <div className="card h-100 shadow-sm border-0">

				{property.image && (
				  <img
					src={property.image}
					alt={property.imageAlt || property.title}
					className="card-img-top"
					style={{
					  height: "230px",
					  objectFit: "cover"
					}}
				  />
				)}

				<div className="card-body d-flex flex-column">

				  <h5 className="card-title fw-bold">
					{property.title}
				  </h5>

				  <p className="text-muted mb-2">
					<i className="bi bi-geo-alt-fill text-danger me-2"></i>

					{property.address}

					{property.city.length > 0 &&
					  `, ${property.city.join(", ")}`}
				  </p>

				  <h4 className="text-primary fw-bold mb-3">
					₹ {property.price}
				  </h4>

				  <div className="d-flex justify-content-between mb-3">

					<span>
					  <i className="bi bi-house-door me-1"></i>

					  {property.bedrooms} Beds
					</span>

					<span>
					  <i className="bi bi-droplet me-1"></i>

					  {property.bathrooms} Baths
					</span>

				  </div>

				  <div className="mb-3">

					<span className="badge bg-primary me-2">
					  {property.type}
					</span>

					<span className="badge bg-success">
					  {property.status}
					</span>

				  </div>

				  <Link
					to={`/properties/${property.slug}`}
					className="btn btn-primary mt-auto"
				  >
					View Details
				  </Link>

				</div>

			  </div>

			</div>

		  ))}

		</div>
	  
	  {/* Pagination */}
	  <div className="d-flex justify-content-center align-items-center mt-5">

		  <button
			className="btn btn-outline-primary me-3"
			disabled={page === 1}
			onClick={() => setPage((prev) => prev - 1)}
		  >
			<i className="bi bi-arrow-left"></i> Previous
		  </button>

		  <span className="fw-semibold">
			Page <span className="badge bg-primary">{page}</span> of{" "}
			<span className="badge bg-secondary">{totalPages}</span>
		  </span>

		  <button
			className="btn btn-outline-primary ms-3"
			disabled={page === totalPages}
			onClick={() => setPage((prev) => prev + 1)}
		  >
			Next <i className="bi bi-arrow-right"></i>
		  </button>

		</div>
    </div>
  );
}

export default Home;