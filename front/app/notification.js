const body = document.querySelector('body');



  /**
   * @param {object} options las opcion para la notificacion
   * @param {string} options.titles el titulo de la notificacion
   * @param {string} options.description la descricion de la notificacion
   * @param {'success' | 'error'} options.type la notificacion
   */
  
 export const createNotification = (options) => {
    const div = document.createElement('div');
    div.id = 'notification';
    div.innerHTML = `
    <p id="notification-title">${options.titles}</p>
    <p id="notification-description">${options.description}</p>
   `;

    switch (options.type) {
        case 'success':
            div.classList.add('notification-success');
            break;

            case 'error':
            div.classList.add('notification-error');
            break;
    }

    body.append(div);

    setTimeout(() => div.remove() , 1000);
  }