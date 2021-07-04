import React, { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import {
  Box,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";

import { getCharacters, useCharacters } from "../services/hooks/useCharacters";
import { useSearch } from "../contexts/SearchContext";
import { useFavorites } from "../contexts/FavoritesContext";

import { Header } from "../components/Header/Index";
import { Pagination } from "../components/Pagination/Index";
import { Sidebar } from "../components/Sidebar/Index";
import { SearchBox } from "../components/Header/SearchBox";
import { CharactersContent } from "../components/content/CharactersContent";
import { CharacterModal } from "../components/modal";

export default function charactersList({ characters, info }) {
  const { value } = useSearch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { isFavoritesOpen, toggleFavorites, favorites } = useFavorites();

  useEffect(() => {
    if (isFavoritesOpen) {
      toggleFavorites();
    }
    setSearch(value);
  }, [value]);

  const { data, isLoading, isFetching, error } = useCharacters(
    page,
    search,
    isFavoritesOpen,
    { characters, info }
  );
  const isWide = useBreakpointValue({
    base: false,
    lg: true,
    md: true,
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
                <>
                  {favorites ? (
                    <CharactersContent characters={data.characters} />
                  ) : (
                    <Text>You don't have favorites yet.</Text>
                  )}
                </>
              ) : (
                <>
                  <CharactersContent characters={data.characters} />
                  <Box mx="auto" justify="center" align="center" w="max">
                    {!value && data.info && (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { characters, info } = await getCharacters(1);
  return {
    props: {
      characters,
      info,
    },
  };
};
