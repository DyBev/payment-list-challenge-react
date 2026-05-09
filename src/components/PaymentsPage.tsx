import React from "react";
import { Container } from './components'
import { PaymentsTable } from "./PaymentsTable";
import { PaymentsHeader } from "./PaymentsHeader";

export const PaymentsPage = () => {
  return (
    <Container>
      <PaymentsHeader />
      <PaymentsTable />
    </Container>
  );
};
