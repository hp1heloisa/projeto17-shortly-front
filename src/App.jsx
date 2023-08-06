import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from 'styled-components';
import HomePage from './pages/HomePage';
import InitialPage from './pages/InitialPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <PagesContainer>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/initial" element={<InitialPage />} />
            </Routes>
        </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
    padding-top: 60px;
`