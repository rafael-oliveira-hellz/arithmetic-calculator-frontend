import React from "react";
import "./styles.css";
import { Box } from "@chakra-ui/react";
const SpinnerIcon = ({
  width,
  height,
  dataTestId = "spinner-icon",
}: {
  width?: string;
  height?: string;
  dataTestId?: string;
}) => {
  return (
    <Box
      data-testid={dataTestId}
      style={{
        width: `${width ? width : "24px"}`,
        height: `${height ? height : "24px"}`,
        border: "2px solid #FFF",
        borderTop: "2px solid transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    ></Box>
  );
};

export default SpinnerIcon;
