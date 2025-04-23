let task = [];
//Comenzar el guardado en el local storage
/**
 * *Agrega un contacto.
 * @param {Task} newTask El nuevo contacto
*/

const addTask= (newTask) => {
    task = task.concat(newTask);
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
      const removeTask = (id) =>{
        task = task.filter(tasks => tasks.id !== id);
      };
 
    const updateTask= (updateTask) =>{
     task = task.map(task => {
      if (task.id=== updateTask.id) {
        return updateTask;
      }else{
        return task;
      }
     });
    }


    export {
        addTask,
        saveInBrowser,
        renderTask,
        removeTask,
        getTaskFromLocalStorage,
        updateTask
    
    }