import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useModal } from "./ModalContext";

interface FavoritesContextProps {
  children: ReactNode;
}

type FavoritesContextData = {
  isFavoritesOpen: boolean;
  favorites: string[];
  addToFavorites: (id: string) => void;
  removeOfFavorites: (id: string) => void;
  toggleFavorites: () => void;
};

const FavoritesContext = createContext({} as FavoritesContextData);

export function FavoritesProvider({ children }: FavoritesContextProps) {
  const [favorites, setFavorites] = useState<string[]>();
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("Rick-and-Morty-collection/favorites")) {
      setFavorites(
        localStorage.getItem("Rick-and-Morty-collection/favorites").split(",")
      );
    }
  }, []);

  const { onClose } = useModal();

  function addToFavorites(id: string) {
    if (!favorites) {
      localStorage.setItem("Rick-and-Morty-collection/favorites", id);
      setFavorites([id]);
      onClose();
      return;
    }
    const characterAlreadyIsFavorite = favorites.find((characterId: string) => {
      return characterId == id;
    });

    if (characterAlreadyIsFavorite) {
      onClose();
      return;
    }
    const oldFavorites = favorites;
    oldFavorites.push(id);
    setFavorites(oldFavorites);
    localStorage.setItem(
      "Rick-and-Morty-collection/favorites",
      favorites.join(",")
    );
    onClose();
    return;
  }

  function removeOfFavorites(id: string) {
    const newFavorites = favorites.filter((character) => {
      return character != id;
    });
    setFavorites(newFavorites);
    localStorage.setItem(
      "Rick-and-Morty-collection/favorites",
      newFavorites.join(",")
    );
    onClose();
    return;
  }

  function toggleFavorites() {
    setIsFavoritesOpen(!isFavoritesOpen);
  }
  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeOfFavorites,
        isFavoritesOpen,
        toggleFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
