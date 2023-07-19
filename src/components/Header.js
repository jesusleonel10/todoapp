import React, {useContext, useEffect} from 'react';
import './../css/Header.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ContextTasks } from './../context/contextTasks';


const Header = () => {
    //Contexto del tema
    const {theme, setTheme} = useContext(ContextTasks)

    //Funcion para cambiar el valor del tema actual
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
      }, [theme]);

    return (
        <>
            <header>
                <div className='logo'>
                    <h1>TODO</h1>
                </div>
                <div className='btn-theme'>
                    <button 
                        id='change-theme'
                        onClick={toggleTheme}
                    >
                        {
                            theme === 'dark' ? 
                            <LightModeIcon sx={{ fontSize: 30, color: '#fff' }} />
                            :
                            <DarkModeIcon sx={{ fontSize: 30, color: '#fff' }} />
                        }
                    </button>
                </div>
            </header>
        </>
    );
}
 
export default Header;