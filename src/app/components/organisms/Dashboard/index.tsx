"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Button } from "@chakra-ui/react";
import { RootState } from "@/app/store/store";
// import { useToast } from "@/app/hooks/useToast";
import BalanceCard from "../../molecules/BalanceCard";
import DataTable from "../DataTable";
import OperationForm from "../../molecules/OperationForm";
import ConfirmationModal from "../../molecules/ConfirmationModal";
import { useAuthService } from "@/app/hooks/useAuthService";

export interface Record {
  id: string;
  operation_id: string;
  amount: number;
  user_balance: number;
  operation_response: string;
  date: string;
}

const Dashboard: React.FC = () => {
  // const { showToast } = useToast();
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [isOperationModalOpen, setIsOperationModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { performOperation, fetchRecords, deleteRecord } = useAuthService();
  const { user, balance, isAuthenticated, records } = useSelector(
    (state: RootState) => state.auth
  );

  const userId = user?.id;

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchRecords(user.id, balance).catch((error) => {
        console.error("Error fetching records:", error);
      });
    }
  }, [isAuthenticated, user?.id, balance, fetchRecords]);

  const handleOperationSubmit = async (
    type: string,
    operand1: number,
    operand2?: number
  ): Promise<void> => {
    if (userId) {
      try {
        await performOperation(type, { operand1, operand2, userId });

        setIsOperationModalOpen(false);
      } catch (error) {
        console.error("Error performing operation:", error);
        // showToast({
        //   title: "Operation Failed",
        //   description: "An error occurred while performing the operation.",
        //   status: "error",
        // });
      }
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    try {
      await deleteRecord(recordId);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const openDeleteModal = (recordId: string): void => {
    setSelectedRecordId(recordId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = (): void => {
    if (selectedRecordId) {
      handleDeleteRecord(selectedRecordId);
    }
  };

  return (
    <Box p={6}>
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <Box gridColumn="span 4">
          <BalanceCard balance={balance} />
        </Box>
        <Box gridColumn="span 8" textAlign="right">
          <Button
            colorScheme="blue"
            onClick={() => setIsOperationModalOpen(true)}
          >
            New Operation
          </Button>
        </Box>
        <Box gridColumn="span 12">
          <DataTable data={records} onDelete={openDeleteModal} />
        </Box>
      </Grid>
      {isOperationModalOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="blackAlpha.700"
          zIndex="10"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box bg="white" p={6} borderRadius="md" w="400px" boxShadow="lg">
            <OperationForm onSubmit={handleOperationSubmit} />
            <Button
              mt={4}
              colorScheme="red"
              onClick={() => setIsOperationModalOpen(false)}
              w="full"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this record?"
      />
    </Box>
  );
};

export default Dashboard;
