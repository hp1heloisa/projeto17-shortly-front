import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function NavTop({dados, info}) {
    const navigate = useNavigate();

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