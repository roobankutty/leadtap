import { useEffect, useState } from "react";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import StatCard from "../components/Dashboard/StatCard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {

  const token = localStorage.getItem("adminToken");

  axios
    .get(
      "https://leadtap-properties.onrender.com/api/admin/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setDashboard(res.data);
    })
    .catch((err) => {
      console.error(
        "Failed to load dashboard",
        err
      );
    });

}, []);

  if (!dashboard) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Dashboard</h2>

      <Row className="g-4">

        <Col md={3}>
          <StatCard
            title="Properties"
            value={dashboard.totalProperties}
            icon="bi bi-house-door"
            bg="bg-primary"
          />
        </Col>

        <Col md={3}>
          <StatCard
            title="Total Leads"
            value={dashboard.totalLeads}
            icon="bi bi-people"
            bg="bg-success"
          />
        </Col>

        <Col md={3}>
          <StatCard
            title="Today Leads"
            value={dashboard.todayLeads}
            icon="bi bi-calendar-day"
            bg="bg-warning"
          />
        </Col>

        <Col md={3}>
          <StatCard
            title="This Month"
            value={dashboard.thisMonthLeads ?? 0}
            icon="bi bi-graph-up"
            bg="bg-danger"
          />
        </Col>

      </Row>

      <Card className="mt-5 shadow-sm">

        <Card.Header>
          Recent Enquiries
        </Card.Header>

        <Card.Body>

          <Table striped hover responsive>

            <thead>

              <tr>
                <th>Name</th>
                <th>Property</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {dashboard.recentLeads.map((lead: any) => (

                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.propertyId}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>

              ))}

            </tbody>

          </Table>

        </Card.Body>

      </Card>
    </>
  );
}