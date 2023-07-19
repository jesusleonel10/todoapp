import React, {useState, useContext} from 'react';
import { ContextTasks } from './../context/contextTasks';
import {v4 as uuidv4} from 'uuid';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import './../css/Input.css';

/* task y changeTasks son props de otro state creado anteriormente, 
el primero con todas las tareas, el segundo la funcion que agrega las nuevas */
const Input = ({handleClick}) => {
    /* Contextos de las tareas y las alertas */
    const {tasks, changeTasks, setTypeAlert} = useContext(ContextTasks)

    //Estado para obtener el valor del input y su funcion para cambiar dicho valor
    const [inputTask, setInputTask] = useState('')
    //Cambio el estado enviando el value del input
    const handleInput = (e) => {
        setInputTask(e.target.value)
    }
    //Confirmo si el input esta vacio
    const isEmpty = (value) => {
        return value === ''
    } 

    //Aqui guardamos la nueva tarea
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isEmpty(inputTask)) {
            setTypeAlert({color: 'error', text:'Task must not be empty'})
            handleClick(true);
        }
        else {
            changeTasks(
                [
                    ...tasks,
                    {
                        id: uuidv4(),
                        text: inputTask,
                        completed: false
                    }
                ]
            )
            setInputTask('');
            setTypeAlert({color:'success', text:'Task Added'});
            handleClick(true);
        }
    }

    return (
        <>
        <div className='form'>
            <form id='form' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <button
                        type='submit'
                        className='btn-task'
                    >
                        <PanoramaFishEyeIcon sx={{color: 'hsl(236, 9%, 61%);'}} />
                    </button>
                    <input 
                        type='text'
                        className='input-task'
                        placeholder='Create a new todo...'
                        value={inputTask}
                        onChange={(e) => handleInput(e)}
                    />
                </div>
            </form>
        </div>
        </>
    );
}

export default Input;