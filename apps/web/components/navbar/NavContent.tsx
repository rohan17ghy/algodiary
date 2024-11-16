"use client";

import { useRecoilValue } from "recoil";
import { activeSectionAtom } from "@algodiary/store";
import {
  LineChart,
  LayoutDashboard,
  List,
  ShoppingCart,
  BarChart3,
  Wallet,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const NavContent = ({
  onNavItemClick,
}: {
  onNavItemClick: (section: string) => void;
}) => {
  const activeSection = useRecoilValue(activeSectionAtom);

  return (
    <nav className="space-y-2">
      {[
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Watchlist", icon: List },
        { name: "Orders", icon: ShoppingCart },
        { name: "Positions", icon: BarChart3 },
        { name: "Funds", icon: Wallet },
        { name: "Trades", icon: LineChart },
        { name: "Accounts", icon: UserCog },
      ].map((item) => (
        <Button
          key={item.name}
          variant={
            activeSection === item.name.toLowerCase() ? "secondary" : "ghost"
          }
          className="w-full justify-start"
          onClick={() => onNavItemClick(item.name.toLowerCase())}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.name}</span>
        </Button>
      ))}
    </nav>
  );
};
