import { createRoot } from "react-dom/client";
import "./index.css";

import RootLayout from "./components/RootLayout.tsx";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { Toaster } from "./components/ui/sonner.tsx";


let persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />
        <Toaster/>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
