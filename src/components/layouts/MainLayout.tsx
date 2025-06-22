import React, { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
