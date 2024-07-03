import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-green-700 shadow-md">
      <Logo></Logo>
      <Search></Search>
      {user ? (
        <UserActions user={user}></UserActions>
      ) : (
        <LoginButton></LoginButton>
      )}
    </header>
  );
}
