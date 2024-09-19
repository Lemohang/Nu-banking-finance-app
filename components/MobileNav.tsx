"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  user: {
    firstName: string;
    lastName: string;
  };
}

const MobileNav = ({ user }: MobileNavProps ) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent side="left" className="border-none bg-white">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
              <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="logo"
                className="size-[24px] max-xl:size-14"
              />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Nu-Bank</h1>
            </Link>

            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
                    return (
                      <SheetClose asChild key={item.route}>
                        <Link
                          href={item.route}
                          key={item.label}
                          className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                        >
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({ 'brightness-[3] invert-0': isActive })}
                          />
                          <p
                            className={cn('text-16 font-semibold text-black-2', {
                              'text-white': isActive,
                            })}
                          >
                            {item.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {/* Display user information */}
                  <div className="mt-8 text-center text-black-2">
                    <p className="text-sm">Logged in as:</p>
                    <p className="text-lg font-bold">{user.firstName} {user.lastName}</p>
                  </div>
                </nav>
              </SheetClose>

              <footer className="mt-auto text-center text-xs text-gray-400">Nu-Bank &copy; 2024</footer>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;