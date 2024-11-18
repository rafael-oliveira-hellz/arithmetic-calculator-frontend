import React from "react";
import { Text } from "@chakra-ui/react";
import Card from "../../atoms/Card";

interface BalanceCardProps {
  balance: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <Card>
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        Current Balance
      </Text>
      <Text
        fontSize="2xl"
        color="green.500"
        fontWeight="bold"
        textAlign="center"
      >
        ${balance.toFixed(2)}
      </Text>
    </Card>
  );
};

export default BalanceCard;
