import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import Search from "./Search";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-green-700 shadow-md">
      <Logo></Logo>
      <Search></Search>
      <div>Login</div>
    </header>
  );
}
