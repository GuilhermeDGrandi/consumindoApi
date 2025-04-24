import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { get, size } from 'lodash'
import {FaUserCircle, FaEdit, FaWindowClose} from 'react-icons/fa'

import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, profilePicture } from "./styled";
import axios from '../../services/axios'

import Loading from "../../components/loading";

export default function Alunos(){
    const [alunos,setAlunos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        async function getData() {
            setIsLoading(true)
            const response = await axios.get('/alunos/')
            setAlunos(response.data)
            setIsLoading(false)
            
        }
        getData()
    },[])
    return (
    <Container>
        <Loading isLoading={isLoading}/>
        <h1>Alunos</h1>
        <AlunoContainer>
        {alunos.map( aluno =>(
            <div key={String(aluno.id)}>

                <profilePicture>
                    {get(aluno, 'fotos[0].url', false) ? 
                    (<FaUserCircle size={36} />) : (<FaUserCircle size={36} />)}
                </profilePicture>

                <span>{aluno.nome}</span>
                <span>{aluno.email}</span> 

                <Link to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
                </Link>           
                <Link to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
                </Link>           
            </div>
        ))}
        </AlunoContainer>
        
    </Container>
    )
}


