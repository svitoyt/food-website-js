function calculator() {
    const result = document.querySelector('.calculating__result span'); //вывод на страницу кол-ва калоррий
    
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        let sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        let sex = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); //убираем все активные классы (зеленую подсветку)
            if (elem.getAttribute('id') === localStorage.getItem('sex')) { //если id блока совпадает с полом в локал сторе
                elem.classList.add(activeClass); //блок делаем активным классом
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { //если data-ratio блока совпадает с локал сторе
                elem.classList.add(activeClass); //блок делаем активным классом
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'xxxx ';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();//вызов функции для рассчета

    function getStaticInformation(selector, activeClass) { //функция отвечает за пол и акивность
        const elements = document.querySelectorAll(selector); //родител объект
        
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { //найти блок, который нажимается/не нажимается
                if (e.target.getAttribute('data-ratio')) { //если нажали на активность
                    ratio = +e.target.getAttribute('data-ratio'); //получаем данные из data-ratio для активности html
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));//сохраняем в локал стор данные по активности
                } else {
                    sex = e.target.getAttribute('id');//получаем данные пол в переменную пол
                    localStorage.setItem('sex', e.target.getAttribute('id'));//сохраняем в локал стор данные по пол
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();//вызов функции для рассчета
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); //вызываем функции для пола
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); //вызываем функции для активности

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => { //для каждого введенного значения делаем: 
            
            if (input.value.match(/\D/g)) { //проверка, если пользоват вводит буквы, а не цифры
                input.style.border = '1px solid red'; //появляется красная обводка
            } else {
                input.style.border = 'none'; //иначе - нет
            }
            
            switch(input.getAttribute('id')) { //обращаемся к id html 
                case 'height':
                    height = +input.value; //присваиваем переменной введенное пользователем значение
                    break; //стоп
                
                case 'weight':
                    weight = +input.value; //присваиваем переменной введенное пользователем значение
                    break; //стоп
                
                case 'age':
                    age = +input.value; //присваиваем переменной введенное пользователем значение
                    break; //стоп
            }
            calcTotal();//вызов функции для рассчета
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calculator;