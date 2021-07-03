import { Grid } from "@chakra-ui/react";

import { Card } from "./Card";

import { Character } from "../../services/hooks/useCharacters";
interface CharactersContentProps {
  characters: Character[];
}

export function CharactersContent({ characters }: CharactersContentProps) {
  return (
    <Grid templateColumns={["1fr", "repeat(4, 1fr)"]} gap="10">
      {characters.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          image={character.image}
          name={character.name}
          planet={character.location.name}
          status={character.status}
        />
      ))}
    </Grid>
  );
}
