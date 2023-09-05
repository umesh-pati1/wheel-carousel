// it will work if slideslength >=6

// minimum slides 4 , not working

const container = document.querySelector(".container");

const galleryEL = container.querySelector(".gallery");
const slides = galleryEL.querySelectorAll(".slide");

const transitionTime = 3000;
const slidesLength = slides.length;

let rotate = 0;
let currentIndex = 2;

container.style.setProperty("--t", `${transitionTime}ms`);

setInterval(() => {
  hide = (currentIndex - 2 + slidesLength) % slidesLength;
  show = (currentIndex + 4) % slidesLength;

  const hideEl = slides[hide];
  const showEl = slides[show];
  const styles = getComputedStyle(hideEl);
  const newRotate = styles.getPropertyValue("rotate");

  if (slides.length >= 6) {
    hideEl.style.display = "none";
    showEl.style.display = "block";
    showEl.style.rotate = newRotate;
  } else if (slides.length === 4) {
    hideEl.style.rotate = parseInt(newRotate) - 120 + "deg";
  } else if (slides.length === 5) {
    hideEl.style.rotate = parseInt(newRotate) - 60 + "deg";
  }

  currentIndex = (currentIndex + 1) % slidesLength;
  rotate = rotate + 60;
  galleryEL.style.transform = `rotate(-${rotate}deg)`;

  // if your gallery is in view then only start the animation , otherwise reset to initial state
}, transitionTime);
