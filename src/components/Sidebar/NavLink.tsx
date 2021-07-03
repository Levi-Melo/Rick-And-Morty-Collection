import React, { ElementType, ReactNode } from "react";

import { Icon, Link, Text } from "@chakra-ui/react";
interface NavLinkProps {
  icon: ElementType;
  children: ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

export function NavLink({ children, icon, isActive, onClick }: NavLinkProps) {
  if (onClick) {
    return (
      <Link
        display="flex"
        align="center"
        color={isActive ? "green.300" : "gray.50"}
        onClick={onClick}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    );
  }
  return (
    <Link
      display="flex"
      align="center"
      color={isActive ? "green.300" : "gray.50"}
    >
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
