import { Text, Flex, Avatar, HStack } from "@chakra-ui/react";

interface CharacterModalContentProps {
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  planet: string;
  color: string;
}

export function CharacterModalContent({
  color,
  image,
  name,
  status,
  species,
  gender,
  planet,
}: CharacterModalContentProps) {
  return (
    <Flex direction={["column", "row"]}>
      <Avatar
        mx="auto"
        name={name}
        src={image}
        w={["36", "48"]}
        h={["36", "48"]}
        showBorder={true}
        borderColor={color}
        mb={["6", "0"]}
      />
      <Flex ml={["6", "8"]} direction="column" justify="center">
        <Text fontWeight="bold" color="blue.700" fontSize="20">
          {name}
        </Text>
        <HStack>
          <Text fontWeight="bold">{status}</Text>
          <Text fontWeight="thin" fontSize="14" color="gray.300">
            -
          </Text>
          <Text fontWeight="bold">{species}</Text>
        </HStack>
        <Text fontWeight="thin" fontSize="14" color="gray.300">
          Gender:
        </Text>
        <Text fontWeight="bold">{gender}</Text>
        <Text fontWeight="thin" fontSize="14" color="gray.300">
          Last known location:
        </Text>
        <Text fontWeight="bold" fontSize="14">
          {planet}
        </Text>
      </Flex>
    </Flex>
  );
}
