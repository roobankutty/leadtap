import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Properties from "./pages/Properties";
import Settings from "./pages/Settings";


function App(){

return (

<BrowserRouter>

<Routes>

<Route
  path="/login"
  element={<Login />}
/>

<Route element={<Layout/>}>


<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>


<Route
  path="/leads"
  element={
    <ProtectedRoute>
      <Leads />
    </ProtectedRoute>
  }
/>


<Route
  path="/properties"
  element={
    <ProtectedRoute>
      <Properties />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>


</Route>


</Routes>

</BrowserRouter>

)

}


export default App;