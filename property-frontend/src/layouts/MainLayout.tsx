import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bannerImage from "../assets/images/banner.jpg";

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  return (
    <>
      <Header />

      {isHomePage && (
        <img
          src={bannerImage}
          alt="Home Banner"
          className="img-fluid w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}