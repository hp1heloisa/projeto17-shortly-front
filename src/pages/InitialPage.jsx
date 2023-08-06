import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function InitialPage({info, setInfo}){
    let [url, setUrl] = useState('');
    let [render, setRender] = useState([]);
    console.log(info)
    const dados = JSON.parse(localStorage.getItem('dataShortly'));
    useEffect(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/users/me`, { headers: {'Authorization': dados.token} })
                 .then(res => {
                            console.log(res.data);
                            setInfo(res.data);
                 })
                 .catch(erro => alert(erro.response.data));
    }, [render]);

    function postUrl(e){
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/urls/shorten`, {url}, { headers: {'Authorization': dados.token} })
                 .then(res => {
                            setRender(res.data);
                            console.log(res.data);
                            setUrl('');
                 })
                 .catch(erro => alert(erro.response.data));
        console.log(url)
    }

    function deletaUrl(id) {
        const ok = confirm('Tem certeza que deseja apagar essa url?');
        if (ok) {
            axios.delete(`${import.meta.env.VITE_API_URL}/urls/${id}`, { headers: {'Authorization': dados.token} })
             .then(res => {
                console.log(res.data);
                setRender(res.data);
             })
             .catch(erro => alert(erro.response.data));
        }
    }

    if (info.length == 0){
        return(
            <InitialContainer>
                <form onSubmit={e => postUrl(e)}>
                    <input type="text" placeholder="Links que cabem no bolso" value={url} onChange={e => setUrl(e.target.value)}/>
                    <button type="submit">Encurtar link</button>
                </form>
                <div>
                </div>
            </InitialContainer>
        )
    } else{
        return(
            <InitialContainer>
                <form onSubmit={e => postUrl(e)}>
                    <input type="text" placeholder="Links que cabem no bolso" value={url} onChange={e => setUrl(e.target.value)}/>
                    <button type="submit">Encurtar link</button>
                </form>
                <div>
                    {info.shortenedUrls.map(url => <DivUrl>
                            <div className="info">
                                <span>{url.url}</span>
                                <span>{url.shortUrl}</span>
                                <span>Quantidade de visitantes: {url.visitCount}</span>
                            </div>
                            <div className="lixo" onClick={() => deletaUrl(url.id)}><ion-icon name="trash-outline"></ion-icon></div>
                    </DivUrl> )}
                </div>
            </InitialContainer>
        )
    }


}

const InitialContainer = styled.div`
    box-sizing: border-box;
    padding-top: 50px;
    form{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        margin-bottom: 30px;
        input{
            box-sizing: border-box;
            font-family: Lexend Deca;
            width: 700px;
            height: 40px;
            border-radius: 12px;
            border: 1px solid #78B15940;
            padding: 15px;
            margin: 1px;
            box-shadow: 1px 1px 10px #78B159;
        }
        button{
            font-family: Lexend Deca;
            color: white;
            font-size: 13px;
            width: 182px;
            height: 40px;
            border-radius: 12px;
            border: none;
            background-color: #78B159;
            margin-top: 20px;
            margin-bottom: 20px;
            cursor: pointer;
        }
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items: center; 
        gap: 30px;
        margin-bottom: 40px;
    }
`;

const DivUrl = styled.div`
    font-family: Lexend Deca;
    display: flex;
    width: 912px;
    height: 40px;
    border-radius: 12px;
    border: 1px solid #78B15940;
    font-size: 13px;
    .info{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 850px;
        border-top-left-radius: 12px; /* Arredonda o canto superior esquerdo */
        border-bottom-left-radius: 12px;
        padding: 20px;
        background-color: #78B159;
        height: 40px;;
        color: white;
    }
    .lixo{
        display: flex;
        width: 72px;
        justify-content: center;
        align-items: center;
        color: red;
        font-size: 25px;
        cursor: pointer;
    }
`