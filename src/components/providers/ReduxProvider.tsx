"use client";

import React from "react";

import { Provider } from "react-redux";
import { store, persistor } from "@/lib/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
