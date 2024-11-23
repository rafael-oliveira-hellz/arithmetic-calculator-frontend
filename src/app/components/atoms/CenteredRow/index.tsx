import { Box, Tr } from "@chakra-ui/react";

interface CenteredRowProps {
  children: React.ReactNode;
}

const CenteredRow = ({ children }: CenteredRowProps): React.JSX.Element => (
  <Tr
    sx={{
      "& > td": {
        textAlign: "center",
        verticalAlign: "middle",
        color: "#FFF",
        padding: 0,
        border: "none",
      },
    }}
  >
    <Box
      bg="gray.700"
      p="4"
      borderRadius="md"
      mb="4"
      width="100%"
      textAlign="left"
      color="#FFF"
    >
      {children}
    </Box>
  </Tr>
);

export default CenteredRow;
