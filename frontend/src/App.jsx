import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import ThankYou from "./components/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/register" element={<RegisterForm />} />

      <Route path="/thankyou" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
