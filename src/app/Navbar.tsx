import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <header className="w-full ">
      <Link href={"/"} className="p-2 flex gap-2 justify-center items-center hover:text-orange-700 transition-all duration-300  text-white rounded-lg text-xl font-bold">
        Social Media Texts Generator
      </Link>
    </header>
  );
};

export default Navbar;
