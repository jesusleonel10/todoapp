import React, {useContext} from 'react';
import { ContextTasks } from './../context/contextTasks';
import Task from './Task'
import './../css/TaskList.css'

const TaskList = ({handleClick}) => {
    const {tasks, filter, setTypeAlert} = useContext(ContextTasks)

    //Funcion para recibir el tipo de alerta desde task
    const showAlert = (color, text) => {
        setTypeAlert({color: color, text: text});
        handleClick(true);
    }

return (
    <div className='taskwrapper'>
        <ul className='tasklist'>
            {tasks.length > 0 ? tasks.map((task) => { 

            //Si el filtro esta en all muestro la tarea sin mas
            if(filter === 'all') {
                return <Task 
                    key={task.id}
                    task={task}
                    showAlert={showAlert} //Envio por props la funcion
                />
            // //De lo contrario muestro cada tarea no completada, compruebo cada una
            } else if (filter === 'active' && !task.completed){
                return <Task 
                    key={task.id}
                    task={task}
                    showAlert={showAlert}

                />
            //Muestro las tareas completadas si el filtro esta puesto
            } else if (filter === 'completed' && task.completed) {
                return <Task 
                    key={task.id}
                    task={task}
                    showAlert={showAlert}

                />
            }
            //Si ya esta completada no la devolvemos
            return null
            })
            : <div className='list-task__message'>~ No tasks added ~</div>
            }
        </ul>
    </div>
    );
}
 
export default TaskList;