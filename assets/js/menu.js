const body = document.querySelector('body');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.main-nav');
const navLink = document.querySelectorAll('.nav-link:not(.dropdown-nav)');
const dropdownNav = document.querySelectorAll('.dropdown-nav');

console.log(navLink)

function mobileMenu() {
  body.classList.toggle('active');
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}
hamburger.addEventListener('click', mobileMenu);

function closeMenu(e) {
  body.classList.remove('active');
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  dropdownNav.forEach((el) => el.classList.remove('active'))
  e.stopPropagation()
}
navLink.forEach((n) => n.addEventListener('click', closeMenu));

function toggleSubMenu(e) {
  e.target.classList.toggle('active');
}

dropdownNav.forEach((el) => el.addEventListener('click', toggleSubMenu))
