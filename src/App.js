import React from "react";
import "./App.css";

const response = fetch("http://localhost:3000/api/customers/2a945d4ed020", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => console.log("costumerById", data));

function App() {
  return (
    <div></div>
    // <AppProvider>
    //   <AppLayout>
    //     <MainContent/>
    //   </AppLayout>
    // </AppProvider>
  );
}

export default App;
