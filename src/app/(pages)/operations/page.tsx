"use client";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

import "./styles.css";
import operationsItems from "./operations-items";
import { IconType } from "react-icons";
import React, { useState } from "react";
import { create, all } from "mathjs";
import AuthGuard from "@/app/components/guards/auth-guard";

const math = create(all);

const Operations: React.FC = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string | number | null>(null);

  const handleButtonClick = (value: string | number) => {
    switch (value) {
      case "C": // Delete all result
        setExpression("");
        setResult(null);
        break;
      case "CE": // Remove o último caracter
      case "Delete":
        setExpression((prev) => prev.slice(0, -1));
        break;
      case "=":
      case "Equals":
        if (!expression) {
          alert("Erro: Nenhuma expressão para calcular.");
          return;
        }

        //TODO: Create logic for the result with Enter or pressing =
        try {
          const sanitizedExpression = expression
            .replace(/X/g, "*") // Multiplicação
            .replace(/√/g, "sqrt(") // Raiz quadrada
            .replace(/÷/g, "/") // Divisão (caso tenha esse operador)
            .replace(/÷/g, "/") // Substitui '÷' por '/'
            .replace(/,/g, "."); // Substitui ',' por '.' (separador decimal)

          // Não adicionar parênteses extras, apenas a substituição do 'sqrt('
          console.log("Expressão sanitizada:", sanitizedExpression); // Debug
          if (sanitizedExpression.includes("/0")) {
            setResult("It is impossible to divide by zero");
            return;
          }

          // Adiciona um fechamento para cada 'sqrt(' se necessário (caso a expressão termine com 'sqrt')
          const finalExpression =
            sanitizedExpression +
            ")".repeat((sanitizedExpression.match(/sqrt\(/g) || []).length);

          console.log("Expressão sanitizada:", finalExpression); // Debug para verificar a expressão sanitizada

          // Parse e compile a expressão
          const parsed = math.parse(finalExpression);
          const compiled = parsed.compile();
          const evaluated = compiled.evaluate(); // Avalia a expressão
          setResult(evaluated.toString());
        } catch (error) {
          alert("Error: Invalid expression");
          console.error(error);
        }
        break;
      default:
        setExpression((prev) => prev + value.toString());
        setResult(null);
    }
  };

  return (
    <AuthGuard>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
      >
        <Grid className="custom-grid" border={"1px solid gray"}>
          <Textarea
            className="custom-textarea"
            size="lg"
            disabled
            value={result || expression}
          />
          {operationsItems.map((item, index) => (
            <GridItem className="custom-grid-items" key={index}>
              <Button onClick={() => handleButtonClick(item.value)}>
                {typeof item.label === "string"
                  ? item.label
                  : React.createElement(item.label as IconType)}
              </Button>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </AuthGuard>
  );
};

export default Operations;
