import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#252422] flex justify-between items-center text-[#FFFCF2] px-4 md:px-12 py-4 md:py-6">
      <label className="font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer">
        FavLib
      </label>
      <div className="flex items-center space-x-5 md:text-lg">
        <p>Add book</p>
        <p>Login</p>
        <p>Sign Up</p>
      </div>
    </nav>
  );
};

export default Navbar;
