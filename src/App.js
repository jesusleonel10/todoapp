import './css/App.css';
import './css/darkTheme.css'
import React, {useState, useContext} from 'react';
import Header from './components/Header';
import Input from './components/Input';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ContextTasks } from './context/contextTasks';

const App = () => {
  const {typeAlert, theme} = useContext(ContextTasks)

  /* Alertas */
    //Estado para mostrar/ocultar la alerta
    const [open, setOpen] = useState(false)
    //Cambio el state para mostrar la alerta
    const handleClick = (boolean) => {
        setOpen(boolean);
    };
    //Cambio el state para cerrar la alerta
    const handleClose = (reason) => {
        if (reason === 'timeout') {
          return;
        }
        setOpen(false);
    };

  return (
  <>
  <div className={`${theme} wrapper`}>
    <div className="container">
      <div className="content">
          <Header />
          <Input 
            handleClick={handleClick}
          />
          <TaskList
            handleClick={handleClick}
          />
            <Snackbar
              open={open}
              autoHideDuration={1500}
              onClose={handleClose} 
            >
              <Alert onClose={handleClose} variant="filled" severity={typeAlert.color} sx={{ width: '100%' }}>
                  {typeAlert.text}
              </Alert>
            </Snackbar>
          <Footer
            handleClick={handleClick}
          />
      </div>
    </div>
  </div>
  </>
  );
}

export default App;
