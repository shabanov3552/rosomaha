// Подключение функционала "Чертогов Фрилансера"
import { isMobile, bodyLockToggle, bodyLockStatus, bodyLock, bodyUnlock } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//#region Глобальный клик

document.addEventListener("click", function (e) {
   // открыть модалку каталога
   if (bodyLockStatus && e.target.closest('.js-open-mobile-catalog')) {
      bodyLockToggle();
      document.documentElement.classList.toggle("mobile-catalog-open");
      if (window.matchMedia("(min-width: 991.98px)").matches && !isMobile.any()) {
         document.addEventListener("mouseover", sidebarCatalogActions);
         document.removeEventListener("click", sidebarCatalogActions);
      } else {
         document.addEventListener("click", sidebarCatalogActions);
         document.removeEventListener("mouseover", sidebarCatalogActions);
      }
   }
   // закрыть модалку каталога
   if (e.target.closest('.js-mobile-catalog-close')) {
      bodyLockToggle();
      document.documentElement.classList.remove("mobile-catalog-open", "sidebar-sub-catalog-open", 'menu-open');
   }
   if (!e.target.closest('.mobile-catalog') && document.querySelector('.mobile-catalog-open') && !e.target.closest('.js-open-mobile-catalog')) {
      bodyLockToggle();
      document.documentElement.classList.remove("mobile-catalog-open", "sidebar-sub-catalog-open");
   }
   if (e.target.closest('.js-close-menu')) {
      bodyUnlock();
      document.documentElement.classList.remove("menu-open");
   }
   // очистка input по клику на крестик
   if (e.target.closest('.form__clear-svg')) {
      let input = e.target.closest('.form__line').querySelector('.form__input') || e.target.closest('.form__line').querySelector('.form__txt');
      input.value = '';
      input.classList.remove('_form-focus');
      input.parentElement.classList.remove('_form-focus');
      e.target.closest('.form__clear-svg').classList.remove('_active');
      // Inputmask.remove(input);
      // input.style.height = `auto`;
   }
   // автовысота для textarea
   if (e.target.closest('textarea')) {
      txtarAutoHeight(e.target)
   }
   // спрятать/показать input в личкабе
   if (e.target.closest('.personal-data__change')) {
      changeData(e.target)
      e.preventDefault()
   }
   // смена текста кнопки в личкабе
   if (e.target.closest('.order__more-btn')) {
      let target = e.target.closest('.order__more-btn')
      target.classList.contains('_spoller-active') ? target.innerHTML = 'Свернуть детали заказа' : target.innerHTML = 'Показать детали заказа';
      e.preventDefault()
   }
   // Открыть закрыть модалку поиска на мобилке
   if (e.target.closest('.js-mobile-search-btn')) {
      bodyLock();
      document.documentElement.classList.add('search-open');
   }
   if (e.target.closest('.js-search-close')) {
      bodyUnlock();
      document.documentElement.classList.remove('search-open');
   }
});

//#endregion

//#region Перемещение модалки с фильтрами под .wrapper

const filtersPopup = document.querySelector('#filters-more');

if (filtersPopup) {
   filtersPopup.remove();
   document.querySelector('.popup-box').insertAdjacentElement("beforeend", filtersPopup);
   getFilterColumns(filtersPopup);
}

function getFilterColumns(popup) {
   const columns = popup.querySelectorAll('.filters__col');
   const popupWrapper = popup.querySelector('.filters__wrapper');
   columns.length > 1 ? popupWrapper.classList.add('many-cols') : null;
}

//#endregion

//#region Шаринг в деталке

let shareButton = document.getElementById('share-button');
if (shareButton) {
   let thisUrl = window.location.href
   let thisTitle = document.title;
   shareButton.addEventListener('click', function () {
      // Проверка поддержки navigator.share
      if (navigator.share && isMobile.any()) {

         // navigator.share принимает объект с URL, title или text
         navigator.share({
            title: thisTitle,
            url: thisUrl
         })
            .then(function () {
               // Shareing successfull
            })
            .catch(function () {
               // Sharing failed
            })

      } else {
         flsModules.popup.open('#share-popup');
         copyUrl();
      }
   })
}
function copyUrl() {
   const copyButton = document.querySelector('.share__button');
   const copyInput = document.querySelector('.share__input');

   copyInput.value = window.location.href;
   setTimeout(() => {
      copyInput.focus();
   }, 100);

   copyButton.addEventListener("click", function (e) {
      copyInput.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      copyButton.innerHTML = 'Ссылка скопированна';
      copyButton.classList.remove('btn__orange');
      copyButton.setAttribute('disabled', 'true');
   });
}

