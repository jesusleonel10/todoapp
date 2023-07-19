import React, {useState, useContext} from 'react';
import { ContextTasks } from './../context/contextTasks';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';


import {toggleCompleted, editTask, deleteTask} from './../functions/allFunctions'
import './../css/Task.css'

const Task = ({task, showAlert}) => {
    const {tasks, changeTasks} = useContext(ContextTasks)

    /* Editar y borrar tareas */
    //Bandera para saber si se editara la tarea al hacer click
    const [editingTask, setEditingTask] = useState(false);

    //Obtengo la tarea actual, para luego actualizarla
    const [newTask, setNewTask] = useState(task.text)

    //Confirmo si el input esta vacio
    const isEmpty = (value) => {
        return value === ''
    } 

    //Al hacer el submit, envio el mismo id, pero con nuevo texto a la funcion que actualiza el estado
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEmpty(newTask)) {
            showAlert('error', 'Task must not be empty');
        } else {
            editTask(task.id, newTask, changeTasks, tasks);
            setEditingTask(false);
            showAlert('success', 'Task Updated');
        }

    }
    return (
    <>
        <li className='tasklist__item'>
            {
                task.completed ?
                    //Muestro uno u otro icono dependiendo si esta marcado como completado
                    //Al hacer click envio a la funcion el id para guardar si esta completada o no
                    <>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512"
                        className='tasklist__icon shape'
                        onClick={() => toggleCompleted(task.id, changeTasks, tasks)}
                    >
                        <defs>
                            <linearGradient id="header-shape-gradient" x2="0.35" y2="1">
                                <stop offset="0%" stopColor="var(--color-stop)" />
                                <stop offset="30%" stopColor="var(--color-stop)" />
                                <stop offset="100%" stopColor="var(--color-bot)" />
                            </linearGradient>
                        </defs>
                    <path className="gradient-bg" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                    </>
                    :
                    <PanoramaFishEyeIcon 
                        sx={{color: 'hsl(236, 9%, 61%);'}}
                        className='tasklist__icon tasklist__iconnocheck'
                        onClick={() => toggleCompleted(task.id, changeTasks, tasks)}
                    />
            
            }
            
            <div className='tasklist__wrapper'>
                {
                    //Si dio click para editar, mostramos el formulario
                    editingTask ?
                    <form className='formedit' onSubmit={handleSubmit}>
                        <input 
                            type='text'
                            className='formedit__input'
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            autoFocus
                        />
                        <button
                            type='submit'
                            className='formedit__submit'
                        >
                            <SaveRoundedIcon sx={{color: 'hsl(236, 9%, 61%);'}} />
                        </button>
                    </form>
                    :
                    <div className='tasklist__text'>
                        {task.completed ? <del>{task.text}</del> : task.text}
                    </div>
                }

            </div>
            <div className='tasklist__btn'>
                {
                    !editingTask ?
                    <EditIcon
                        sx={{color: 'hsl(236, 9%, 61%);'}}
                        className='tasklist__icon tasklist__iconedit'
                        onClick={() => {
                            setEditingTask(!editingTask);
                        }}
                        titleAccess='Edit Task'

                    /> : ""
                }
                <ClearIcon
                    sx={{color: 'hsl(236, 9%, 61%);'}}
                    className='tasklist__icon tasklist__icondelete'
                    onClick={() => {
                        deleteTask(task.id, changeTasks, tasks);
                        showAlert('success', 'Task Deleted');
                    }}
                    titleAccess='Deleted task'

                />
            </div>
        </li>
    </>
    );
}
 
export default Task;