/** Rating **/
let ratings = [].slice.call(document.querySelectorAll('.rating'));

function calculateStars(rating, currentVote) {
  let stars = [].slice.call(rating.querySelectorAll('.star'));
  stars.forEach((star, index) => {
    if (index + 1 === currentVote) {
      star.dataset.count++;
    }

    star.classList.add('is-transparent');
    star.classList.remove('is-half');
    star.classList.remove('was-half');
    star.classList.remove('was-transparent');
    star.classList.remove('is-half-temp');
    star.classList.remove('is-transparent-temp');
  });

  let count = parseInt(rating.dataset.count);
  let value = parseFloat(rating.dataset.value);

  if (currentVote) {
    let newCount = count + 1;
    let scoreAvgWeighted = stars.reduce((acc, curr, index) => {
      console.log(index + 1);
      return acc + parseInt(curr.dataset.count) * (index + 1);
    }, 0);

    let countAvg = stars.reduce((acc, curr, index) => {
      return acc + parseInt(curr.dataset.count);
    }, 0);

    console.log({ scoreAvgWeighted, countAvg });

    let newValue = Math.round((scoreAvgWeighted / countAvg) * 2) / 2;
    if (newValue >= 5) {
      newValue = 5;
    } else if (newValue <= 1) {
      newValue = 1;
    }

    rating.dataset.count = count = newCount;
    rating.dataset.value = value = newValue;
  }
  console.log({ count, value });

  let shouldAddHalf = value % 1 != 0 && Math.floor(value) < Math.round(value);
  console.log({ shouldAddHalf });
  value = shouldAddHalf ? Math.round(value) : Math.floor(value);
  console.log({ value });

  stars.slice(0, value).forEach((star, index) => {
    star.classList.remove('is-transparent');
    star.classList.remove('is-half');

    let currStarValue = index + 1;

    if (shouldAddHalf && currStarValue === value) {
      star.classList.add('is-half');
    }
  });
}

ratings.forEach((rating) => {
  calculateStars(rating);
  let stars = [].slice.call(rating.querySelectorAll('.star'));

  stars.forEach((el, index) => {
    el.onmouseover = function () {
      stars.forEach((star, i) => {
        if (star.classList.contains('is-transparent') || star.classList.contains('is-half')) {
          if (star.classList.contains('is-transparent')) {
            star.classList.add('was-transparent');
            star.classList.remove('is-transparent');
          }
          if (star.classList.contains('is-half')) {
            star.classList.add('was-half');
            star.classList.remove('is-half');
          }
        }

        if (i <= index) {
          star.classList.remove(['is-transparent', 'is-half']);
        }

        if (i > index) {
          star.classList.add(...['is-transparent', 'is-transparent-temp']);
        }
      });
    };

    el.onclick = function () {
      let zero = stars.filter((star) => star.classList.contains('was-transparent')).length;
      let half = stars.filter((star) => star.classList.contains('was-half')).length;
      let full = stars.filter(
        (star) => !star.classList.contains('was-half') && !star.classList.contains('was-transparent'),
      ).length;
      let currentVote = index + 1;
      console.log({ zero, half, full, currentVote });
      calculateStars(rating, currentVote);
    };
  });

  rating.onmouseout = function () {
    calculateStars(rating);
  };
});
