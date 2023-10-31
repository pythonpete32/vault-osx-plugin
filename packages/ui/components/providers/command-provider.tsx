import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface CommandContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleOpen: () => void;
}

export const CommandContext = createContext<CommandContextProps | undefined>(
  undefined
);

export const CommandProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((open) => !open);

  return (
    <CommandContext.Provider value={{ open, setOpen, toggleOpen }}>
      {children}
    </CommandContext.Provider>
  );
};

import { useContext } from "react";

export function useCommandContext(): CommandContextProps {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error("useCommandContext must be used within a CommandProvider");
  }
  return context;
}
