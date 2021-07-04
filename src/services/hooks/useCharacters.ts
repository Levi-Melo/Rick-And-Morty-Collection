import { useQuery } from "react-query";
import { api } from "../api";

type Info = {
  count: number;
  next?: number;
  prev?: number;
  pages: number;
};

type Planet = {
  name: string;
  url: string;
};

export type Character = {
  id: string;
  name: string;
  species: string;
  status: string;
  type: string;
  gender: string;
  origin: Planet;
  location: Planet;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

type GetCharactersResponse = {
  characters: Character[];
  info?: Info;
};

type GetCharacterResponse = {
  character: Character;
};

export async function getFavoritesCharacter(
  favorites: string
): Promise<GetCharactersResponse> {
  const { data } = await api.get<Character[]>(`/character/[${favorites}]`);
  const characters = data.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    type: character.type,
    gender: character.gender,
    origin: character.origin,
    location: character.location,
    image: character.image,
    episode: character.episode,
    url: character.url,
    species: character.species,
    created: new Date(character.created).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { characters };
}

export async function getCharacters(
  page: number
): Promise<GetCharactersResponse> {
  const { data } = await api.get<{ results: Character[]; info: Info }>(
    "/character",
    {
      params: { page },
    }
  );
  const info = {
    count: data.info.count,
    next: data.info.next,
    prev: data.info.prev,
    pages: data.info.pages,
  };

  const characters = data.results.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    type: character.type,
    gender: character.gender,
    origin: character.origin,
    location: character.location,
    image: character.image,
    episode: character.episode,
    url: character.url,
    species: character.species,
    created: new Date(character.created).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { characters, info };
}

export async function getCharacterByID(
  id: string
): Promise<GetCharacterResponse> {
  const { data } = await api.get<Character>(`/character/${id}`);
  const character = {
    id: data.id,
    name: data.name,
    status: data.status,
    type: data.type,
    gender: data.gender,
    origin: data.origin,
    location: data.location,
    image: data.image,
    episode: data.episode,
    url: data.url,
    species: data.species,
    created: new Date(data.created).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return { character };
}

export async function getCharacter(
  name: string
): Promise<GetCharactersResponse> {
  const { data } = await api.get<{ results: Character[]; info: Info }>(
    "/character",
    {
      params: { name },
    }
  );
  const info = {
    count: data.info.count,
    next: data.info.next,
    prev: data.info.prev,
    pages: data.info.pages,
  };

  const characters = data.results.map((character) => ({
    id: character.id,
    name: character.name,
    status: character.status,
    type: character.type,
    gender: character.gender,
    origin: character.origin,
    location: character.location,
    image: character.image,
    episode: character.episode,
    url: character.url,
    species: character.species,
    created: new Date(character.created).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { characters, info };
}

export function useCharacters(
  page?: number,
  search?: string,
  isFavoritesOpen?: boolean,
  initialData?: GetCharactersResponse
) {
  if (isFavoritesOpen) {
    const favorites = localStorage.getItem(
      "Rick-and-Morty-collection/favorites"
    );
    return useQuery(["character", { favorites }], () =>
      getFavoritesCharacter(favorites)
    );
  }
  if (search) {
    return useQuery(["character", { search }], () => getCharacter(search));
  }
  if (page == 1) {
    return useQuery(["character", { page }], () => getCharacters(page), {
      staleTime: 1000 * 60 * 100,
      initialData: initialData,
    });
  }
  return useQuery(["character", { page }], () => getCharacters(page), {
    staleTime: 1000 * 60 * 100,
  });
}

export function useCharacterOnModal(characterId: string) {
  return useQuery(
    ["character", { id: characterId }],
    () => getCharacterByID(characterId),
    {
      staleTime: 1000 * 60 * 100,
    }
  );
}
