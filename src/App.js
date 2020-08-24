import React from "react";
import "./App.css";
import AppProvider from "./providers/AppProvider";
import AppLayout from "./containers/AppLayout/AppLayout";



function App() {
  return (
    <AppProvider>
      <AppLayout>
      </AppLayout>
    </AppProvider>
  );
}

export default App;
