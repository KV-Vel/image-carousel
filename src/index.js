import './css/styles.css';

const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const [...imageBtns] = document.querySelectorAll('a');
const [...images] = document.querySelectorAll('img');
let timer = setInterval(startAutomaticScroll, 5000);

const activeImgIndex = () =>
  imageBtns.findIndex((image) => image.classList.contains('active'));

imageBtns.forEach((imageBtn) =>
  imageBtn.addEventListener('click', (e) => {
    const activeBtn = activeImgIndex();
    imageBtns[activeBtn].classList.remove('active');

    e.target.classList.add('active');

    clearInterval(timer);
    timer = setInterval(startAutomaticScroll, 5000);
  }),
);

const scrollEl = (imgIndex, position) => {
  if (
    (imgIndex === imageBtns.length - 1 && position === 'right') ||
    (imgIndex === 0 && position === 'left')
  ) {
    restartFromEnd(position);
    return;
  }

  styleActiveDot(imgIndex, position);

  position === 'right'
    ? images[imgIndex + 1].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      })
    : images[imgIndex - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });

  clearInterval(timer);
  timer = setInterval(startAutomaticScroll, 5000);
};

nextBtn.addEventListener('click', () => {
  scrollEl(activeImgIndex(), 'right');
});
prevBtn.addEventListener('click', () => {
  scrollEl(activeImgIndex(), 'left');
});

function styleActiveDot(index, position) {
  position === 'right'
    ? imageBtns[index + 1].classList.add('active')
    : imageBtns[index - 1].classList.add('active');

  imageBtns[index].classList.remove('active');
}

function restartFromEnd(position) {
  if (position === 'right') {
    images[0].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
    imageBtns[0].classList.add('active');
    imageBtns[imageBtns.length - 1].classList.remove('active');
  } else if (position === 'left') {
    images[imageBtns.length - 1].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
    imageBtns[imageBtns.length - 1].classList.add('active');
    imageBtns[0].classList.remove('active');
  }
}

function startAutomaticScroll() {
  scrollEl(activeImgIndex(), 'right');
}
