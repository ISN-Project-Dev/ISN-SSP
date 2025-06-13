import { verifySession } from "@/libs/dal";
import Image from "next/image";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
    MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default async function Header() {
  const currentUser = await verifySession();

  const navLinks = [
    { title: "Home", url: "/" },
    { title: "Event", url: "/event" },
    { title: "Announcement", url: "/announcement" },
    ...(currentUser?.role === "admin" ? [{ title: "Admin", url: "/admin" }] : []),
  ];

  return (
    <nav className="w-full bg-[#192f59]">
      <div className="flex max-w-[1440px] mx-auto items-center justify-between px-5 py-3 text-white">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-5">
          <Image
            src="/ISN_Primary_Logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <h1 className="text-base font-semibold">SKS Student Portal</h1>
        </div>
        {/* Center: Navigation */}
        <div className="flex gap-6 text-sm font-semibold">
          {navLinks.map(({ title, url }, i) => (
            <Link key={i} href={url} className="px-3 hover:text-gray-300 transition">
              {title}
            </Link>
          ))}
        </div>
        {/* Right: Auth Dropdown or Login */}
        <div className="relative">
          {currentUser ? (
            <Menubar className="bg-[#192f59] border-none shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="flex cursor-pointer items-center gap-1 px-2 py-1 text-sm font-medium text-white hover:text-gray-300 focus:text-white data-[state=open]:text-white bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent border-none shadow-none outline-none">
                  <UserCircleIcon className="w-8 h-8" strokeWidth={1}/>
                  <ChevronDownIcon className="w-4 h-4" />
                </MenubarTrigger>
                <MenubarContent align="end" className="w-40">
                  <Link href={`/profile/${currentUser.slug}`}>
                    <MenubarItem>Profile</MenubarItem>
                  </Link>
                  <MenubarSeparator />
                <MenubarItem asChild>
                  <LogoutButton />
                </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <Link href="/auth/login">
              <button className="items-centerh-10 text-sm px-5 py-2 rounded-lg bg-white text-[#192f59] hover:bg-gray-300 focus:ring-1 focus:ring-[#2f4369] focus:ring-offset-1">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}