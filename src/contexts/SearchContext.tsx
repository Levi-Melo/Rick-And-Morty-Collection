import { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextProps {
  children: ReactNode;
}

type SearchContextData = {
  value: string;
  handleChange: (event) => void;
};

const SearchContext = createContext({} as SearchContextData);

export function SearchProvider({ children }: SearchContextProps) {
  const [value, setValue] = useState("");

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <SearchContext.Provider value={{ value, handleChange }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
