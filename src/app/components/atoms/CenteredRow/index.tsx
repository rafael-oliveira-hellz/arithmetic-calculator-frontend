import { Tr } from "@chakra-ui/react";

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
      },
    }}
  >
    {children}
  </Tr>
);

export default CenteredRow;
