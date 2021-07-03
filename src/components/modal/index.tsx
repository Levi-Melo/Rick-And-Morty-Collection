import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";

import { useModal } from "../../contexts/ModalContext";
import { useCharacterOnModal } from "../../services/hooks/useCharacters";
import { useFavorites } from "../../contexts/FavoritesContext";

import { CharacterModalContent } from "../content/CharacterModalContent";

export function CharacterModal() {
  const isWide = useBreakpointValue({
    base: false,
    lg: true,
  });
  const { isOpen, onClose, characterId } = useModal();
  const { data, isLoading } = useCharacterOnModal(characterId);

  const { addToFavorites, removeOfFavorites } = useFavorites();

  const [color, setColor] = useState("red.300");
  useEffect(() => {
    if (data?.character.status === "Alive") {
      setColor("green.300");
      return;
    }
    if (data?.character.status === "unknown") {
      setColor("gray.300");
      return;
    }
    if (data?.character.status === "Dead") {
      setColor("red.300");
      return;
    }
  }, [data]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={["300px", "448px"]} m="auto" bg="gray.700">
          {isLoading ? (
            <Flex align="center" justify="center">
              <Spinner />
            </Flex>
          ) : (
            <>
              <ModalBody mt="8">
                <CharacterModalContent
                  color={color}
                  name={data?.character.name}
                  image={data?.character.image}
                  status={data?.character.status}
                  gender={data?.character.gender}
                  planet={data?.character.location?.name}
                  species={data?.character.species}
                />
              </ModalBody>
              <ModalFooter mx="auto">
                <Button
                  colorScheme="green"
                  mr={3}
                  size={isWide ? "md" : "sm"}
                  onClick={() => addToFavorites(data?.character.id)}
                >
                  Favorite
                </Button>

                <Button
                  colorScheme="red"
                  size={isWide ? "md" : "sm"}
                  onClick={() => removeOfFavorites(data?.character.id)}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
}
