"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex items-center justify-start">
          <h1 className="text-2xl font-bold flex item-center justify-center">
            smahmud <span className="text-amber-600">77</span>
          </h1>
        </div>
        <div className="col-span-7 flex items-center justify-center gap-5">
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? "text-amber-600 font-bold"
                : "text-black font-bold"
            }
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className={
              pathname === "/about"
                ? "text-amber-600 font-bold"
                : "text-black font-bold"
            }
          >
            About
          </Link>
          <Link
            href={"/jobs"}
            className={
              pathname === "/jobs"
                ? "text-amber-600 font-bold"
                : "text-black font-bold"
            }
          >
            Jobs
          </Link>
          <Link
            href={"/deshboard"}
            className={
              pathname === "/deshboard"
                ? "text-amber-600 font-bold"
                : "text-black font-bold"
            }
          >
            Deshboard
          </Link>
        </div>
        <div className="col-span-3 flex items-center justify-end gap-5">
          <Link href={"/auth/signup"} className={"text-black font-bold"}>
            Get Started
          </Link>
          <Link href={"/auth/signin"} className={"text-black font-bold"}>
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
