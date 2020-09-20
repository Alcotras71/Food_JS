
function closeModal(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.add('hide');
	modalWindow.classList.remove('show');
	document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector);

	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden';

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal

	const modalBtn = document.querySelectorAll(triggerSelector),
		modalWindow = document.querySelector(modalSelector);

	modalBtn.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow && modalWindow.classList.contains('show') ||
			e.target.getAttribute('data-close') == "") {
			closeModal(modalSelector);
		}
	});

	window.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal, openModal };
