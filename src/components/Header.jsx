import { PencilLine, SignIn, SignOut } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("userToken");

  const deleteToken = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    window.location.reload();
    window.location.href("/")
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Search for Jobs", href: "/search" },
    { name: "Favourites", href: token ? "/favourites" : "/login" },
  ];

  return (
    <header className="shadow-xl">
      <nav className="container mx-auto flex justify-between items-center">
        <ul className="flex justify-center items-center gap-2 flex-1">
          {links.map(({ name, href }, idx) => (
            <NavLink to={href} className="nav-items" key={idx}>
              {name}
            </NavLink>
          ))}
        </ul>
        <div>
          {token ? (
            <button className="auth-btn" onClick={deleteToken}>
              <span>Logout</span>
              <SignOut />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="auth-btn">
                <span>Signin</span>
                <SignIn />
              </Link>
              <Link to="/register" className="auth-btn">
                <span>Signup</span>
                <PencilLine />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
