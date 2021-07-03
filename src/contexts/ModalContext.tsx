import { createContext, ReactNode, useContext, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";

interface ModalContextProps {
  children: ReactNode;
}

type ModalContextData = {
  isOpen: boolean;
  handle: (id: string) => void;
  onClose: () => void;
  characterId: string;
};

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalContextProps) {
  const [characterId, setCharacterId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handle(id: string) {
    setCharacterId(id);
    onOpen();
  }

  return (
    <ModalContext.Provider value={{ isOpen, handle, onClose, characterId }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
