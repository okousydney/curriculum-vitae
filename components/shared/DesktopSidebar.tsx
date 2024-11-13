"use client";

import { navLinks } from "@/lib/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <aside>
      <div className="h-full flex-col gap-4 hidden lg:flex bg-indigo-300 text-white p-2 shadow-2xl shadow-indigo-700">
        <Link href="/" className="flex flex-row justify-center">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="flex h-full flex-col justify-between text-xl py-4">
          <SignedIn>
            <ul>
              {navLinks.slice(0, 3).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`p-6 rounded-full hover:shadow-2xl ${
                      isActive
                        ? "bg-indigo-200 text-indigo-950 shadow-2xl"
                        : "text-white"
                    }`}
                  >
                    <Link className="flex flex-row gap-4" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${
                          isActive ? "brightness-50" : "brightness-200"
                        }`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul>
              {navLinks.slice(3).map((link) => {
                const isActive = link.route === pathname;
                return (
                  <li
                    key={link.route}
                    className={`p-6 rounded-full hover:shadow-2xl ${
                      isActive
                        ? "bg-indigo-200 text-indigo-950 shadow-2xl"
                        : "text-white"
                    }`}
                  >
                    <Link className="flex flex-row gap-4" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${
                          isActive ? "brightness-50" : "brightness-200"
                        }`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-4 p-6">
                <UserButton showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-indigo-500 bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
