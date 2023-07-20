import React, {useContext} from 'react';
import {ContextTasks} from './../context/contextTasks'
import './../css/Footer.css'

const Footer = ({handleClick}) => {
    const {setfilter} = useContext(ContextTasks)

    const {tasks, changeTasks, setTypeAlert} = useContext(ContextTasks)
    //Filtramos para que solo hayan los no completados o activos
    const cleanCompleted = () => {
        //Confirmo primero si hay tareas completas
        if(tasks.every((element) => !element.completed)) {
            setTypeAlert({color: 'error', text:'No tasks complete'})
            handleClick(true);
        } else {
            //Las borro si hay completadas
            let onlyActive = tasks.filter((element) => !element.completed)
            changeTasks(onlyActive)
            setTypeAlert({color: 'success', text:'Complete tasks deleted'})
            handleClick(true);
        }
    }
    //Devolvemos la longitud del array, lo que es lo mismo que la cantidad de tareas
    const numberTasks = () => {
        let number = tasks.length
        return number
    }

    //Obtengo el valor de los input radios
    const handleInputChange = (event) => {
        const {value} = event.target
        setfilter(value)
    }

    return (
        <div className='footer-wrapper'>
            <div className='footer'>
                <p className='number-items'>
                    { numberTasks() } item left
                </p>

                <button className='clear-items'
                    onClick={() => cleanCompleted()}
                >
                    <span>Clear Completed</span>
                </button>
            </div>
            <div className='filters'>
                <form className='filters__radios'>
                    <input 
                        type='radio' 
                        id='all' 
                        name='filter' 
                        value='all'
                        onChange={(event => handleInputChange(event))} 
                    />
                    <label
                    htmlFor="all"
                    >All</label>

                    <input 
                        type='radio' 
                        id='active' 
                        name='filter' 
                        value='active'
                        onChange={(event => handleInputChange(event))} 
                    />
                    <label 
                    htmlFor="active"
                    >Active</label>

                    <input 
                        type='radio' 
                        id='completed' 
                        name='filter' 
                        value='completed'
                        onChange={(event => handleInputChange(event))} 
                    />
                    <label 
                    htmlFor="completed"
                    >Completed</label>
                </form>
            </div>

            <p className='drag-drop'>Drag and drop to reorder list</p>
        </div>
    );
}
 
export default Footer;