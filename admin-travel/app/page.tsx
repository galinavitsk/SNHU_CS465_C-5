"use client";

import { LogIn } from "@/api/tripsService";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [signInAllowed, setSignInAllowed] = useState(false);
  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setSignInAllowed(true);
      return;
    }
    setSignInAllowed(false);
  }, [email, password]);
  async function LogInAction() {
    const res = await LogIn(email, password);
    if (res == 200) {
      router.push("/admin");
    }
    setError(res);

  }
  return (<>
    <div className="flex h-24 items-center px-10 gap-x-10">
      <Link href="/" >
        <Image src={"/images/logo.png"} alt="Travlr GetAways" width={100} height={24} /></Link>
    </div>
    <div className="flex flex-col items-center max-w-xl gap-y-5 mx-auto mt-20">
      <input
        className={`input input-outline`}
        value={email}
        placeholder="Email Address"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className={`input input-outline`}
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        disabled={!signInAllowed}
        label="Sign In"
        ignoreMinHeight
        classNames={{ wrapper: "w-28" }}
        onClick={LogInAction}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div></>
  );
};