import { BookOpen } from "@deemlol/next-icons";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Blog", url: "/blogs" },
    { title: "Dashboard", url: "/dashboard" },
    { title: "Contact", url: "/contact" },
  ];

  const resourceLinks = [
    { title: "Help Center", url: "#" },
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
  ];

  const socialLinks = [
    { title: "Twitter", url: "#" },
    { title: "GitHub", url: "#" },
    { title: "LinkedIn", url: "#" },
  ];

  return (
    <footer className="bg-indigo-50 dark:bg-indigo-950 border-t border-indigo-100 dark:border-indigo-900">
      <div className="container p-5 mx-auto py-12">
        <div className="flex flex-wrap gap-8 justify-between">
          {/* Brand column */}
          <div className="w-full sm:w-auto max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <BookOpen className="size-7 text-indigo-600 dark:text-indigo-400" />
              <span className="text-lg font-bold tracking-tighter text-indigo-900 dark:text-white">
                StackScribe
              </span>
            </Link>
            <p className="text-sm text-indigo-500 dark:text-indigo-300/70 leading-relaxed">
              A place to read, write, and deepen your understanding of the world.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-indigo-800 dark:text-indigo-200">Navigate</h3>
            <ul className="space-y-2 text-sm text-indigo-500 dark:text-indigo-300/70">
              {navLinks.map((link) => (
                <li key={link.title} className="hover:text-indigo-900 dark:hover:text-white transition-colors duration-200">
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-indigo-800 dark:text-indigo-200">Resources</h3>
            <ul className="space-y-2 text-sm text-indigo-500 dark:text-indigo-300/70">
              {resourceLinks.map((link) => (
                <li key={link.title} className="hover:text-indigo-900 dark:hover:text-white transition-colors duration-200">
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-indigo-800 dark:text-indigo-200">Social</h3>
            <ul className="space-y-2 text-sm text-indigo-500 dark:text-indigo-300/70">
              {socialLinks.map((link) => (
                <li key={link.title} className="hover:text-indigo-900 dark:hover:text-white transition-colors duration-200">
                  <Link href={link.url}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-indigo-200 dark:border-indigo-800 pt-6 flex flex-col gap-2 text-sm text-indigo-400 dark:text-indigo-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StackScribe. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-indigo-900 dark:hover:text-white transition-colors duration-200">Terms</Link>
            <Link href="#" className="hover:text-indigo-900 dark:hover:text-white transition-colors duration-200">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
