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
import { useSession } from "@/hoooks/useSession"; // Import useSession hook

export function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const user = useSession(); // Get user data from useSession

  return (
    <header className="fixed top-0 left-0 z-50 w-full shadow-sm bg-white dark:bg-black">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Conditionally render Login button if user is not authenticated */}
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
              <Button
                className="dark:bg-[#6b46c1] dark:text-white cursor-pointer"
                onClick={() => {
                  router.push("/jobs"); // Example profile page after login
                }}
                variant="default"
              >
                View Jobs
              </Button>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
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
              {/* Conditionally render Login button on mobile as well */}
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
                <NavbarButton
                  onClick={() => {
                    router.push("/jobs");
                    setIsMobileMenuOpen(false);
                  }}
                  variant="primary"
                  className="w-full"
                >
                View Jobs
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
