const mainHeader = document.querySelector('.main-header');
const scrlBtn = document.querySelector('.scroll-btn');

scrlBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

let timer = null;
document.addEventListener('scroll', () => {
  if (timer !== null) {
    clearTimeout(timer);
  }
  let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollPos >= 100) {
    mainHeader.classList.add('sticky');
  } else if (scrollPos === 0) {
    mainHeader.classList.remove('sticky');
  }

  if (scrollPos > 500) {
    scrlBtn.classList.add('active');

    timer = setTimeout(function () {
      scrlBtn.classList.remove('active'); // remove button if user not scrolling for 3 seconds.
    }, 3000);
  } else {
    scrlBtn.classList.remove('active');
  }
});
