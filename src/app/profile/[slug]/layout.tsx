import React from "react";
import { verifySession } from "@/libs/dal";
import prisma from "@/databases/db";
import { getProfileDTO } from "@/libs/dto";
// import Image from "next/image";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type ProfileLayoutProps = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = async ({
  params,
  children,
}) => {
  const currentUser = await verifySession();

  const profileUser = await prisma.user.findUnique({
    where: {
      slug: (await params).slug,
    },
  });

  const { slug } = await params;

  const profileData = await getProfileDTO(slug, currentUser?.userId as String);

  const formatDate = (dateTime: string | Date) => {
    const date = new Date(dateTime);
    return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
  };

  // Usage
  const formattedDate = formatDate(profileUser?.createdAt as Date);

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto">
        {/* Two Tabs Layout */}
        <div className="flex px-10 flex-col md:flex-row md:px-0 items-start gap-10 flex-row">
          {/* Left Tab: Profile */}
          <div className="mx-auto max-w-xs flex-shrink-0 rounded-lg bg-white p-5 text-center shadow-md w-full">
            {/* Profile Header */}
            <div className="py-5">
              {/* <Image
                src="/profile-template.png"
                alt="User Avatar"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-md"
              /> */}
              <UserCircleIcon className="size-48 mx-auto text-gray-300" />
              <div className="flex items-center gap-3 justify-center">
                <h2 className="text-2xl pl-8 font-bold text-gray-700">
                  {profileUser.name || "User Name"}
                </h2>
                {profileData.canEdit && (
                  <Link href={`/profile/${slug}/editProfile`}>
                    <PencilSquareIcon className="h-6 w-6 text-[#192f59]" />
                  </Link>
                )}
              </div>
              <p className="text-base font-medium text-gray-500">
                {profileUser.email || "User Email"}
              </p>
            </div>
            {/* Profile Details */}
            <div className="py-5 space-y-5">
              {/* Status */}
              <div className="text-center">
                <label
                  htmlFor="status"
                  className="text-lg font-semibold text-gray-700"
                >
                  Status
                </label>
                <p
                  className={`text-base font-medium ${profileUser.isActive ? "text-green-500" : "text-red-500"}`}
                >
                  {profileUser.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              {/* Join Date */}
              <div className="text-center">
                <label
                  htmlFor="join-date"
                  className="text-lg font-semibold text-gray-700"
                >
                  Join Date
                </label>
                <p className="font-medium">
                  {formattedDate || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Right Tab */}
          <div className="flex flex-col gap-10 w-full">
            {/* Top Section: Navigation Menu */}
            <div className="rounded-lg bg-white p-4 shadow-md">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href={`/profile/${slug}`} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Detail
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/dashboard`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/eventHistory`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Event History
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/certificate`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Certificate
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href={`/profile/${slug}/report`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Report
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  {currentUser?.role === "admin" && (
                    <NavigationMenuItem>
                      <Link
                        href={`/profile/${slug}/service`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Service
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
