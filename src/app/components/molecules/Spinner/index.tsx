import React from "react";
import SpinnerIcon from "../../atoms/SpinnerIcon";
import Text from "../../atoms/Text";
import { Box } from "@chakra-ui/react";

interface SpinnerProps {
  loadingText?: string;
  textStyle?: React.CSSProperties;
  className?: string;
  width?: string;
  height?: string;
  dataTestId?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  loadingText,
  textStyle,
  className,
  width,
  height,
  dataTestId = "spinner",
}) => {
  return (
    <Box
      className={className}
      style={{ display: "flex", alignItems: "center" }}
      data-testid={dataTestId}
    >
      <SpinnerIcon width={width} height={height} data-testid="spinner-icon" />
      {loadingText && (
        <Text style={{ marginLeft: "8px", ...textStyle }}>{loadingText}</Text>
      )}
    </Box>
  );
};

export default Spinner;
