import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { get, size } from 'lodash'
import {FaUserCircle, FaEdit, FaWindowClose, FaExclamation} from 'react-icons/fa'
import Swal from 'sweetalert2';

import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, profilePicture } from "./styled";
import axios from '../../services/axios'

import Loading from "../../components/loading";
import { toast } from "react-toastify";

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

    const handleDelete = async (e, idAluno) =>{
        e.preventDefault()
        Swal.fire({
            title: 'Deseja realmente EXCLUIR este aluno?',
            text: 'Você não poderá reverter isso!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Excluir',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteAluno(idAluno)
            }
          });
    }

    async function deleteAluno(id){
        try{
            setIsLoading(true)
            await axios.delete(`/alunos/${id}`)
            setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== id));
            setIsLoading(false)
        }catch(err){
            const status = get( err, 'response.status', 0)
            if( status===401){
                toast.error('Você precisa fazer login')
            }else{
                toast.error('Ocorreu um erro ao excluir aluno')
            }
            setIsLoading(false)
        }

    }

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
                <Link onClick={e =>handleDelete(e, aluno.id)} to={`/aluno/${aluno.id}/delete`}>
                <FaWindowClose size={16} />
                </Link>           
            </div>
        ))}
        </AlunoContainer>
        
    </Container>
    )
}


