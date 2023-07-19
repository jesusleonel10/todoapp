/* Funcion para cambiar si esta completada o no
    Recibo el id, mapeo todas las tareas y donde coincida cambio el valor de completado */
    const toggleCompleted = (id, setState, state) => {
        setState(state.map((task) => {
            if(task.id === id) {
                return {...task, completed: !task.completed}
            }
            return task
        }))
    }
    /* Funcion para editar el texto de la tarea
    Recibo el id y el nuevo texto, mapeo las tareas donde coincida el id, hago el cambio*/
    const editTask = (id, newText, setState, state) => {
        setState(state.map((task) => {
            if(task.id === id) {
                return {...task, text: newText}
            }
            return task
        }))
    }
    /* Lo mismo que arriba, simplemente filtramos con los elementos q no tengan el id*/
    const deleteTask = (id, setState, state) => {
        setState(state.filter((task) => task.id !== id ? task : ""
        ))
    }

export {toggleCompleted, editTask, deleteTask}