//#endregion

//#region автовысота для textarea

function txtarAutoHeight(target) {
   const el = target;
   if (el.closest('textarea')) {

      let origHeight
      if (el.dataset.height) {
         origHeight = el.dataset.height
      } else {
         origHeight = el.scrollHeight
         el.dataset.height = origHeight
      }
      origHeight = Number(origHeight)
      el.style.height = el.setAttribute('style', 'height: ' + (origHeight + 1) + 'px');
      el.addEventListener('input', e => {
         if (el.scrollHeight > origHeight) {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 10 + 'px';
         } else {
            el.style.height = 'auto';
            el.style.height = origHeight + 'px';
         }
      });
   }
}

//#endregion

//#region спрятать/показать input в личкабе

function changeData(target) {
   let el = target.closest('.personal-data__row')
   el.classList.add('_active');
   let submitBtn = el.querySelector('.personal-data__btn')
   submitBtn.addEventListener("click", function (e) {
      el.classList.remove('_active');
      el.classList.add('show-msg');
      setTimeout(() => {
         el.classList.remove('show-msg');
      }, 3000);
   });
   document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'NumpadEnter') {
         el.classList.remove('_active');
         el.classList.add('show-msg');
         setTimeout(() => {
            el.classList.remove('show-msg')
         }, 3000);
      }
   });
}

//#endregion

//#region Добавление классов для кнопок на странице оформления при загрузке и обновлении сстраницы

window.addEventListener("load", function (e) {
   const target = document.querySelector('.radio-buttons');
   if (target) {

      const config = {
         attributes: true,
         childList: true,
         subtree: true
      };

      function styleButtonChange() {
         const pickUpPointButtons = document.querySelectorAll('.radio-buttons__inner button, .radio-buttons__inner .btn');

         pickUpPointButtons.forEach(btn => {
            btn.setAttribute('class', '')
            btn.style = 'display: flex; justify-content:center; align-items: center; text-align: center;';
            btn.classList.add('radio-buttons__btn', 'btn', 'btn_grey');
         });
      }
      styleButtonChange();

      const callback = function (mutationsList, observer) {
         for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
               styleButtonChange();
            }
         }
      };

      const observer = new MutationObserver(callback);

      observer.observe(target, config);
   }
});

//#endregion

//#region hover на ссылках в боковом каталоге

// const sidebarCatalogMenuChunk = document.querySelector('.mobile-catalog__menu-chunk');
// if (sidebarCatalogMenuChunk !== null) {
//    const sidebarCatalogMenu = sidebarCatalogMenuChunk.querySelector('.mobile-catalog__menu');
//    const sidebarRect = sidebarCatalogMenuChunk.querySelector('.mobile-catalog__hover-rect')
//    sidebarCatalogMenuChunk.addEventListener('mouseover', (e) => {
//       let target = e.target.closest('.mobile-catalog__link');
//       if (e.target.classList.contains('mobile-catalog__link')) {
//          sidebarRect.style.bottom = `${sidebarCatalogMenu.offsetHeight - ((target.offsetTop + target.clientHeight) - sidebarCatalogMenu.scrollTop)}px`
//       }
//    })
// }

//#endregion

//#region Открыть/закрыть боковой каталог + Открытие закрытие подкатегорий в каталоге

export function sidebarCatalogActions(e) {
   if (e.target.closest('[data-parent]')) {
      const targetElement = e.target.closest('[data-parent]');
      const subMenuId = targetElement.closest('[data-parent]').dataset.parent ? targetElement.closest('[data-parent]').dataset.parent : null;
      const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
      if (subMenu) {
         const activeLink = document.querySelector('._sub-menu-active');
         const activeBlock = document.querySelector('._sub-menu-open');


         if (activeLink && activeLink !== targetElement) {
            activeLink.classList.remove('_sub-menu-active');
            activeBlock.classList.remove('_sub-menu-open');
            document.documentElement.classList.remove('sidebar-sub-catalog-open');
         }
         document.documentElement.classList.add('sidebar-sub-catalog-open');
         targetElement.classList.add('_sub-menu-active');
         subMenu.classList.add('_sub-menu-open');
         e.preventDefault();
      } else {
         const activeLink = document.querySelector('._sub-menu-active');
         const activeBlock = document.querySelector('._sub-menu-open');


         if (activeLink) {
            activeLink.classList.remove('_sub-menu-active');
            activeBlock.classList.remove('_sub-menu-open');
            document.documentElement.classList.remove('sidebar-sub-catalog-open');
         }
      }
   }
   if (e.target.closest('.js-mobile-catalog-back')) {
      document.documentElement.classList.remove('sidebar-sub-catalog-open');
      document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
      document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
      e.preventDefault();
   }
}

