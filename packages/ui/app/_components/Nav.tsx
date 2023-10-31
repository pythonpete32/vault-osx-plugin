import Link from "next/link";
import { Tally3 as IconComponent } from "lucide-react";
import { ConnectKitButton } from "connectkit";

import { pangchang } from "@/app/layout";
import { cn } from "@/lib/utils";

export function Nav() {
  return (
    <nav className="border-b flex flex-col sm:flex-row items-start sm:items-center sm:pr-10">
      <div className=" sm:px-8 py-3 px-4 flex flex-1 items-center p">
        <Link href="/" className="mr-5 flex items-center">
          <IconComponent className="opacity-85" size={19} />
          <p
            className={cn(
              `ml-2 mr-4 text-lg font-semibold`,
              pangchang.className
            )}
          >
            Aragon Vaults
          </p>
        </Link>
      </div>
      <div className=" flex sm:items-center pl-4 pb-3 sm:p-0 space-x-2">
        <ConnectKitButton showBalance theme="midnight" />
      </div>
    </nav>
  );
}
