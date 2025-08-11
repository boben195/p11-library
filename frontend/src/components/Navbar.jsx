import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-[#252422] flex justify-between items-center text-[#FFFCF2] px-4 md:px-12 py-4 md:py-6">
      <Link to="/">
        <label className="font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer">
          FavLib
        </label>
      </Link>
      <div className="flex items-center space-x-5 md:text-lg">
        <Link to={"/add-book"}>
          <p>Add book</p>
        </Link>
        <Link to={"/login"}>
          <p>Login</p>
        </Link>
        <Link to={"signup"}>
          <p className="bg-[#403D39] px-3 py-2">Sign Up</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
