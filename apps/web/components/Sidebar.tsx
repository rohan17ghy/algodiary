"use client";

import NavContent from "./navbar/NavContent";

export default function Sidebar({
  onNavItemClick,
}: {
  onNavItemClick: (section: string) => void;
}) {
  return (
    <aside className="hidden lg:block w-64 border-r overflow-y-auto">
      <div className="p-4">
        <NavContent onNavItemClick={onNavItemClick} />
      </div>
    </aside>
  );
}
