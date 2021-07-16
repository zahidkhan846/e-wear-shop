import React from "react";
import { useAuth } from "../../store/contexts/AuthContext";
import { Link } from "react-router-dom";

function UserProfile() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Manage your account</h1>
      <div>
        <Link to="/add-product">Add Product</Link>
      </div>
    </div>
  );
}

export default UserProfile;
