import { Stack, Box } from "@chakra-ui/react";

import { useFavorites } from "../../contexts/FavoritesContext";

import { RiStarLine, RiContactsLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { isFavoritesOpen, toggleFavorites } = useFavorites();
  return (
    <Stack spacing="12" align="flex-start">
      <Box mt="4">
        <NavSection title="GERAL">
          <NavLink
            isActive={!isFavoritesOpen}
            onClick={isFavoritesOpen && toggleFavorites}
            icon={RiContactsLine}
          >
            Characters
          </NavLink>
          <NavLink
            isActive={isFavoritesOpen}
            onClick={!isFavoritesOpen && toggleFavorites}
            icon={RiStarLine}
          >
            Favorites
          </NavLink>
        </NavSection>
      </Box>
    </Stack>
  );
}
