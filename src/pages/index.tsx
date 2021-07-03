import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";

import { useCharacters } from "../services/hooks/useCharacters";
import { useSearch } from "../contexts/SearchContext";
import { useFavorites } from "../contexts/FavoritesContext";

import { Header } from "../components/Header/Index";
import { Pagination } from "../components/Pagination/Index";
import { Sidebar } from "../components/Sidebar/Index";
import { SearchBox } from "../components/Header/SearchBox";
import { CharactersContent } from "../components/content/CharactersContent";
import { CharacterModal } from "../components/modal";
import Head from "next/head";

export default function charactersList() {
  const { value } = useSearch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { isFavoritesOpen, toggleFavorites } = useFavorites();

  useEffect(() => {
    if (isFavoritesOpen) {
      toggleFavorites();
    }
    setSearch(value);
  }, [value]);

  const { data, isLoading, isFetching, error } = useCharacters(
    page,
    search,
    isFavoritesOpen
  );

  const isWide = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Head>
        <title>Rick and Morty | {isFavoritesOpen ? "Favorites" : "Home"}</title>
      </Head>
      <Box>
        <Header />
        <Flex w="100%" my="auto" maxW="1480" mx="auto" px={["4", "4", "6"]}>
          <Sidebar />
          <Flex direction="column">
            {!isWide && <SearchBox />}
            <Box flex="1" borderRadius={8} mt={["4", "0"]} bg="gray.800" p="8">
              <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal" m={isWide ? "" : "auto"}>
                  {isFavoritesOpen
                    ? "Favorites"
                    : search
                    ? search
                    : "All Characters"}
                  {!isLoading && isFetching && (
                    <Spinner size="sm" color="gray.500" ml="4" />
                  )}
                </Heading>
              </Flex>

              {isLoading ? (
                <Flex align="center" justify="center">
                  <Spinner />
                </Flex>
              ) : error ? (
                <Flex align="center" justify="center">
                  <Text>The character searched does not exist.</Text>
                </Flex>
              ) : isFavoritesOpen ? (
                <CharactersContent characters={data.characters} />
              ) : (
                <>
                  <CharactersContent characters={data.characters} />
                  <Box mx="auto" justify="center" align="center" w="max">
                    {!value && (
                      <Pagination
                        totalCountOfRegisters={data.info.count}
                        currentPage={page}
                        onPageChange={setPage}
                        lastPage={data.info.pages}
                      />
                    )}
                  </Box>
                </>
              )}
            </Box>
            <CharacterModal />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
