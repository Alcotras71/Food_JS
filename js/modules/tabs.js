function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	// Tabs

	const tabs = document.querySelectorAll(tabsSelector),
		tabsContent = document.querySelectorAll(tabsContentSelector),
		tabsParent = document.querySelector(tabsParentSelector);

	function hideTabs() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove(activeClass);
		});
	}

	function showTab(i) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	hideTabs();
	showTab(0);

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {

			tabs.forEach((tab, i) => {
				if (tab === target) {
					hideTabs();
					showTab(i);
				}
			});
		}
	});
}

export default tabs;