import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import FormHeader from "../../atoms/FormHeader";

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <Flex
      role="article"
      data-testid="layout-container"
      width="full"
      align="center"
      justifyContent="center"
      className={className}
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(12px)"
        borderRadius="xl"
        p={8}
        w="full"
        maxW="lg"
        boxShadow="lg"
        className="transition-all hover:shadow-xl"
        color="gray.200"
      >
        <FormHeader
          title={title}
          className="text-gray-800 text-2xl font-bold text-center"
        />
        <Box mt={6} width="100%">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default FormLayout;
