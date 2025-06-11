import { Button } from "@/components/ui/button";
import oauth2Client from "@/libs/googleAuth";
import Image from "next/image";
import Link from "next/link";

export default function GoogleButton() {
  const SCOPE = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });

  return (
    <Link href={authorizationUrl}>
      <Button className="flex w-40 mx-auto h-10 items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-3 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
        <Image
          src="/icons8-google.svg"
          alt="Google"
          width={20}
          height={20}
          className="h-5 w-5"
        />
        Google
      </Button>
    </Link>
  );
}
