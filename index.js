// it will work if slideslength >=6

// minimum slides 4 , not working

const container = document.querySelector(".container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const maskEl = document.querySelector(".mask");

const galleryEL = container.querySelector(".gallery");
const slides = galleryEL.querySelectorAll(".slide");

const dots = document.querySelectorAll(".dot");
var interval;

dots.forEach((dot) => {
  dot.addEventListener("click", dotClick);
});

const transitionTime = 2000;
const slidesLength = slides.length;
const autoplay = true;

var mylatesttap;

console.assert(slides.length === dots.length, "length mismatch");
let currentIndex = 0;
let rotate = 0;

dots[currentIndex].classList.add("active");

container.style.setProperty("--t", `${transitionTime}ms`);

function next() {
  clearInterval(interval);
  console.log("hi");
  const prev = (currentIndex + 2) % slidesLength;
  const next = (currentIndex - 2 + slidesLength) % slidesLength;
  const dummy = (currentIndex + 3) % slidesLength;

  const dummyEl = slides[dummy];
  const prevEl = slides[prev];
  const nextEl = slides[next];

  const prevElStyles = getComputedStyle(prevEl);
  const newRotate = prevElStyles.getPropertyValue("rotate");

  dummyEl.style.display = "block";

  dummyEl.style.rotate = parseInt(newRotate) + 60 + "deg";

  nextEl.style.display = "none";

  currentIndex = (currentIndex + 1) % slidesLength;

  const activeDot = document.querySelector(".dot.active");

  activeDot.classList.remove("active");

  // currentIndex = index;
  dots[currentIndex].classList.add("active");

  rotate = rotate - 60;
  galleryEL.style.transform = `rotate(${rotate}deg)`;

  autoplayFn();
}

function prev() {
  clearInterval(interval);

  const prev = (currentIndex - 2 + slidesLength) % slidesLength;
  const next = (currentIndex + 2) % slidesLength;
  const dummy = (currentIndex - 3 + slidesLength) % slidesLength;

  const dummyEl = slides[dummy];
  const prevEl = slides[prev];
  const nextEl = slides[next];

  const prevElStyles = getComputedStyle(prevEl);
  const newRotate = prevElStyles.getPropertyValue("rotate");

  dummyEl.style.display = "block";

  dummyEl.style.rotate = parseInt(newRotate) - 60 + "deg";

  nextEl.style.display = "none";

  currentIndex = (currentIndex - 1 + slidesLength) % slidesLength;

  const activeDot = document.querySelector(".dot.active");

  activeDot.classList.remove("active");

  // currentIndex = index;
  dots[currentIndex].classList.add("active");

  rotate = rotate + 60;

  // galleryEL.style. = `${rotate}deg`;
  galleryEL.style.transform = `rotate(${rotate}deg)`;

  console.log("gallery", galleryEL);

  autoplayFn();
}

console.log(nextBtn);
prevBtn.addEventListener("click", () => {
  tap(prev);
});
nextBtn.addEventListener("click", () => {
  tap(next);
});

function autoplayFn() {
  if (autoplay == true)
    interval = setInterval(() => {
      next();
    }, transitionTime);
}

autoplayFn();
function tap(fn) {
  var now = new Date().getTime();
  var timesince = now - mylatesttap;

  if (isNaN(timesince) || timesince > transitionTime) {
    fn();
    mylatesttap = new Date().getTime();
  } else {
    console.log("clicked quikly");
  }
}

function dotClick(event) {
  const activeDot = document.querySelector(".dot.active");

  const index = Array.from(dots).indexOf(event.target);

  const prevIndex = Array.from(dots).indexOf(activeDot);

  activeDot.classList.remove("active");

  // currentIndex = index;
  dots[index].classList.add("active");

  if (index > prevIndex) {
    let count = index - prevIndex;

    if (count > 2) {
      container.style.setProperty("--t", `${100}ms`);
    }
    for (let i = 0; i < count; i++) {
      next();
    }
  } else {
    let count = prevIndex - index;

    if (count > 2) {
      container.style.setProperty("--t", `${100}ms`);
    }
    for (let i = 0; i < count; i++) {
      prev();
    }
  }
  setTimeout(() => {
    container.style.setProperty("--t", `${transitionTime}ms`);
  }, 50);
}

maskEl.addEventListener("click", (e) => {
  const { top, left, width, height } = e.target.getBoundingClientRect();

  const x = e.clientX - left; //x position within the element.
  // const y = e.clientY - top; //y position within the element.

  if (x < width / 4) prev();
  else if (x > (3 * width) / 4) next();
});
