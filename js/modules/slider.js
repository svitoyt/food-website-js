function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, feild}) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container), //для позиционирования точек - релатив (container)
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper), //слайдер2
        slidesField = document.querySelector(feild), //слайдер2
        width = window.getComputedStyle(slidesWrapper).width; //слайдер2, ширина окна слайдера на сайте
    let slideIndex = 1;
    let offset = 0; //отступ

    if (slides.length < 10) { 
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //сформировали общее поле для всех слайдов
    slidesField.style.display = 'flex'; // все слайды выстроены в одну линию
    slidesField.style.transition = '0.5s all'; // их скорость смены

    slidesWrapper.style.overflow = 'hidden'; //спрятали слайды, выходящие за рамки общего блока

    slides.forEach(slide => {
        slide.style.width = width;
    }); //выровняли все слайды по одному размеру

    slider.style.position = 'relative'; //блок слайдера позиционирование relative
    
    const indicators = document.createElement('ol'), //создаем элемент на стр
        dots = []; //массив для точек
    indicators.classList.add('carousel-indicators'); //добавлям класс на стр
    indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
    `; //все стили из файла
    slider.append(indicators); //поместили индикатры во внутрь блока

    for (let i = 0; i <= slides.length-1; i++) { //определяем кол-во точек
        const dot = document.createElement('li'); //создаем точку на стр
        dot.setAttribute('data-slide-to', i + 1); //даем точке класс
        dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
        `; //стили для точек
        if (i == 0) {
            dot.style.opacity = 1; //делаем первую точку ярче
        }
        indicators.append(dot); //заливаем точки в массив индикаторов
        dots.push(dot); //заливаем точки в массив с точками
    }

    function deleteNptDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNptDigits(width) * (slides.length - 1)) { //удаляем из стр 200px - все не числа - px 
            offset = 0;
        } else {
           offset += deleteNptDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5'); //все точки прозрачные
        dots[slideIndex - 1].style.opacity = 1; //делаем активную точку непрозрачной
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNptDigits(width) * (slides.length - 1); //смещение в конец
        } else {
           offset -= deleteNptDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;//смещение внутри длинного общего блока

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5'); //все точки прозрачные
        dots[slideIndex - 1].style.opacity = 1; //делаем активную точку непрозрачной
    });

    dots.forEach(dot => { //фунция при нажатии на точку переход на слайд
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');//ловим, где был клик в данном классе

            slideIndex = slideTo;
            offset = deleteNptDigits(width) * (slideTo - 1); //отступы 
            slidesField.style.transform = `translateX(-${offset}px)`; //перемещение между слайдами в рамках блока

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
    
/*     showSlides(slideIndex); //решение 1
    if (slides.length < 10) { 
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach( item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) { 
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    }); */
}

export default slider;