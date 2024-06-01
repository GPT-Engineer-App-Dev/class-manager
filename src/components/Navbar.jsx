import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="brand.700" px={4} py={2} color="white">
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold">
          Teacher's Portal
        </Text>
        <Spacer />
        <Flex>
          <Link as={NavLink} to="/classes" px={2} py={1} rounded="md" _hover={{ bg: "brand.800" }}>
            Classes
          </Link>
          <Link as={NavLink} to="/students" px={2} py={1} rounded="md" _hover={{ bg: "brand.800" }}>
            Students
          </Link>
          <Link as={NavLink} to="/documents" px={2} py={1} rounded="md" _hover={{ bg: "brand.800" }}>
            Documents
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;