import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { SignIn } from './Pages/SignIn';
import Activity from './Pages/Activity';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/activity" element={<Activity />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
