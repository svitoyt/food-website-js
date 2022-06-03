import {closeModal, openModal} from './modal'; //импорируем необходимые функции, использ в коде forms
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: './img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //отменить стандартное поведение браузера (перезагрузка страницы)

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); //вставить спиннер после блока на стр (под блоком)

            const formData = new FormData(form);
 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            const obj = {a:23, b:50};
            console.log(Object.entries(obj));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove(); 
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //скрыть элемент с классом .modal__dialog
        openModal('.modal', modalTimerId); //отвечает за открытие модальных окон

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); //добавляем класс элементу div
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); //элемент появляется на стр
        setTimeout(() => {
            thanksModal.remove(); //удаляеся элемент со стр
            prevModalDialog.classList.add('show'); 
            prevModalDialog.classList.remove('hide'); 
            closeModal('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu') //обращаемся к нашей базе данных, обратно вернется promise
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;
