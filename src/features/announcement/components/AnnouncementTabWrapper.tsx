"use client";

import dynamic from "next/dynamic";

// Dynamically import AnnouncementTabs with SSR disabled
const AnnouncementTabs = dynamic(() => import("@/features/announcement/components/AnnouncementTabs"), {
  ssr: false,
});

type Props = {
  general: any[];
  event: any[];
  currentUser: { role: string } | null;
};

export default function AnnouncementTabWrapper({ general, event, currentUser }: Props) {
  return <AnnouncementTabs general={general} event={event} currentUser={currentUser}/>;
}
