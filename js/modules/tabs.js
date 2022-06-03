function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector), //сами item tabs, которые будем переключать
          tabsContent = document.querySelectorAll(tabsContentSelector), //родительский элемент, в котором лежат табы
          tabsParent = document.querySelector(tabsParentSelector); //родительский элемент, в котором лежат табы
    

    function hideTabContent() { //функция, присваивающая классы для скрытия лишних табов
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => { //функция, присваивающая актив класс таба, чтобы он был жирный
            item.classList.remove(activeClass); 
        });
    }

    function showTabContent(i = 0) { //функция, присваивающая классы для раскрытия нужных табов
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;
