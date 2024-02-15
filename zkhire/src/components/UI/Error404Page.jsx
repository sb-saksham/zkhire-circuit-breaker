import React from "react";
import { useNavigate } from "react-router-dom";

const Error404Page = () => {
    const navigate = useNavigate();
    return (
        <div fluid className="text-center">
            <h2>404 Page Not Found  </h2>
            <button variant="success" onClick={()=>navigate('/')}>Go to Home</button>
        </div>
    );
}

export default Error404Page;