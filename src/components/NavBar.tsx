"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="NavBar bg-g5 text-n1 shadow-md">
      <nav className="mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="h-full">
            <Link href="https://www.digitalnovastudio.com">
              <Image
                src="/logo-dark.png"
                alt="DigitalNova"
                width={210}
                height={58}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="SidebarHeader">
              <h1 className="text-p1 text-2xl font-bold">Nova Assistant</h1>
              <span className="text-g1 text-sm">DigitalNova Studio</span>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="MobileNavButton hover:bg-g3 rounded-md p-2 transition-colors md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="text-n1 h-6 w-6" />
            ) : (
              <Menu className="text-n1 h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="MobileNavMenu mt-4 pb-4 md:hidden">
            <div className="flex flex-col space-y-4"></div>
          </div>
        )}
      </nav>
    </header>
  );
}
