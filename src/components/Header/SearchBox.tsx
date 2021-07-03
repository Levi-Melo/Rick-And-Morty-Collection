import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import { useSearch } from "../../contexts/SearchContext";

export function SearchBox() {
  const { value, handleChange } = useSearch();

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml={["", "6"]}
      maxW={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg={"gray.800"}
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Enter a name"
        px="4"
        mr="4"
        _placeholder={{ color: "gray.400" }}
        value={value}
        onChange={handleChange}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