//#endregion

//#region Кнопка вверх и лого

if (document.querySelector('.broadcast')) {

   let buttonToTop = function (e) {
      let btnTop = document.querySelector('.broadcast');
      let scr_val = window.pageYOffset + document.documentElement.clientHeight;
      let scrollHeight = Math.max(
         document.body.scrollHeight, document.documentElement.scrollHeight,
         document.body.offsetHeight, document.documentElement.offsetHeight,
         document.body.clientHeight, document.documentElement.clientHeight
      );
      scr_val >= (scrollHeight - 50) ? btnTop.classList.add('_active') : btnTop.classList.remove('_active');
   };
   window.addEventListener('scroll', buttonToTop);
}
//#endregion

//#region Плавающая линия для табов

document.querySelectorAll(".float-line").forEach(e => {
   floatLine(e)
});

function floatLine(node) {
   if (!node) return

   node.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("float-line__item")) {
         if (node.closest('.float-line__horizontal')) {
            node.style.setProperty(
               "--underline-offset-y",
               `${e.target.offsetTop}px`
            );
            node.style.setProperty(
               "--underline-height",
               `${e.target.offsetHeight}px`
            );
         } else {
            node.style.setProperty(
               "--underline-width",
               `${e.target.offsetWidth}px`
            );
            node.style.setProperty(
               "--underline-offset-x",
               `${e.target.offsetLeft}px`
            );
         }
      }
   });
   node.addEventListener("mouseleave", () => {
      if (node.closest('.float-line__horizontal')) {
         node.style.setProperty("--underline-height", "0")
      } else {
         node.style.setProperty("--underline-width", "0")
      }
   });
}

//#endregion

//#region Переключатель отображения плиток в каталоге

const layout = document.querySelector('.js-layout');
if (layout) {



   if (localStorage.getItem('layout')) {
      document.querySelector('.main-catalog__cards, .favorites__cards').classList.add('row');
      layout.querySelector(".js-layout__row").classList.add('_active');
      layout.querySelector(".js-layout__column").classList.remove('_active');
   }


   layout.addEventListener("click", function (e) {
      let target = e.target;
      let cards = document.querySelector('.main-catalog__cards, .favorites__cards')
      let rowBtn = layout.querySelector(".js-layout__row")
      let colBtn = layout.querySelector(".js-layout__column")



      if (target.closest('.js-layout__column')) {
         cards.classList.remove('row')
         localStorage.removeItem('layout')
      } else if (target.closest('.js-layout__row')) {
         cards.classList.add('row')
         localStorage.setItem("layout", 'row')
      }
      if (target.closest('.js-layout__row')) {
         colBtn.classList.remove('_active')
         rowBtn.classList.add('_active')
      } else {
         colBtn.classList.add('_active')
         rowBtn.classList.remove('_active')
      }
   });
}

//#endregion

//#region высота строк в сравнении 

window.addEventListener("load", function () {
   const dataName = Array.from(document.querySelectorAll('[data-name]'));
   let names = [];
   dataName.forEach(el => {
      if (!names.includes(el.dataset.name)) {
         names.push(el.dataset.name)
      }
   });
   for (const name of names) {
      setHeight(name)
   }
   function setHeight(name) {
      const nodeName = document.querySelector(`[data-main=${name}]`);
      const node = document.querySelectorAll(`[data-name=${name}]`);
      let heights = []
      heights.push(nodeName.scrollHeight);
      node.forEach(el => {
         heights.push(el.scrollHeight);
      });
      let maxHei = Math.max(...heights);
      node.forEach(element => {
         element.style.height = maxHei + 'px';
      });
      nodeName ? nodeName.style.height = maxHei + 'px' : null;
   }
   let btnChek = document.querySelector(".radio-inline input[type=\"radio\"]:checked");
   if (btnChek) {
      btnChek.closest('.radio-inline').classList.add('checked');
   }
});

//#endregion

//#region выбор всех чекбоксов

// js-allCheck

document.addEventListener('change', e => {
   let target = e.target;
   if (target.classList.contains('js-allCheck')) {
      let table = target.closest('.merchant-cabinet__table')
      let checkboxes = table.querySelectorAll('.merchant-cabinet__checkbox input');
      target.checked ? checkboxes.forEach(e => e.checked = true) : checkboxes.forEach(e => e.checked = false);
   }
});

