export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container text-center">
        <img
            className="banner-img"
            src="/logo.png"
            alt="LeadTap Property"
            width="75"
          />
        <h5>Leadtap Properties</h5>

        <p className="mb-1">
          Find your dream property with confidence.
        </p>

        <small>
          © {new Date().getFullYear()} Leadtap Properties.
          All Rights Reserved.
        </small>

      </div>
    </footer>
  );
}