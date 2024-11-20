import React from 'react';
import SpinnerIcon from '../../atoms/SpinnerIcon';
import Text from '../../atoms/Text';
import { Box } from '@chakra-ui/react';

interface SpinnerProps {
  loadingText?: string;
  textStyle?: React.CSSProperties;
  className?: string;
  width?: string;
  height?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  loadingText,
  textStyle,
  className,
  width,
  height
}) => {
  return (
    <Box
      className={className}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <SpinnerIcon width={width} height={height} />
      {loadingText && (
        <Text style={{ marginLeft: '8px', ...textStyle }}>{loadingText}</Text>
      )}
    </Box>
  );
};

export default Spinner;
