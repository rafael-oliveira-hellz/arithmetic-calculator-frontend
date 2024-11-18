import React from "react";
import SpinnerIcon from "../../atoms/SpinnerIcon";
import Text from "../../atoms/Text";
import { Box } from "@chakra-ui/react";

interface SpinnerProps {
  loadingText?: string;
  textStyle?: React.CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({ loadingText, textStyle }) => {
  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <SpinnerIcon />
      {loadingText && (
        <Text style={{ marginLeft: "8px", ...textStyle }}>{loadingText}</Text>
      )}
    </Box>
  );
};

export default Spinner;
