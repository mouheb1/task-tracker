// -- ./src/template/partials/sidebar/common/logo.tsx
import { SiteLogo } from "src/template/svg";
import { useSidebar } from "src/store";
import React from "react";

const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {
  const { collapsed } = useSidebar();
  return (
    <div className="px-4 py-4 ">
      <div className=" flex items-center">
        <div className="flex flex-1 items-center gap-x-3  ">
          <SiteLogo className="text-primary h-8 w-8" />
          {(!collapsed || hovered) && (
            <div className="flex-1  text-xl text-primary  font-semibold">
              DashTail
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarLogo;
