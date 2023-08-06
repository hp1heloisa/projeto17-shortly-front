import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import short from "../assets/twemoji_shorts.png"

export default function NavBar({info, setInfo}) {
    const navigate = useNavigate();

    const dados = JSON.parse(localStorage.getItem('dataShortly'));

    useEffect(() => {
        if (dados) {
            axios.get(`${import.meta.env.VITE_API_URL}/users/me`, { headers: {'Authorization': dados.token} })
                 .then(res => {
                            console.log(res.data);
                            setInfo(res.data);
                 })
                 .catch(erro => alert(erro.response.data));
        }
    }, []);

    function logOut() {
        axios.delete(`${import.meta.env.VITE_API_URL}/logout`, { headers: {'Authorization': dados.token} })
             .then(res => {
                    console.log(res.data);
                    localStorage.removeItem('dataShortly');
                    alert('Até a próxima');
                    navigate('/');
             })
             .catch(erro => alert(erro.response.data));
    }

    function NavTop() {
        if (!dados) {
            return(
                <DivAcesso>
                    <div className="deslogado">
                        <span onClick={() => navigate('/login')} className="verde">Entrar</span>
                        <span onClick={() => navigate('/signup')} className="cinza">Cadastrar-se</span>
                    </div>
                </DivAcesso>
            )
        } else{
            console.log(dados.token)
            console.log(info.name);
            return(
                <DivAcesso>
                    <span className="verde">Seja bem-vindo(a), {info.name}</span>
                    <div>
                        <span onClick={() => navigate('/initial')} className="cinza">Home</span>
                        <span onClick={() => navigate('/')} className="cinza">Ranking</span>
                        <span onClick={logOut} className="cinza">Sair</span>
                    </div>
                </DivAcesso>
            )
        }
        
    }

    return (
        <NavbarContainer> 
            <NavTop />
            <DivLogo onClick={() => navigate('/')}> 
                <span>Shortly</span>
                <img src={short} alt="logo" />
            </DivLogo>
        </NavbarContainer>
    )

}

const NavbarContainer = styled.div`
    font-family: Lexend Deca;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`
const DivLogo = styled.div`
    display: flex;
    gap: 8px;
    span{
        font-size: 64px;
        font-weight: 200;
        line-height: 80px;
        letter-spacing: 0em;
    }
    cursor: pointer;
`

const DivAcesso = styled.div`
    box-sizing: border-box; 
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-right: 100px;
    padding-left: 100px;
    span{
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        cursor: pointer;
    }
    div{
        display: flex;
        gap: 20px;
        justify-content: right;
    }
    .verde{
            color: #5D9040;
    }
    .cinza{
            color: #9C9C9C;
    }
    .deslogado{
        width: 100%;
    }
`