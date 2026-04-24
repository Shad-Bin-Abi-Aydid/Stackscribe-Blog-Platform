"use client";

import { Menu } from "lucide-react";
import { BookOpen } from "@deemlol/next-icons";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    logout: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = { url: "/", src: "", alt: "logo", title: "StackScribe-Blog" },
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blogs" },
    { title: "Dashboard", url: "/dashboard" },
    { title: "Contact", url: "/contact" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    logout: { title: "Logout", url: "/logout" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // need for after logout navigate the user
  const router = useRouter();

  // get the session
  const { data: session } = authClient.useSession();

  // Handle the logout functionality

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <section
      className={cn(
        "py-3 bg-white/80 dark:bg-indigo-950/60 backdrop-blur-md border-b border-indigo-100 dark:border-indigo-900/50 sticky top-0 z-50 transition-shadow duration-300",
        scrolled && "shadow-md shadow-indigo-100/60 dark:shadow-indigo-950/80",
        className,
      )}
    >
      <div className="container relative p-5 mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo — left */}
          <a href={logo.url} className="flex items-center gap-2 shrink-0">
            <BookOpen className="size-7 text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg font-bold tracking-tighter text-indigo-700 dark:text-indigo-300">
              {logo.title}
            </span>
          </a>

          {/* Nav links — center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item, pathname))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth — right */}
          <div className="flex gap-2 items-center shrink-0">
            <ModeToggle />

            {session ? (
              // Logout
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/40"
              >
                {auth.logout.title}
              </Button>
            ) : (
              <>
                {/* Login */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300 dark:hover:bg-indigo-900/40"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                {/* Register */}
                <Button
                  asChild
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <BookOpen className="size-7 text-indigo-600 dark:text-indigo-400" />
              <span className="text-lg font-bold tracking-tighter text-indigo-700 dark:text-indigo-300">
                {logo.title}
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <BookOpen className="size-7 text-indigo-600 dark:text-indigo-400" />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item, pathname))}
                  </Accordion>
                  <div className="flex flex-col gap-3">
                    <ModeToggle />
                    {session ? (
                      // Logout
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300"
                      >
                        {auth.logout.title}
                      </Button>
                    ) : (
                      <>
                        {/* Login */}
                        <Button
                          asChild
                          variant="outline"
                          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-300"
                        >
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>

                        {/* Register */}
                        <Button
                          asChild
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, pathname: string) => {
  const isActive = pathname === item.url;
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        asChild
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
            : "bg-transparent text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-indigo-900/40 dark:hover:text-indigo-300",
        )}
      >
        <Link href={item.url}>
          {item.title}
          {isActive && (
            <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400" />
          )}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, pathname: string) => {
  const isActive = pathname === item.url;
  return (
    <Link
      key={item.title}
      href={item.url}
      className={cn(
        "text-md font-semibold transition-colors",
        isActive
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-slate-700 dark:text-slate-300",
      )}
    >
      {item.title}
    </Link>
  );
};

export { Navbar };
