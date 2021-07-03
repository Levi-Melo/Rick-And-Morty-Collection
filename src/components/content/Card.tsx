import { Flex, GridItem, Text, Image, Icon } from "@chakra-ui/react";
import { RiStarLine } from "react-icons/ri";
import { useFavorites } from "../../contexts/FavoritesContext";

import { useModal } from "../../contexts/ModalContext";

interface CardProps {
  id: string;
  image: string;
  name: string;
  status: string;
  planet: string;
}

export function Card({ name, image, status, planet, id }: CardProps) {
  const { handle } = useModal();
  const { favorites } = useFavorites();
  let isFavorite: string;
  if (favorites) {
    isFavorite = favorites.find((characterId: string) => {
      return characterId == id;
    });
  }

  return (
    <GridItem
      maxW="208px"
      m="auto"
      bg="gray.700"
      borderRadius="10"
      align="center"
      _hover={{
        cursor: "pointer",
        boxShadow: "outline",
      }}
      onClick={() => handle(id)}
    >
      <Image src={image} alt={name} borderTopRadius="10" width="max" />
      <Text fontWeight="bold" color="blue.700" mt="2" fontSize="20">
        {name}
        {favorites && isFavorite && (
          <Icon as={RiStarLine} fontSize="20" ml="2" color="green.300" />
        )}
      </Text>
      <Flex align="center" justify="center">
        <Text fontWeight="semibold" fontSize="16">
          {status}
        </Text>
      </Flex>
      <Text
        fontWeight="thin"
        fontSize="14"
        color="gray.300"
        maxW="90%"
        mx="auto"
      >
        {planet}
      </Text>
    </GridItem>
  );
}
