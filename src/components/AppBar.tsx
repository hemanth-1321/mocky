"use client";

import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "@/hoooks/useSession"; 
import {
  Avatar,
  AvatarFallback,
  AvatarImage, 
} from "@/components/ui/avatar";

export function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const user = useSession(); 

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white dark:bg-black">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {!user ? (
              <Button
                className="dark:bg-[#6b46c1] dark:text-white cursor-pointer"
                onClick={() => {
                  router.push("/sign-in");
                }}
                variant="default"
              >
                Login
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{user.username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-4">
              {!user ? (
                <NavbarButton
                  onClick={() => {
                    router.push("/sign-in");
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              ) : (
                <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{user.username?.charAt(0)?.toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
