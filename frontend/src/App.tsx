import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import Detailspage from "./pages/detailspage";
import Checkoutpage from "./pages/checkoutpage";
import Resultpage from "./pages/resultpage";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/"element={<Homepage searchQuery={searchQuery} />} />
        <Route path="/details/:id" element={<Detailspage />} />
        <Route path="/checkout/:id" element={<Checkoutpage />} />
        <Route path="/result" element={<Resultpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
