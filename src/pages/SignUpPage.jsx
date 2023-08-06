import { useState } from "react";
import { styled } from "styled-components";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    function signUp(e){
        e.preventDefault();
        const logar = {name, email, password, confirmPassword};
        if (password != confirmPassword) alert('As senhas devem ser iguais');
        console.log(logar);
        axios.post(`${import.meta.env.VITE_API_URL}/signup`, logar)
            .then(res => {
                alert(res.data);
                navigate("/login");
            })
            .catch(erro => alert(erro.response.data));

    }

    return(
        <SignUpContainer>
            <form onSubmit={e => signUp(e)}>
                <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required/>
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                <input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                <button type="submit">Criar Conta</button>
            </form>
        </SignUpContainer>
    )
}

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 60px;
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