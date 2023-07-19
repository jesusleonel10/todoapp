import React, {useState, useEffect} from 'react';

//Creamos el contexto
const ContextTasks = React.createContext()
//Componente que permite usar el contexto
const ProviderTasks = ({children}) => {
    //El estado debe estar aqui en el contexto, para asi poder importarlo desde donde se necesite
    //Estado de las tareas
    const savedTasks = localStorage.getItem('tasks') ?
    JSON.parse(localStorage.getItem('tasks')) : []
    
    const [tasks, changeTasks] = useState(savedTasks)

    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    //Estado para filtrar la lista
    const [filter, setfilter] = useState('all');

    //Estado para cambiar el tipo de alerta
    const [typeAlert, setTypeAlert] = useState({});

    //Estado modo oscuro
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    return (
        <ContextTasks.Provider
            value={
                {tasks, changeTasks, filter, setfilter, typeAlert, setTypeAlert, theme, setTheme}
            }
        >
            {children}
        </ContextTasks.Provider>
    );
}
 
export {ContextTasks, ProviderTasks};