// -- ./src/template/partials/sidebar/module/index.tsx
// ./src/template/partials/sidebar/module/index.tsx

import React, { useEffect, useState } from 'react';
import { cn, isLocationMatch, getDynamicPath } from 'src/lib/utils';
import { menusConfig } from 'src/config/menus';
import SingleIconMenu from './single-icon-menu';
import { useSidebar } from 'src/store';
import MenuItem from './menu-item';
import NestedMenus from './nested-menus';
import { Link, useRoutePath } from '@redwoodjs/router';
import FooterMenu from './footer-menu';
import { SiteLogo } from 'src/template/svg';
import { ScrollArea } from 'src/template/ui/scroll-area';
import LogoutFooter from './logout-footer';
import { useMediaQuery } from 'src/hooks/use-media-query';
import MenuOverlayPortal from './MenuOverlayPortal';
import { ChevronLeft } from 'lucide-react';
import { Button } from 'src/template/ui/button';
import { useAuth } from 'src/auth';

const ModuleSidebar = () => {
  const { currentUser } = useAuth();
  const Roles = currentUser?.roles || [];
  const { subMenu, setSubmenu, collapsed, setCollapsed, sidebarBg } = useSidebar();

  const isRtl = false;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentSubMenu, setCurrentSubMenu] = useState<any[]>([]);
  const [nestedIndex, setNestedIndex] = useState<number | null>(null);
  const [multiNestedIndex, setMultiNestedIndex] = useState<number | null>(null);
  const [menuOverlay, setMenuOverlay] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const pathname = useRoutePath();
  const locationName = getDynamicPath(pathname);

  const filterMenuByRoles = (menuItems) => {
    return menuItems
      .filter((menu) => {
        if (menu.requiredRoles) {
          return menu.requiredRoles.some((role) => Roles.includes(role));
        }
        return true;
      })
      .map((menu) => {
        if (menu.child) {
          return {
            ...menu,
            child: filterMenuByRoles(menu.child),
          };
        }
        return menu;
      });
  };


  const menus = filterMenuByRoles(
    menusConfig[currentUser.role?.toLowerCase()]
      ? menusConfig[currentUser.role.toLowerCase()].sidebarNav.modern
      : menusConfig.blank.sidebarNav.modern
  );



  const toggleSubMenu = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setCurrentSubMenu([]);
      setNestedIndex(null);
      setMultiNestedIndex(null);
    } else {
      setActiveIndex(index);
      setCurrentSubMenu(menus[index].child);
      setSubmenu(false);
      setCollapsed(false);
      setNestedIndex(null); // Reset nestedIndex when switching top-level menus
      setMultiNestedIndex(null);
      if (!isDesktop) {
        setMenuOverlay(true);
      }
    }
  };

  const toggleNested = (subIndex: number) => {
    if (nestedIndex === subIndex) {
      setNestedIndex(null);
      setMultiNestedIndex(null);
    } else {
      setNestedIndex(subIndex);
      setMultiNestedIndex(null); // Reset multiNestedIndex when switching nested menus
    }
  };

  const toggleMultiNested = (index: number) => {
    if (multiNestedIndex === index) {
      setMultiNestedIndex(null);
    } else {
      setMultiNestedIndex(index);
    }
  };

  function setActiveMenu(menuIndex: number, childMenu: any) {
    setActiveIndex(menuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
    setNestedIndex(null);
    setMultiNestedIndex(null);
  }

  function setActiveNestedMenu(
    menuIndex: number,
    nestedMenuIndex: number,
    childMenu: any
  ) {
    setActiveIndex(menuIndex);
    setNestedIndex(nestedMenuIndex);
    setCurrentSubMenu(childMenu);
    setSubmenu(false);
    setCollapsed(false);
  }

  const getMenuTitle = () => {
    if (activeIndex !== null) {
      return menus?.[activeIndex]?.title;
    }
    return '';
  };

  useEffect(() => {
    let isMenuMatched = false;
    menus.forEach((item: any, i: number) => {
      if (item?.href) {
        if (isLocationMatch(item.href, locationName)) {
          isMenuMatched = true;
          setSubmenu(true);
          setCollapsed(true);
          setMenuOverlay(false);
        }
      }

      item?.child?.forEach((childItem: any, j: number) => {
        if (isLocationMatch(childItem.href, locationName)) {
          setActiveMenu(i, item.child);
          setMenuOverlay(false);
          isMenuMatched = true;
        }

        if (childItem.nested) {
          childItem.nested.forEach((nestedItem: any) => {
            if (isLocationMatch(nestedItem.href, locationName)) {
              setActiveNestedMenu(i, j, item.child);
              setMenuOverlay(false);
              isMenuMatched = true;
            }
            if (nestedItem.child) {
              nestedItem.child.forEach((multiItem: any, k: number) => {
                if (isLocationMatch(multiItem.href, locationName)) {
                  setActiveNestedMenu(i, j, item.child);
                  setMenuOverlay(false);
                  isMenuMatched = true;
                }
              });
            }
          });
        }
      });
    });
    if (!isMenuMatched) {
      setSubmenu(false);
    }
    if (!isDesktop) {
      setSubmenu(true);
    }
  }, [locationName, isDesktop]);


  useEffect(()=> {
    if(menus && !currentSubMenu && !currentSubMenu?.length) {
      toggleSubMenu(0)
    }
  }, [currentSubMenu])

  return (
    <>
      <div className="main-sidebar pointer-events-none fixed start-0 top-0 z-[60] flex h-full xl:z-10 print:hidden">
        {/* Small Sidebar */}
        <div
          className={cn(
            'border-default-200 dark:border-default-300 pointer-events-auto relative z-20 flex h-full w-[72px] flex-col border-r border-dashed bg-card transition-all duration-300',
            {
              'ltr:-translate-x-full rtl:translate-x-full ltr:xl:translate-x-0 rtl:xl:translate-x-0':
                !collapsed && subMenu,
              'translate-x-0': collapsed,
            }
          )}
        >
          <div className="pt-4">
            <Link to="/dashboard">
              <SiteLogo className="mx-auto text-primary h-8 w-8" />
            </Link>
          </div>
          {/* Menu Items */}
          <ScrollArea className="pt-6 grow">
            {menus.map((item, i) => (
              <div key={i} onClick={() => toggleSubMenu(i)} className="mb-3 last:mb-0">
                <SingleIconMenu index={i} activeIndex={activeIndex} item={item} locationName={locationName} />
              </div>
            ))}
          </ScrollArea>
          {/* <FooterMenu /> */}
        </div>
        {/* Main Sidebar Panel */}
        <div
          className={cn(
            'border-default-200 pointer-events-auto relative z-10 flex flex-col h-full w-[228px] border-r bg-card transition-all duration-300',
            {
              'rtl:translate-x-[calc(100%_+_72px)] translate-x-[calc(-100%_-_72px)]':
                collapsed || subMenu,
            }
          )}
        >
          {sidebarBg !== 'none' && (
            <div
              className="absolute left-0 top-0 z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
              style={{ backgroundImage: `url(${sidebarBg})` }}
            ></div>
          )}
          <h2 className="text-lg bg-transparent z-50 font-semibold flex gap-4 items-center text-default-700 sticky top-0 py-4 px-4 capitalize">
            <span className="block">{getMenuTitle()}</span>
            {!isDesktop && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setCollapsed(true);
                  setSubmenu(true);
                  setMenuOverlay(false);
                }}
                className="rounded-full h-8 w-8"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
          </h2>
          <ScrollArea className="h-[calc(100%-40px)] grow">
            <div className="px-4" dir={isRtl ? 'rtl' : 'ltr'}>
              <ul>
                {currentSubMenu?.map((childItem, j) => (
                  <li key={j} className="mb-1.5 last:mb-0">
                    <MenuItem
                      childItem={childItem}
                      toggleNested={toggleNested}
                      index={j}
                      nestedIndex={nestedIndex}
                      locationName={locationName}
                    />
                    <NestedMenus
                      index={j}
                      nestedIndex={nestedIndex}
                      nestedMenus={childItem.nested}
                      locationName={locationName}
                      toggleMulti={toggleMultiNested}
                      multiIndex={multiNestedIndex}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
          {/* <LogoutFooter /> */}
        </div>
        {/* Menu Overlay for Mobile */}
        {!isDesktop && (
          <MenuOverlayPortal
            isOpen={menuOverlay || collapsed}
            onClose={() => {
              setMenuOverlay(false);
              setSubmenu(true);
              setCollapsed(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ModuleSidebar;
