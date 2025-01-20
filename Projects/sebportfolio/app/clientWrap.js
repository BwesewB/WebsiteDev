"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/navbar/page";

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

  return (
    <div style={{ backgroundColor: bgColor}}>
      <Navbar navColor={navColor} />
      {children}
    </div>
  );
}