//#endregion

//#region Функционал дропдаунов открыть\закрыть

document.addEventListener("click", function (e) {
   const target = e.target;
   const ddWrapper = target.closest('[data-dropdown]');
   const ddActive = document.querySelector('._dd-active');

   if (ddWrapper) {
      dropdownAction(e, ddWrapper, ddActive);
   } else if (ddActive) {
      ddActive.classList.remove('_dd-active');
   }
});

function dropdownAction(e, ddWrapper, ddActive) {
   const target = e.target.closest('[data-dropdown-button]');
   const ddButton = ddWrapper.querySelector('[data-dropdown-button]');

   if (target == ddButton) {
      if (ddActive && ddActive !== ddWrapper) {
         ddActive.classList.remove('_dd-active');
      }

      ddWrapper.classList.toggle('_dd-active');
      e.preventDefault();
   }
}

//#endregion

//#region Анимация движения бокового каталога и поиска на десктопе

class CatalogSidebar {
   constructor(options, manager) {
      const { animatedBackground, leftSidebar, catalogSidebar, catalogToggleButton, htmlClass, animationDuration } = options;

      this.animatedBackground = document.querySelector(animatedBackground);
      this.leftSidebar = document.querySelector(leftSidebar);
      this.catalogSidebar = document.querySelector(catalogSidebar);
      this.catalogToggleButton = document.querySelector(catalogToggleButton);
      this.htmlClass = htmlClass;
      this.htmlElement = document.documentElement;
      this.manager = manager;

      this.isAnimating = false; // Флаг для анимации
      this.isCatalogOpen = false; // Состояние панели
      this.animationDuration = animationDuration || 400; // Длительность анимации

      if (!this.animatedBackground || !this.leftSidebar || !this.catalogSidebar || !this.catalogToggleButton) {
         console.error('Не удалось найти все необходимые элементы для работы скрипта.');
         return;
      }

      if (this.manager) {
         this.manager.register(this);
      }

      this.bindEvents();
   }

   bindEvents() {
      this.catalogToggleButton.addEventListener('click', () => this.toggleCatalog());
   }

   easeInOut(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
   }

   animateCatalogSidebar(startTime, callback) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.animationDuration, 1);
      const easedProgress = this.easeInOut(progress);

      const leftSidebarWidth = this.leftSidebar.offsetWidth;
      const catalogSidebarWidth = this.catalogSidebar.offsetWidth;

      const sidebarPosition = this.isCatalogOpen
         ? -catalogSidebarWidth * easedProgress
         : -catalogSidebarWidth + catalogSidebarWidth * easedProgress;

      const backgroundWidth = this.isCatalogOpen
         ? leftSidebarWidth + catalogSidebarWidth * (1 - easedProgress)
         : leftSidebarWidth + catalogSidebarWidth * easedProgress;

      this.catalogSidebar.style.left = `${sidebarPosition}px`;
      this.animatedBackground.style.width = `${backgroundWidth}px`;

      if (progress < 1) {
         requestAnimationFrame(() => this.animateCatalogSidebar(startTime, callback));
      } else {
         this.finalizeAnimation();
         if (callback) callback();
      }
   }

   finalizeAnimation() {
      this.isAnimating = false;
      if (this.isCatalogOpen) {
         this.htmlElement.classList.remove(this.htmlClass);
      }
      this.isCatalogOpen = !this.isCatalogOpen;
   }

   toggleCatalog() {
      if (this.isAnimating) return;

      if (this.manager) {
         this.manager.togglePanel(this);
      }
   }

   closeCatalog(callback) {
      if (this.isCatalogOpen && !this.isAnimating) {
         this.isAnimating = true;
         const startTime = performance.now();
         this.animateCatalogSidebar(startTime, () => {
            if (callback) callback();
         });
      } else if (callback) {
         callback();
      }
   }

   openCatalog() {
      if (!this.isCatalogOpen && !this.isAnimating) {
         this.isAnimating = true;
         this.htmlElement.classList.add(this.htmlClass);
         const startTime = performance.now();
         this.animateCatalogSidebar(startTime);
      }
   }

   handleOutsideClick(event) {
      if (
         this.isCatalogOpen &&
         !this.catalogSidebar.contains(event.target) &&
         !this.catalogToggleButton.contains(event.target)
      ) {
         this.manager.closeAllExcept(null);
      }
   }
}

class CatalogSidebarManager {
   constructor() {
      this.instances = [];
      this.isAnimating = false; // Глобальный флаг анимации
      this.bindEvents();
   }

   register(instance) {
      this.instances.push(instance);
   }

