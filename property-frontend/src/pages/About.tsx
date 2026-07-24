import "../assets/styles/property.css";

function About() {
  return (
    <div className="container mt-5">

      <div className="row align-items-center">

        <div className="col-md-6">
          <h1>About Us</h1>

          <p>
            Welcome to LeadTap Property. We help customers discover their
            dream properties with simple search, property details, and
            enquiry support.
          </p>

          <p>
            Our platform connects buyers and sellers with modern technology
            to make property discovery faster and easier.
          </p>
        </div>


        <div className="col-md-6">
          <img
            src="/about.jpg"
            alt="About Property"
            className="img-fluid rounded shadow"
          />
        </div>

      </div>

    </div>
  );
}

export default About;