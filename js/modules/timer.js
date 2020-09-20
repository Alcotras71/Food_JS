function timer(selector, deadline, dateSelector, hoursMinutesSelector) {
	// Timer

	const date = document.querySelector(dateSelector),
		hoursMinutes = document.querySelector(hoursMinutesSelector);

	date.innerText = deadline.getDate();
	hoursMinutes.innerText = `${getZero(deadline.getHours())}:${getZero(deadline.getMinutes())}`;

	function getTimeRemaining() {
		const t = deadline - new Date(),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / (1000 * 60)) % 60),
			seconds = Math.floor((t / (1000)) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = document.querySelector('#days'),
			hours = document.querySelector('#hours'),
			minutes = document.querySelector('#minutes'),
			seconds = document.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				timer.classList.add('hide');
			}
		}
	}

	setClock(selector, deadline);
}

export default timer;