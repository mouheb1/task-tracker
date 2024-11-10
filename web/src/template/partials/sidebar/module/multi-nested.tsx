// -- ./src/template/partials/sidebar/module/multi-nested.tsx
"use client";
import React from "react";
import { Collapsible, CollapsibleContent } from "src/template/ui/collapsible";
import { cn, isLocationMatch, translate } from "src/lib/utils";
import LinkButton from "./link-or-button";

const MultiNestedMenus = ({
  menus,
  index,
  multiIndex,
  locationName,
  trans,
}: {
  menus: any[];
  index: number;
  multiIndex: number | null;
  locationName: string;
  trans: any;
}) => {
  console.log('item.href', item.href);

  return (
    <Collapsible open={multiIndex === index}>
      <CollapsibleContent className="CollapsibleContent">
        <ul className="multi-nested-menu space-y-3 pl-4">
          {menus?.map((item: any, k: number) => (
            <li
              key={`multi_sub_menu_${k}`}
              className={cn(
                "relative before:absolute before:left-4 before:top-0 before:h-full before:w-[2px] before:bg-primary/10 dark:before:bg-primary/20",
                {
                  "before:bg-primary":
                    isLocationMatch(item.href, locationName),
                }
              )}
            >
              <LinkButton
                item={item}
                index={k}
                multiIndex={multiIndex}
                locationName={locationName}
              >
                <div className="pl-3 text-sm capitalize font-normal">
                  {translate(item.title, trans)}
                </div>
              </LinkButton>
              {item.child && (
                <MultiNestedMenus
                  menus={item.child}
                  index={k}
                  multiIndex={multiIndex}
                  locationName={locationName}
                  trans={trans}
                />
              )}
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MultiNestedMenus;
