// Select documents
const themeDots = document.querySelectorAll('.theme__dot');
const themeMode = document.getElementById('theme-style');
const logoScroll = document.querySelector('.nav__logo-link');
const btnScrollTo = document.querySelector('.btn__scroll--to');
const aboutSection = document.getElementById('about');
const navContainer = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const header = document.querySelector('.header');
const skillsTab = document.querySelectorAll('.skills__tab');
const skillsTabContainer = document.querySelector('.skills__tab-container');
const skillsContent = document.querySelectorAll('.skills__content');
const topLink = document.querySelector('.top-link');

// Theme Functionality.
const setThemeFunction = () => {
	themeDots.forEach(function (theme) {
		theme.addEventListener('click', function () {
			const mode = this.dataset.mode;
			console.log('Option clicked');
			setTheme(mode);
		});
	});

	const setTheme = (mode) => {
		if (mode === 'blue') {
			themeMode.href = 'css/blue.css';
		}
		if (mode === 'light') {
			themeMode.href = 'style.css';
		}
		if (mode === 'purple') {
			themeMode.href = 'css/purple.css';
		}
	};
};

// Page Navigation
const pageNavigation = () => {
	// Logo Scroll  ---- Not working as wanted now
	logoScroll.addEventListener('click', () =>
		header.scrollIntoView({ behavior: 'smooth' })
	);

	// Button Scroll
	btnScrollTo.addEventListener('click', () =>
		aboutSection.scrollIntoView({ behavior: 'smooth' })
	);

	// Page Navigation using Links
	navLinks.addEventListener('click', function (e) {
		e.preventDefault();

		if (e.target.classList.contains('nav__link')) {
			const id = e.target.getAttribute('href');

			document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
		}
	});
};

// Fixed Navbar
const fixedNavbarFunction = function () {
	const navHeight = navContainer.getBoundingClientRect().height;
	// console.log(navHeight);

	const fixedNavbar = function (entries) {
		const [entry] = entries;
		// console.log(entry);
		if (!entry.isIntersecting) {
			navContainer.classList.add('fixed');
			topLink.classList.add('show-link');
		} else {
			navContainer.classList.remove('fixed');
			topLink.classList.remove('show-link');
		}
	};

	const headerObserver = new IntersectionObserver(fixedNavbar, {
		root: null,
		threshold: 0,
		rootMargin: `-${navHeight}px`,
	});
	headerObserver.observe(header);
};

// Tab Skills
skillsTabContainer.addEventListener('click', function (e) {
	const clickedTab = e.target.closest('.skills__tab');

	if (!clickedTab) return;

	// Active classes removal
	skillsTab.forEach((tab) => tab.classList.remove('skills__tab--active'));
	skillsContent.forEach((content) =>
		content.classList.remove('skills__content--active')
	);

	clickedTab.classList.add('skills__tab--active');

	// Activate Skill Content
	document
		.querySelector(`.skills__content--${clickedTab.dataset.tab}`)
		.classList.add('skills__content--active');
});

//////////////////////////////////////////////
/// init function
const init = function () {
	setThemeFunction();
	pageNavigation();
	fixedNavbarFunction();
};
init();

/////////////////////////////////////////////////////
/// Form Validation

const isValidEmail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

const form = document.querySelector('form');
const thankYou = document.querySelector('.thank-you');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const inputs = [nameInput, emailInput, subjectInput, messageInput];

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
	// elm.classList.remove('invalid');
	elm.nextElementSibling.classList.add('hidden');
};

const invalidateElm = (elm) => {
	// elm.classList.add('invalid');
	elm.nextElementSibling.classList.remove('hidden');
};

const validateInputs = () => {
	if (!isValidationOn) return;

	isFormValid = true;
	inputs.forEach(resetElm);

	if (!nameInput.value) {
		isFormValid = false;
		invalidateElm(nameInput);
	}

	if (!isValidEmail(emailInput.value)) {
		isFormValid = false;
		invalidateElm(emailInput);
	}
	if (!subjectInput.value) {
		isFormValid = false;
		invalidateElm(subjectInput);
	}
	if (!messageInput.value) {
		isFormValid = false;
		invalidateElm(messageInput);
	}
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	isValidationOn = true;
	validateInputs();
	if (isFormValid) {
		form.remove();
		thankYou.classList.remove('hidden');
		form.submit();
	}
});
inputs.forEach((input) => {
	input.addEventListener('input', () => {
		validateInputs();
	});
});
