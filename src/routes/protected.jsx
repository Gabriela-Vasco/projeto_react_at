import { Outlet, Navigate } from "react-router-dom"

 const Protected = () => {
    const session = localStorage.getItem('session');

    return session ? <Outlet /> : <Navigate to="/signin" />
}

export default Protected;