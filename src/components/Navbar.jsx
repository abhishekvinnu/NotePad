import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 place-content-evenly text-2xl font-bold">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-[#000000]" : "text-white hover:text-[#000000]"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive ? "text-[#000000]" : "text-white hover:text-[#000000]"
        }
      >
        Notes
      </NavLink>
    </div>
  );
};

export default Navbar;
