import { Tr } from "@chakra-ui/react";

interface CenteredRowProps {
  children: React.ReactNode;
}

const CenteredRow = ({ children }: CenteredRowProps): React.JSX.Element => (
  <Tr
    sx={{
      "& > th": {
        textAlign: "center",
        verticalAlign: "middle",
        padding: "8px",
        borderBottom: "2px solid #FFF",
      },
      "& > td": {
        textAlign: "center",
        verticalAlign: "middle",
      },
    }}
  >
    {children}
  </Tr>
);

export default CenteredRow;
