import React from "react";
import { verifySession } from "@/libs/dal";
import prisma from "@/databases/db";
import { getProfileDTO } from "@/libs/dto";
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

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
    return date.toISOString().split("T")[0];
  };

  const formattedDate = formatDate(profileUser?.createdAt as Date);

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="my-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex px-10 flex-col xl:flex-row gap-10 items-start">
          <div className="mx-auto max-w-[256px] xl:mx-0 flex-shrink-0 rounded-lg bg-white p-5 text-center shadow-md w-full">
            <div className="py-5">
              <UserCircleIcon className="size-48 mx-auto text-gray-300" />
              <div className="flex items-center gap-2 justify-center">
                <h2 className="text-2xl pl-8 font-bold text-gray-700">{profileUser.name || "User Name"}</h2>
                {profileData.canEdit && (
                  <Link href={`/profile/${slug}/editProfile`}>
                    <PencilSquareIcon className="h-6 w-6 text-[#192f59]" />
                  </Link>
                )}
              </div>
              <p className="text-base font-medium text-gray-500">{profileUser.email || "User Email"}</p>
            </div>
            <div className="py-5 space-y-5">
              <div>
                <p className="text-lg font-semibold text-gray-700">Status</p>
                <p className={`font-medium ${profileUser.isActive ? "text-green-500" : "text-red-500"}`}>{profileUser.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">Join Date</p>
                <p className="font-medium">{formattedDate || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 w-full min-w-0">
            <div className="rounded-lg bg-white p-4 shadow-md w-full">
              <div className="w-full overflow-x-auto scrollbar-hide">
                <NavigationMenu className="min-w-max">
                  <NavigationMenuList className="flex flex-nowrap gap-2">
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={`/profile/${slug}`}>Detail</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={`/profile/${slug}/dashboard`}>Dashboard</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={`/profile/${slug}/eventHistory`}>Event History</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={`/profile/${slug}/certificate`}>Certificate</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={`/profile/${slug}/report`}>Report</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    {(currentUser?.role === "admin" ||
                      currentUser?.role === "university" ||
                      currentUser?.role === "industry") && (
                        <>
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className={navigationMenuTriggerStyle()}
                            >
                              <Link href={`/profile/${slug}/service`}>Service Management</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className={navigationMenuTriggerStyle()}
                            >
                              <Link href={`/profile/${slug}/adminReport`}>Report Management</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        </>
                      )}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-md w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
