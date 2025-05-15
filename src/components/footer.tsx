import { Heart, Github, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-4 border-t-2 border-white/50 bg-white/10">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mt-3 md:mt-0">
          <div className="flex space-x-3">
            <Link
              href="#"
              className="text-white hover:text-[#ff47c7] transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={24} />
            </Link>
            <Link
              href="#"
              className="text-white hover:text-[#00f2ea] transition-colors duration-200"
              aria-label="Website"
            >
              <Globe size={24} />
            </Link>
          </div>
          <div className="flex items-center text-white">
            <span className="mr-1 font-semibold">Made with</span>
            <span className="text-4xl leading-0">🦭</span>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center mt-3">
        <div className="h-0.5 w-16 bg-gradient-to-r from-[#ff47c7] to-[#00f2ea] rounded-full opacity-50"></div>
      </div> */}
    </footer>
  );
}
