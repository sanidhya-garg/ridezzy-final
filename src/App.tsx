import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RidezzyLanding from "./RidezzyLanding";
import AboutUs from "./components/AboutUs";  // No need for .tsx extension

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RidezzyLanding />} />
        <Route path="/about" element={<AboutUs />} />  {/* Corrected this line */}
        <Route path="/features" element={<RidezzyLanding />} />
        <Route path="/office" element={<RidezzyLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
