"use client";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
export const NavigationBar = () => {
  const [selectedPage, setSelectedPage] = useState("travel");
  const selectedNavLink = "text-orange-700 font-bold";
  const navLink = "text-blue-600 cursor-pointer hover:text-orange-400";
  const router = useRouter();
  function LogOut() {
    if (window != undefined) {
      window.localStorage.removeItem('travlr-token');
    };
    router.push("/");
    router.refresh();
  }
  return (
    <div className="flex h-24 items-center px-10 gap-x-10">
      <Link href="/" ><Image src={"/images/logo.png"} alt="Vercel Logo" width={100} height={24} /></Link>
      <a className={`${selectedPage == "travel" ? selectedNavLink : navLink}`} onClick={() => { setSelectedPage("travel"); }}>Trips</a>
      <a className={`${selectedPage == "rooms" ? selectedNavLink : navLink}`} onClick={() => { setSelectedPage("rooms"); }}>Rooms</a>
      <Button
        label="Log Out"
        classNames={{ wrapper: "ml-auto" }}
        ignoreMinHeight
        onClick={LogOut} />

    </div>
  );
}
