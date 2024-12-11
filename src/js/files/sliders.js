/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Autoplay, Thumbs, EffectFade, Pagination } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.qwe')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.qwe', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}

	if (document.querySelector('.mp-fb-main-slider')) { // Указываем скласс нужного слайдера
		let bgSlider = new Swiper('.mp-fb-bg-slider', {
			el: '.mp-fb-bg-slider',
			loop: true,
			// speed: 800,
			// effect: 'fade',
			// crossFade: true,
		});
		// Создаем слайдер
		new Swiper('.mp-fb-main-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			// Пагинация

			pagination: {
				el: '.mp-fb-main-slider .swiper-pagination',
				clickable: true,
			},
			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.mp-fb-slider-nav .swiper-button-prev',
			// 	nextEl: '.mp-fb-slider-nav .swiper-button-next',
			// },

			// Брейкпоинты
			// breakpoints: {
			// 	320: {
			// 		autoHeight: true,
			// 	},
			// 	1199.98: {
			// 		autoHeight: false,
			// 	},
			// },

			// События
			on: {
				slideNextTransitionStart: function (swiper) {
					bgSlider.slideNext();
				},

				slidePrevTransitionStart: function () {
					bgSlider.slidePrev();
				},
				// breakpoint: function (swiper, breakpointParams) {
				// 	if (!breakpointParams?.autoHeight) {
				// 		swiper.el.querySelector('.mp-fb-main-slider__wrapper').style.height = null;
				// 	}
				// },
			},

			// speed: 300,
			// effect: 'fade',
			// crossFade: true,

			// thumbs: {
			// 	swiper: {
			// 		modules: [EffectFade],
			// 		el: '.mp-fb-bg-slider',
			// 		// speed: 800,
			// 		loop: true,
			// 		// effect: 'fade',
			// 		// crossFade: true,
			// 	}
			// },
			// observer: true,
			// observeParents: true,
			// autoHeight: true,
			// loopAdditionalSlides: 1,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/




			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

		});
	}

	if (document.querySelector('.products-slider__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер

		let slider = new Swiper('.products-slider__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 20,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация

			pagination: {
				el: '.products-slider__fraction',
				type: 'fraction',
				// clickable: true,
				// formatFractionCurrent: function (number) {
				// 	console.log(this);
				// 	return number;
				// },
				// formatFractionTotal: function (number) {
				// 	console.log(this);
				// 	return number;
				// },
				// renderFraction: function (currentClass, totalClass) {
				// 	console.log(this.slides.length);
				// 	return `<span class="${currentClass}"></span>/<span class="${totalClass}">${this.slides.length}</span>`;
				// },
			},
			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: `.products-slider .swiper-button-prev`,
				nextEl: `.products-slider .swiper-button-next`,
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 4,
				},
				374.98: {
					slidesPerView: 2,
					spaceBetween: 4,
				},
				679.98: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1129.98: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1549.98: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},

			// События
			on: {
				// init: function (s) { console.log(s); }
			}
		});
	}

	if (document.querySelector('.mp-experts__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.mp-experts__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.mp-experts__slider .swiper-button-prev',
				nextEl: '.mp-experts__slider .swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}

	if (document.querySelector('.product-detail-slider__main')) { // Указываем скласс нужного слайдера
		let thumbsProdSlider = new Swiper('.product-detail-slider__thumbs', {
			grabCursor: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			breakpoints: {
				320: {
					direction: "horizontal",
					spaceBetween: 5,
				},
				767.98: {
					direction: "vertical",
					spaceBetween: 16,
				},
			},
		})
		// Создаем слайдер
		let mainProdSLider = new Swiper('.product-detail-slider__main', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Thumbs, Navigation],
			slidesPerView: 1,
			spaceBetween: 10,
			thumbs: {
				swiper: thumbsProdSlider,
			},
			// speed: 800,
			// observer: true,
			// observeParents: true,
			// autoHeight: true,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.product-detail-slider__nav .swiper-button-prev',
				nextEl: '.product-detail-slider__nav .swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			// on: {

			// }
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});