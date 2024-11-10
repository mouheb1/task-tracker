// -- ./src/template/partials/sidebar/module/menu-item.tsx
// ./src/template/partials/sidebar/module/menu-item.tsx

import React from "react";
import { cn, isMenuItemActive, translate } from "src/lib/utils";
import { Link } from '@redwoodjs/router';
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useThemeStore } from "src/store";

interface MenuItemProps {
  childItem: any;
  toggleNested: (subIndex: number) => void;
  nestedIndex: number | null;
  index: number;
  locationName: string;
  trans?: any;
}

const MenuItem: React.FC<MenuItemProps> = ({
  childItem,
  toggleNested,
  nestedIndex,
  index,
  locationName,
  trans,
}) => {
  const { icon: Icon, title, nested } = childItem;
  const { isRtl } = useThemeStore();
  const isActive = isMenuItemActive(childItem, locationName);

  return (
    <div>
      {nested ? (
        <div
          className={cn(
            "flex items-center gap-3 px-[10px] py-3 rounded-md cursor-pointer",
            {
              "bg-primary text-primary-foreground": isActive,
              "text-default-600 hover:bg-secondary": !isActive,
            }
          )}
          onClick={() => toggleNested(index)}
        >
          <div className="flex font-medium text-sm capitalize gap-3 flex-1">
            {Icon && (
              <span className="inline-flex items-center">
                <Icon className="h-5 w-5" />
              </span>
            )}
            <span className="flex-grow truncate">{translate(title, trans)}</span>
          </div>
          <div
            className={cn(
              "flex-none transition-all duration-200 text-default-500",
              {
                "transform rotate-90 text-primary-foreground": isActive,
              }
            )}
          >
            {isRtl ? (
              <ChevronLeft className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </div>
        </div>
      ) : (
        <Link
          to={childItem.href}
          className={cn(
            "flex items-center gap-3 px-[10px] py-3 rounded-md",
            {
              "bg-primary text-primary-foreground": isActive,
              "text-default-600 hover:bg-secondary": !isActive,
            }
          )}
        >
          {Icon && (
            <span className="inline-flex items-center">
              <Icon className="h-5 w-5" />
            </span>
          )}
          <span className="flex-grow truncate">{translate(title, trans)}</span>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
