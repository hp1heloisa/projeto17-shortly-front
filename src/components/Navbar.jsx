import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import short from "../assets/twemoji_shorts.png"

export default function NavBar() {
    const navigate = useNavigate();
    let [info, setInfo] = useState([]);

    function NavTop() {
        const dados = JSON.parse(localStorage.getItem('dataShortly'));
        if (!dados) {
            return(
                <DivAcesso>
                    <div>
                        <span onClick={() => navigate('/login')}>Entrar</span>
                        <span onClick={() => navigate('/signup')}>Cadastrar-se</span>
                    </div>
                </DivAcesso>
            )
        } else{
            console.log(dados.token)
            axios.get(`${import.meta.env.VITE_API_URL}/users/me`, { headers: {'Authorization': dados.token} })
                 .then(res => {
                            console.log(res.data);
                            setInfo(res.data);
                 })
                 .catch(erro => alert(erro.response.data));
            return(
                <DivAcesso>
                    <span>Seja bem-vindo(a), </span>
                    <div>
                        <span onClick={() => navigate('/login')}>Home</span>
                        <span onClick={() => navigate('/signup')}>Ranking</span>
                        <span onClick={() => navigate('/signup')}>Sair</span>
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
    }
    div{
        display: flex;
        gap: 20px;
        justify-content: right;
        :nth-child(1){
            color: #5D9040;
        }
        :nth-child(2){
            color: #9C9C9C;
        }
    }
`