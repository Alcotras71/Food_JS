function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
	// Slider 

	const slider = document.querySelector(container),
		slides = document.querySelectorAll(slide),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesField = document.querySelector(field),
		slidesWrapper = document.querySelector(wrapper),
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

export default slider;