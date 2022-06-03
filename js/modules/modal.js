function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show'); //открыть модальное окно
    modal.classList.remove('hide'); //убрать инвиз с модального окна
    document.body.style.overflow = 'hidden'; //запрет на прокрутку стр, пока открыто модальное окно
    
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); //если пользователь открыл окно, то оно не будет само появляться
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide'); //закрыть модальное окно
    modal.classList.remove('show'); //добавить инвиз на модальное окна
    document.body.style.overflow = ''; //снять запрет на прокрутку стр, при закрытии модального окна
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => { //чтобы обе кнопки "связаться с нами" работали, надо их перебрать
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));  //на каждую кнопку кидаем действие
    });


 /*     modalCloseBtn.addEventListener('click', closeModal); //при клике на крестик вызываем функцию для закрытия модал окна */

    modal.addEventListener('click', (e) => { //закрыть модальное окно при нажатии вне модал окна (на родительский элемент)
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    
    document.addEventListener('keydown', (e) => { //закрыть модальное окно при нажатии Esc клавиши
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) 
        //прокрученная часть экрана + видимая сейчас часть экрана >= полная высота сайта -1px 
        {
            openModal(modalSelector, modalTimerId); //открыть модал окно
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default  modal;
export {closeModal};
export {openModal};