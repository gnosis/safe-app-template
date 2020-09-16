import React, { createContext, useState, useContext, useEffect } from "react";
import initSdk, { Networks, RequestId, SdkInstance, SDK_MESSAGES, SafeInfo, SentSDKMessage, Transaction } from "@gnosis.pm/safe-apps-sdk";

interface State {
  appsSdk: SdkInstance | undefined;
  safeInfo: SafeInfo | undefined;
}

const initialState: State = {
  appsSdk: undefined,
  safeInfo: undefined,
};

const stateCtx = createContext<State>(initialState);

const appsSdk = initSdk();

export const useSafeApp = (): State => useContext(stateCtx);

const SafeAppProvider: React.FC = ({ children }) => {
  const [safeInfo, setSafeInfo] = useState<SafeInfo>();

  useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: setSafeInfo,
    });

    return () => appsSdk.removeListeners();
  }, []);

  return (
    <stateCtx.Provider value={{ appsSdk, safeInfo }}>
      {children}
    </stateCtx.Provider>
  );
};

export const useSafeInfo = (): SafeInfo | undefined => {
  const { safeInfo } = useSafeApp();
  return safeInfo;
};

export const useAppsSdk = (): SdkInstance => {
  const { appsSdk } = useSafeApp();
  return appsSdk;
};

export const useSafeAddress = (): string | undefined => {
  const { safeAddress } = useSafeInfo() || {};
  return safeAddress;
};

export const useSafeNetwork = (): Networks | undefined => {
  const { network } = useSafeInfo() || {};
  return network;
};

export const useSendTransactions = (): ((txs: Transaction[], requestId?: RequestId) => SentSDKMessage<SDK_MESSAGES.SEND_TRANSACTIONS>) => {
  const { sendTransactions } = useAppsSdk();
  return sendTransactions;
};

export default SafeAppProvider;
