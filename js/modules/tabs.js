function tabs() {
	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader');

	function hideTabs() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});
	}

	function showTab(i) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabs();
	showTab(0);

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {

			tabs.forEach((tab, i) => {
				if (tab === target) {
					hideTabs();
					showTab(i);
				}
			});
		}
	});
}

module.exports = tabs;