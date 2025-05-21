import { createNotification } from "./notification.js";

const BASE_URL = 'http://localhost:3000/tasks';
let task = [];
//Comenzar el guardado en el local storage

/** 
  * Agrega un contacto.
  * @param {object} newTask La nueva tarea
  * @param {string} newTask.description Contenido de la tarea 
  
*/


const addTask= async (newTask) => {

   try {
    const newTaskJson = JSON.stringify(newTask);
    const response = await fetch(BASE_URL,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:newTaskJson
    })

    const createdTask = await response.json();
     task = task.concat(createdTask);
     createNotification({
        titles: 'Tarea creado',
        type: 'success'
      });
   } catch (error) {
     createNotification({
      titles: 'Error',
      description: 'El servidor no esta corriendo',
      type: 'error'
    })
   }
  };







//Guardar el contacto en el local storage
  const saveInBrowser = () => {
      localStorage.setItem('task', JSON.stringify(task));
    };

    const renderTask = (list) =>{
        // Borrar todo el html del ul para empezar desde 0
        list.innerHTML = '';
        task.forEach(tasks => {
        // 1. Crear el elemento li
        const li = document.createElement('li');
        // 2. Agregarle la clase
        li.classList.add('task-item');
        //3. Agregarle el id al li
        li.id = tasks.id;

        // 4. Crear el elemento en si
         
        const inputsContainerDiv = `
        <p class="task-text" >${tasks.task}</p>
        `;
        const checkBtn = ` 
        <button class="task-check-btn"><img src="../icon/check.png" alt=""></button>
        `;
        const deleteBtn = `
         <button class="task-delete-btn"><img src="../icon/delete.png" alt=""></button>
        `;
        li.innerHTML = `
        ${deleteBtn}
        ${inputsContainerDiv}
        ${checkBtn}
        `;
        // 4. Agregar a la lista
        list.append(li);          
      });
    };   

const getTaskFromDB = async ()=>{


try {

  const response = await fetch(BASE_URL,{method:"GET"});
  const data = await response.json()
  task = data;  
} catch (error) {
  console.log(error);
  
  if(error.message === 'Failed to fetch') {
      createNotification({
        titles: 'Error',
        description: 'El servidor no esta corriendo',
        type: 'error'
      });
    }
  
}

};













    /** Obtener los contactos del navegador */
    const getTaskFromLocalStorage = () => {
        // 1. Obtener la data de local storage
        const taskLocalStorage = localStorage.getItem('task');
        // 2. Si la data existe, guardar los contactos de localStorage en el array de contactos/].
        task = JSON.parse(taskLocalStorage) ?? [];
      };
    /** Elimina un contacto
     * @param {string} id El id del contacto a eliminar
     */
      const removeTask = async (id) =>{
        const url = `${BASE_URL}/${id}`;
        const reponse = await fetch(url,{method:"DELETE"})
        const taskDelete = await reponse.json();
        task = task.filter(tasks => tasks.id !== id);
        createNotification({
          titles: 'Tarea Eliminada',
          description : `${taskDelete.description}`,
          type:'success'
        })
      };
 
 


    export {
        addTask,
        saveInBrowser,
        renderTask,
        removeTask,
        getTaskFromLocalStorage,
        getTaskFromDB
    
    }