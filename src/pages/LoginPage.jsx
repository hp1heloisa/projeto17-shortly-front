import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components"
import NavBar from "../components/Navbar"

export default function LoginPage() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const navigate = useNavigate();

    function signIn(e){
        e.preventDefault();
        const entrar = {email, password};
        console.log(entrar);
        axios.post(`${import.meta.env.VITE_API_URL}/signin`, entrar)
            .then(res => {
                localStorage.setItem("dataShortly", JSON.stringify(res.data));
                navigate("/initial");
            })
            .catch(erro => alert(erro.response.data));
    }

    return (
        <LoginContainer>
            <form onSubmit={e => signIn(e)}>
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                <button type="submit">Entrar</button>
            </form>
        </LoginContainer>
    )
}

const LoginContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        input{
            box-sizing: border-box;
            font-family: Lexend Deca;
            width: 700px;
            height: 50px;
            border-radius: 12px;
            border: 1px;
            border: 1px solid #78B15940;
            padding: 15px;
            margin: 1px;
            box-shadow: 1px 1px 10px #78B159;
        }
        button{
            font-family: Lexend Deca;
            color: white;
            font-size: 15px;
            width: 182px;
            height: 50px;
            border-radius: 12px;
            border: none;
            background-color: #78B159;
            margin-top: 20px;
            margin-bottom: 20px;
            cursor: pointer;
        }
    }
`