   closeAllExcept(activeInstance, callback) {
      let remaining = this.instances.length;
      let anyPanelOpen = false;

      this.instances.forEach((instance) => {
         if (instance.isCatalogOpen) {
            anyPanelOpen = true;
         }
         if (instance !== activeInstance) {
            instance.closeCatalog(() => {
               remaining -= 1;
               if (remaining === 0 && callback) callback();
            });
         } else {
            remaining -= 1;
         }
      });

      if (!anyPanelOpen) {
         bodyUnlock(); // Разблокировка прокрутки, если ни одна панель не открыта
      }

      if (remaining === 0 && callback) callback();
   }

   togglePanel(activeInstance) {
      if (this.isAnimating) return;

      if (activeInstance.isCatalogOpen) {
         this.isAnimating = true;
         activeInstance.closeCatalog(() => {
            bodyUnlock(); // Прокрутка разблокируется только при закрытии последней панели
            this.isAnimating = false;
         });
      } else {
         this.isAnimating = true;
         this.closeAllExcept(activeInstance, () => {
            bodyLock(); // Прокрутка блокируется при открытии новой панели
            activeInstance.openCatalog();
            this.isAnimating = false;
         });
      }
   }

   bindEvents() {
      document.addEventListener('click', (event) => {
         this.instances.forEach((instance) => instance.handleOutsideClick(event));
      });
   }
}

// Инициализация менеджера и панелей
const sidebarManager = new CatalogSidebarManager();

const catalogSidebar = new CatalogSidebar(
   {
      animatedBackground: '.animated-bg-ibg',
      leftSidebar: '.left-sidebar',
      catalogSidebar: '.sidebar-catalog__wrapper',
      catalogToggleButton: '.js-catalog-btn',
      htmlClass: 'sidebar-open',
      animationDuration: 300,
   },
   sidebarManager
);

const searchSidebar = new CatalogSidebar(
   {
      animatedBackground: '.animated-bg-ibg',
      leftSidebar: '.left-sidebar',
      catalogSidebar: '.search-modal__wrapper',
      catalogToggleButton: '.js-search-btn',
      htmlClass: 'search-open',
      animationDuration: 300,
   },
   sidebarManager
);

//#endregion

//#region Анимация фона в подвале
const footer = document.querySelector('.footer'); // Футер
const animatedBg = document.querySelector('.animated-bg-ibg'); // Блок с картинкой
const leftSidebar = document.querySelector('.left-sidebar');

function moveImageWidth() {
   const footerTop = footer.offsetTop; // Верх футера относительно документа
   const footerBottom = footerTop + footer.offsetHeight; // Низ футера
   const viewportHeight = window.innerHeight; // Высота окна браузера
   const scrollPosition = window.scrollY; // Текущая прокрутка

   if (window.matchMedia('(max-width:991.98px)').matches) {
      animatedBg.style.zIndex = '';
      animatedBg.style.width = '';
      leftSidebar.style.top = '';
      leftSidebar.style.bottom = '';
      return
   }
   // Проверка, виден ли футер в окне
   if (scrollPosition + viewportHeight < footerTop || scrollPosition > footerBottom) {
      // Футер не виден: сброс стилей
      animatedBg.style.zIndex = '';
      animatedBg.style.width = '';
      leftSidebar.style.top = '';
      leftSidebar.style.bottom = '';
      return;
   }
   // Футер виден: вычисляем прогресс
   const startScroll = footerTop - viewportHeight; // Начало видимости футера
   const endScroll = footerTop; // Верх футера касается верхней границы окна
   const progress = Math.min(
      Math.max((scrollPosition - startScroll) / (endScroll - startScroll), 0),
      1
   );

   // Устанавливаем z-index, когда движение начинается
   if (progress > 0) {
      animatedBg.style.zIndex = '1';
   }
   // Получаем начальное значение переменной в пикселях
   const leftSidebarWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--left-sidebar'), 10);
   const screenWidth = window.innerWidth; // Ширина экрана

   // Рассчитываем новую ширину: от начальной до ширины экрана
   const newWidth = leftSidebarWidth + progress * (screenWidth - leftSidebarWidth);

   leftSidebar.style.top = `-${scrollPosition - startScroll}px`;
   leftSidebar.style.bottom = `${scrollPosition - startScroll}px`;
   animatedBg.style.width = `${newWidth}px`; // Применяем новое значение ширины
}

// Подключаем обработчик скролла
window.addEventListener('scroll', moveImageWidth);
moveImageWidth(); // Проверить при загрузке страницы

//#endregion