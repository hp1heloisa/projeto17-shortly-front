import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { styled } from 'styled-components';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import InitialPage from './pages/InitialPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

export default function App() {
  let [info, setInfo] = useState([]);

  return (
    <PagesContainer>
        <BrowserRouter>
            <NavBar info={info} setInfo={setInfo}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/initial" element={<InitialPage info={info} setInfo={setInfo}/>} />
            </Routes>
        </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
    padding-top: 40px;
`