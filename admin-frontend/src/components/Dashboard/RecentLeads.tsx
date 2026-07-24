import { Outlet, Link } from "react-router-dom";


export default function Layout(){

return (

<div className="d-flex">

{/* Sidebar */}

<div 
className="bg-dark text-white p-3"
style={{width:"250px", minHeight:"100vh"}}
>

<h4 className="mb-4">
Property Admin
</h4>


<ul className="nav flex-column">


<li className="nav-item">
<Link 
className="nav-link text-white"
to="/"
>
<i className="bi bi-speedometer2"></i>
 Dashboard
</Link>
</li>


<li className="nav-item">
<Link 
className="nav-link text-white"
to="/leads"
>
<i className="bi bi-people"></i>
 Leads
</Link>
</li>



<li className="nav-item">
<Link 
className="nav-link text-white"
to="/properties"
>
<i className="bi bi-house"></i>
 Properties
</Link>
</li>



<li className="nav-item">
<Link 
className="nav-link text-white"
to="/settings"
>
<i className="bi bi-gear"></i>
 Settings
</Link>
</li>


</ul>


</div>


{/* Content */}

<div className="flex-grow-1 p-4">

<Outlet />

</div>


</div>

)

}