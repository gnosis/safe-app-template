import React from "react";
import styled from "styled-components";
import { Transaction } from "@gnosis.pm/safe-apps-sdk";
import { Button, Loader, Text, Title } from "@gnosis.pm/safe-react-components";
import { useSafeApp } from "./SafeAppProvider";

const Container = styled.form`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const App: React.FC = () => {
  const { appsSdk, safeInfo } = useSafeApp();

  const handleClick = () => {
    // just an example, this is not a valid transaction
    const txs = [
      {
        to: "",
        value: "0",
        data: "",
      } as Transaction,
    ];

    appsSdk?.sendTransactions(txs);
  };

  if (!safeInfo) {
    return <Loader size="md" />;
  }

  return (
    <Container>
      <Title size="sm">Gnosis Safe App Starter</Title>

      <Text size="lg">Click button to submit transaction</Text>

      <Button
        color="primary"
        size="lg"
        variant="contained"
        onClick={handleClick}
      >
        Trigger dummy tx
      </Button>
    </Container>
  );
};

export default App;
