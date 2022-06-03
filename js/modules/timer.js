function timer(id, deadline) {

    function getTimeRemaining(endtime) { //найдем разницу между концом акции и текущим днем
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); //все переводим в миллисек, в них считаем
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)); //возвращаем из миллисек в дни
            hours = Math.floor((t / (1000 * 60 * 60)) % 24); // -х- в часы
            minutes = Math.floor((t / 1000 / 60 ) % 60); // -х- в мин
            seconds = Math.floor((t / 1000) % 60); // -х- в сек
        }

        return { // на выходе будем иметь объект
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) { 
        const timer = document.querySelector(selector), // обратимся к элементам на странице
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();      
        
        function updateClock() { //передаём на страницу актуальные данные по дням, часам, мин и др
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <=0) { //Когда планируемая дата прошла, на счетчике образуется отриц число. 
                                //Чтобы этого не допустить, при 0 мы ставим стоп для обновления сек
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline); //задать таймер для элементов timet html, конец таймера - переменная deadline
}

export default timer;