import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Form from './components/Form';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AdminDashboard from './components/Requests';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <Router>
      <Routes> 
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
