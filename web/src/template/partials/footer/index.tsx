// -- ./src/template/partials/footer/index.tsx
import React from "react";
import { useSidebar, useThemeStore } from "src/store";
import { cn } from "src/lib/utils";
import { useMediaQuery } from "src/hooks/use-media-query";
import MobileFooter from "./mobile-footer";
import FooterLayout from "./footer-layout";
import { useMounted } from "src/hooks/use-mounted";

const Footer = ({ handleOpenSearch }: { handleOpenSearch: () => void }) => {
  const { collapsed } = useSidebar();
  const sidebarType = 'module'
  const { layout, footerType } = useThemeStore();
  const mounted = useMounted();
  const isMobile = useMediaQuery("(min-width: 768px)");

  if (!mounted) {
    return null;
  }
  if (!isMobile && sidebarType === "module") {
    return <MobileFooter handleOpenSearch={handleOpenSearch} />;
  }

  return (
    <FooterLayout
      className={cn("", {
        "ltr:xl:ml-[300px] rtl:xl:mr-[300px]": !collapsed,
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
        "sticky bottom-0": footerType === "sticky",
      })}
    >
      <FooterContent />
    </FooterLayout>
  );
};

export default Footer;

const FooterContent = () => {
  return (
    <div className="block md:flex md:justify-between text-muted-foreground">
      <p className="sm:mb-0 text-xs md:text-sm">
        COPYRIGHT © {new Date().getFullYear()}
      </p>
      <p className="mb-0 text-xs md:text-sm">
        Hand-crafted & Made by{"incentino"}
        {/* <a
          className="text-primary"
          target="__blank"
          href="https://codeshaper.net"
        >
          Codeshaper
        </a> */}
      </p>
    </div>
  );
};
