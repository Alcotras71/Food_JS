function modal() {
	// Modal

	const modalBtn = document.querySelectorAll('[data-modal]'),
		modalWindow = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('.modal__close'),
		modalTimerId = setTimeout(openModal, 60000);

	function closeModal() {
		modalWindow.classList.add('hide');
		modalWindow.classList.remove('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modalWindow.classList.add('show');
		modalWindow.classList.remove('hide');
		clearInterval(modalTimerId);
		window.removeEventListener('scroll', showModalByScroll);
		document.body.style.overflow = 'hidden';
	}

	modalBtn.forEach(btn => {
		btn.addEventListener('click', (e) => {
			if (e.target) {
				openModal(e.target);
			}
		});
	});

	modalCloseBtn.addEventListener('click', (e) => {
		if (e.target && modalWindow.classList.contains('show')) {
			closeModal(e.target);
		}
	});

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	window.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;