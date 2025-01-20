"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/navbar/page";
import { useEffect } from "react";

export default function ClientWrap({ children }) {
  const pathname = usePathname();

  const pageStyles = {
    "/": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/3d": { bgColor: "var(--black)", navColor: "var(--white)" },
    "/pages/motion": { bgColor: "var(--black)", navColor: "var(--white)" },
    "/pages/visual": { bgColor: "var(--white)", navColor: "var(--blue)" },
    "/pages/teamwork": { bgColor: "var(--white)", navColor: "var(--blue)" },
  };

  const { bgColor, navColor } = pageStyles[pathname] || pageStyles["/"];

  // Update styles for the html and body elements directly
  useEffect(() => {
    document.documentElement.style.backgroundColor = bgColor; // Update <html> background color
    document.body.style.backgroundColor = bgColor; // Update <body> background color
  }, [bgColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--nav-color', navColor); // Update nav color
  }, [navColor]);

  return (
    <>
      <Navbar navColor={navColor} />
      {children}
    </>
  );
}
