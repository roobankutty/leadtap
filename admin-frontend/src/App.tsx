import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Properties from "./pages/Properties";
import Settings from "./pages/Settings";


function App(){

return (

<BrowserRouter>

<Routes>


<Route element={<Layout/>}>


<Route 
path="/"
element={<Dashboard/>}
/>


<Route
path="/leads"
element={<Leads/>}
/>


<Route
path="/properties"
element={<Properties/>}
/>


<Route
path="/settings"
element={<Settings/>}
/>


</Route>


</Routes>

</BrowserRouter>

)

}


export default App;