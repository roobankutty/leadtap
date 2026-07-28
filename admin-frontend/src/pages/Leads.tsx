import { useEffect, useState } from "react";
import axios from "axios";

interface Lead {
  id: number;
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function Leads() {

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchLeads() {
      try {

        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          "https://leadtap-properties.onrender.com/api/admin/leads",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLeads(response.data.data);

      } catch (error) {

        console.error("Failed to load leads", error);

      } finally {

        setLoading(false);

      }
    }

    fetchLeads();

  }, []);


  if (loading) {
    return <p>Loading leads...</p>;
  }


return (
  <div className="container-fluid mt-4">

    <div className="card shadow">

      <div className="card-header">
        <h4 className="mb-0">Leads</h4>
      </div>


      <div className="card-body">

        {leads.length === 0 ? (

          <div className="alert alert-info">
            No leads found
          </div>

        ) : (

          <div className="table-responsive">

            <table className="table table-striped table-hover table-bordered align-middle">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Property</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>

              </thead>


              <tbody>

              {leads.map((lead, index) => (

                <tr key={lead.id}>

                  <td>{leads.length - index}</td>

                  <td>
                    LTP - {lead.propertyId}
                  </td>

                  <td>
                    {lead.name}
                  </td>

                  <td>
                    {lead.email}
                  </td>

                  <td>
                    {lead.phone}
                  </td>

                  <td>
                    {lead.message}
                  </td>

                  <td>
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString()}
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