import React, {useContext} from 'react';
import { ContextTasks } from './../context/contextTasks';
import Task from './Task';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './../css/TaskList.css';

const TaskList = ({handleClick}) => {
    const {tasks, changeTasks, filter, setTypeAlert} = useContext(ContextTasks)

    //Funcion para recibir el tipo de alerta desde task
    const showAlert = (color, text) => {
        setTypeAlert({color: color, text: text});
        handleClick(true);
    }

    // Function to update list on drop
    const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
        if (!droppedItem.destination) return;
        var updatedList = [...tasks];
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
        // Update State
        changeTasks(updatedList);
  };

return (
    <div className='taskwrapper'>
        <ul className='tasklist'>
        <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
            {(provided) => (
                <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                    {tasks.length > 0 ?
                            tasks.map((task, index) => { 

                                //Si el filtro esta en all muestro la tarea sin mas
                                if(filter === 'all') {
                                    return  <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                            className="item-container item"
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            >
                                                {<Task 
                                                    key={task.id}
                                                    task={task}
                                                    showAlert={showAlert} //Envio por props la funcion
                                                />}
                                            </div>
                                            )}
                                        
                                    </Draggable>
                                // //De lo contrario muestro cada tarea no completada, compruebo cada una
                                } else if (filter === 'active' && !task.completed){
                                    return <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                            className="item-container item"
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            >
                                                {<Task 
                                                    key={task.id}
                                                    task={task}
                                                    showAlert={showAlert}
                                                />}
                                            </div>
                                            )}
                                        
                                    </Draggable>
                                //Muestro las tareas completadas si el filtro esta puesto
                                } else if (filter === 'completed' && task.completed) {
                                    return <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                            className="item-container item"
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            >
                                                {<Task 
                                                    key={task.id}
                                                    task={task}
                                                    showAlert={showAlert}
                                                />}
                                            </div>
                                            )}
                                        
                                    </Draggable>
                                }
                                //Si ya esta completada no la devolvemos
                                return null
                                })
                        :
                            <div className='list-task__message'>
                               ~ Add tasks to your list ~
                            </div>
                    }
                    {provided.placeholder}
                </div>
            )}
            </Droppable>
        </DragDropContext>
            
        </ul>
    </div>
    );
}
 
export default TaskList;