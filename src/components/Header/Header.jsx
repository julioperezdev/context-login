import React, { useContext} from "react";
import LoginContext from "../../context/Login/LoginContext";

import "./header.css"

 const Header = () => {

    //const { userInfo } = useContext(LoginContext)
    const userInfo = false



    const logout = () => {
        sessionStorage.clear();
        window.location.href = "/login"
        localStorage.clear();
    };

    return (
        <div className = "component.header">

            {
                (!userInfo) 
                ? (
                    <div>
                        <button type="submit">inicio</button>
                        <button type="submit">contactos</button>
                        <button type="submit">login</button>        
                    </div>
                    )
                : (
                    <div>
                        <button type="submit">administrar</button>
                        <button type="submit">enlazar</button>
                        <button type="submit" onClick={logout}>logout</button>        
                    </div>
                )
                
            }
        </div>
    )
}

export default Header;