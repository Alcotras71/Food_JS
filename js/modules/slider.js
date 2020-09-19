function slider() {
	// Slider 

	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesField = document.querySelector('.offer__slider-inner'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	function moveSlide() {
		slidesField.style.transform = `translateX(-${offset}px)`;
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	function checkCurrentSLide() {
		if (slides.length > 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	if (slides.length > 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	checkCurrentSLide();

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		moveSlide();

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		checkCurrentSLide();

		activeDot();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		moveSlide();

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		checkCurrentSLide();

		activeDot();
	});

	// SliderNavigation

	const slider = document.querySelector('.offer__slider');

	slider.style.position = 'relative';

	const dotsWrapper = document.createElement('ol'),
		dots = [];

	function activeDot() {
		dots.forEach(dot => dot.style.opacity = '0.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	dotsWrapper.classList.add('carousel-indicators');
	slider.append(dotsWrapper);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		dotsWrapper.append(dot);
		dots.push(dot);
	}

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);
			moveSlide();
			checkCurrentSLide();
			activeDot();
		});
	});
}

module.exports = slider;