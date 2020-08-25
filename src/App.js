import React from "react";
import "./App.css";
import AppProvider from "./providers/AppProvider";
import AppLayout from "./containers/AppLayout/AppLayout";
import TemplateDisplay from "./components/TemplateDisplay/TemplateDisplay";

// I started using only css but quickly realized that due to time constraints
// I needed to use something else so I decided to utilize Material UI
// If I had more time I would get clean the code base by deleting all css files and inline styling
// and only using the material ui "makeStyles" way

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <TemplateDisplay />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
