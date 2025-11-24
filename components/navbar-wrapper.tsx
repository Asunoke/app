"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (!pathname) return null;

  const hideOnDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const hideOnProfile = pathname === "/profile" || pathname.startsWith("/profile/");
  const hideOnTickets = pathname === "/tickets" || pathname.startsWith("/tickets/");
  const hideOnMap = pathname === "/map" || pathname.startsWith("/map/");
  const hideOnStations = pathname.startsWith("/stations/");

  if (hideOnDashboard || hideOnProfile || hideOnTickets || hideOnMap || hideOnStations) return null;

  return <Navbar />;
}
