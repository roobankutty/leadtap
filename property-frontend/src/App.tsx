import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>

		  <Route element={<MainLayout />}>

			<Route
			  path="/"
			  element={<Home />}
			/>

			<Route
			  path="/properties"
			  element={<Home />}
			/>

			<Route
			  path="/properties/:slug"
			  element={<PropertyDetails />}
			/>

			<Route
			  path="/about"
			  element={<About />}
			/>

			<Route
			  path="/services"
			  element={<Services />}
			/>

			<Route
			  path="/contact"
			  element={<Contact />}
			/>

		  </Route>

		</Routes>
    </BrowserRouter>
  );
}

export default App;