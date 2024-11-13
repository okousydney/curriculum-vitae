"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="flex flex-row justify-between lg:hidden p-4 bg-indigo-300">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          width={180}
          height={28}
          alt="logo"
          className="cursor-pointer"
        ></Image>
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                width={32}
                height={32}
                alt="menu"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content w-60 bg-indigo-300">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  width={152}
                  height={23}
                  alt="logo"
                />

                <ul className="flex flex-col text-base py-4 gap-4">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;
                    return (
                      <li
                        key={link.route}
                        className={`p-2 rounded-full hover:shadow-2xl ${
                          isActive
                            ? "bg-indigo-200 text-indigo-950 shadow-2xl"
                            : "text-white"
                        }`}
                      >
                        <Link
                          className="flex flex-row gap-4 cursor-pointer"
                          href={link.route}
                        >
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
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button bg-indigo-500 bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
