import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index.jsx";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import ClassDetails from "./pages/ClassDetails";
import Documents from "./pages/Documents";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/classes" element={<Classes />} />
        <Route path="/students" element={<Students />} />
        <Route path="/classes/:className" element={<ClassDetails classes={classes} setClasses={setClasses} />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;
