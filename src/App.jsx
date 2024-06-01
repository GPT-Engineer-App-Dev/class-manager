import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index.jsx";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Documents from "./pages/Documents";
import ClassDetails from "./pages/ClassDetails";

function App() {
  const [classes, setClasses] = useState([]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/classes" element={<Classes classes={classes} setClasses={setClasses} />} />
      <Route path="/classes/:classId" element={<ClassDetails classes={classes} setClasses={setClasses} />} />
        <Route path="/students" element={<Students />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;
