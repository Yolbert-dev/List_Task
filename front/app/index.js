
import * as Task from "./task.js";

const inputTask = document.querySelector("#form-input-task");
const inputTaskBtn = document.querySelector("#form-input-task-btn");
const helperText = inputTask.nextElementSibling;
const taskList = document.querySelector("#task-list");

//Evento que Valida el formulario
 inputTask.addEventListener('input',e =>{
    // Validaciones de formulario

     if (inputTask.value === "") { 
        helperText?.classList.remove('show-helper-text');
        //Desactiva el boton de agregar tarea
        inputTaskBtn.disabled = true;  
    } else if (inputTask.value.length <3) {
        helperText?.classList.remove('show-helper-text');
        //Desactiva el boton de agregar tarea
        inputTaskBtn.disabled = true; 
        
    }
    //Validacion de longitud minima de 3 caracteres
     else if (inputTask.value.length >= 3) {
        helperText?.classList.add('show-helper-text');
        //Activa el boton de agregar tarea
        inputTaskBtn.disabled = false; 

    }
 });
//Evento dinamico Valida si el input perdio el foco y arroja alerta si el campo esta vacio
inputTask.addEventListener('blur',e =>{

    if (inputTask.value === "") {
      alert("The field cannot be empty");
    
    } 
});
 




    form.addEventListener('submit', async e => {
      e.preventDefault();
      // 1. Validar
      //if (!inputTask) return;
      // 2. Obtener tarea.
      const task = inputTask.value;
      // 3. Asignar un id. Ramdom
      const id = crypto.randomUUID();
      // 4. Estructurar el contacto
      const newTask = {id, task};
      // 5. Agregar al array de contactos
     await Task.addTask(newTask);
      // 6. Guardar en el navegador
      Task.saveInBrowser();
      // 7. Renderizar en el navegador
    Task.renderTask(taskList);
    
    task = inputTask.value = ""; // Limpiar el input
    });
    

taskList.addEventListener('click', async e => {
  const deleteBtn = e.target.closest('.task-delete-btn');
  const checkBtn = e.target.closest('.task-check-btn');


  if (deleteBtn) {
    //1. Encuentro el li
    const li = deleteBtn.parentElement;
    
    //2. Actualizo el array de js, usando el metodo filter para devolver todos los contactos exepto el que quiero eliminar.
    //Manera explicita
    //contacts = contacts.filter(contact =>{
      // if (contact.id !== li. id) return contact;})

      await Task.removeTask(li.id);
    
      //3. Renderizo los contactos actualizados
      Task.renderTask(taskList);
    
      Task.saveInBrowser();
  }
  if (checkBtn){
    const li = checkBtn.parentElement;
   //verificar si existe la clase completed
  //si no existe la clase completed, agregarla
  //si existe la clase completed, eliminarla
  if (!li.classList.contains('completed')) {
    
    li.classList.add('completed');
  } else {
    li.classList.remove('completed');
    
  }


    
    
          
   
}
});







    window.onload = async () => {
      //1. Obtener los contactos
await Task.getTaskFromDB();
      //2. Renderizar los contactos
  Task.renderTask(taskList);
    }


