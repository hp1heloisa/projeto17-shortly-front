import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import short from "../assets/twemoji_shorts.png"
import NavTop from "./NavTop";

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

    return (
        <NavbarContainer> 
            <NavTop dados={dados} info={info}/>
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

