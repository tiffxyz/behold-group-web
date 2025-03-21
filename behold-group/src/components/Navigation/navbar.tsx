import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,

} from "@heroui/react";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import clsx from "clsx";
import { link as linkStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import NavDropdown from "./dropdown-nav";

import { useDisclosure } from "@heroui/react";
import LoginModal from "../Auth/Modals/login-modal";
import { useApp } from "@/components/context/AppContext";

export const Navbar = () => {
  const { user} = useApp();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit">Behold Group</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              {item.dropdownItems ? (
                <NavDropdown
                  items={item.dropdownItems}
                  label={item.label}
                  href={item.href}
                />
              ) : (
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden lg:flex">
          {searchInput}
        </NavbarItem>

        <NavbarItem className="hidden lg:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/portal" color="primary">
                Partner Portal
              </Link>

            </div>
          ) : (
            <Link
              color="primary"
              onPress={onOpen}
            >
              Partner Portal
            </Link>
          )}
          <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;
