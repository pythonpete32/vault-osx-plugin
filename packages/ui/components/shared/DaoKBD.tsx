"use client";

import { useCommandContext } from "../providers/command-provider";
import { Button } from "../ui/button";

export const DaoKBD = () => {
  const { toggleOpen } = useCommandContext();
  return (
    <Button
      variant="outline"
      className="space-x-4"
      onClick={() => toggleOpen()}
    >
      <p>Search...</p>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
};
