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
  currentIndex = (currentIndex + 1) % slidesLength;

  const hideEl = slides[hide];
  const showEl = slides[show];
  hideEl.style.display = "none";
  showEl.style.display = "block";

  const styles = getComputedStyle(hideEl);

  const newRotate = styles.getPropertyValue("rotate");

  // console.log(newRotate);

  showEl.style.rotate = newRotate;

  rotate = (rotate + 60) % (60 * slidesLength);
  galleryEL.style.transform = `rotate(-${rotate}deg)`;
}, transitionTime);
