import { styled } from "styled-components"
import NavBar from "../components/Navbar"
import trofeu from "../assets/trofeu.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    let [ranking, setRanking] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/ranking`)
            .then(res => {
                console.log(res.data);
                setRanking(res.data);
            })
            .catch(erro => alert(erro.response.data));
    }, []);

    return(
        <HomeContainer>
            <NavBar />
            <DivRanking>
                <img src={trofeu} alt="trofeu" />
                <div>
                    {ranking.map((element, i) => 
                        <div>
                            <span>{i}. {element.name} - {element.linksCount} links - {element.visitCount} visualizações </span>
                        </div>
                    )}
                </div>
                <span onClick={() => navigate('/signup')}>Crie sua conta para usar nosso serviço!</span>
            </DivRanking>

        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`

const DivRanking = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    > span{
        font-family: Lexend Deca;
        font-size: 25px;
        font-weight: 700;
        line-height: 45px;
        letter-spacing: 0em;
        margin-bottom: 50px;
    }
    img{
        width: 200px;
    }
    > div{
        width: 700px;
        font-family: Lexend Deca;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 12px;
        border: 1px solid #78B15940;
        padding: 15px;
        box-shadow: 1px 1px 10px #78B159;
    }
`