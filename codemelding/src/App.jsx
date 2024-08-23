import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";

export default function App() {
  return (
    <Router>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Home />} />
    </Routes>
  </Router>
  )
}