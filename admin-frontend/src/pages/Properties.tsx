import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Property {
  id: number;
  title: string;
  slug: string;
  price?: string;
  city?: string;
  type?: string;
  status?: string;
  image?: string;
}

export default function Properties() {

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchProperties() {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/properties"
        );

        setProperties(response.data.properties);

      } catch (error) {

        console.error(
          "Failed to load properties",
          error
        );

      } finally {

        setLoading(false);

      }

    }

    fetchProperties();

  }, []);


  if (loading) {
    return (
      <div className="container mt-4">
        Loading properties...
      </div>
    );
  }


  return (

    <div className="container-fluid mt-4">

      <div className="card shadow">

        <div className="card-header">
          <h4 className="mb-0">
            Property Listings
          </h4>
        </div>


        <div className="card-body">


        {properties.length === 0 ? (

          <div className="alert alert-info">
            No properties found
          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-striped table-hover table-bordered align-middle">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

              {properties.map((property) => (

                <tr key={property.id}>

                  <td>
                    {property.id}
                  </td>


                  <td>

                    {property.image ? (

                      <img
                        src={property.image}
                        alt={property.title}
                        width="80"
                        height="60"
                        className="rounded"
                      />

                    ) : (

                      "No Image"

                    )}

                  </td>


                  <td>
                    {property.title}
                  </td>


                  <td>
                    {property.city || "-"}
                  </td>


                  <td>
                    {property.type || "-"}
                  </td>


                  <td>
                    {property.status || "-"}
                  </td>


                  <td>
                    {property.price || "-"}
                  </td>


                  <td>

                    <a
					  href={`${import.meta.env.VITE_PROPERTY_FRONTEND_URL}/property/${property.slug}`}
					  target="_blank"
					  rel="noopener noreferrer"
					  className="btn btn-sm btn-primary"
					>
					  View
					</a>

                  </td>


                </tr>

              ))}

              </tbody>

            </table>

          </div>

        )}

        </div>

      </div>

    </div>

  );
}