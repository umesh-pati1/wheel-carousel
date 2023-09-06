// it will work if slideslength >=6

// minimum slides 4 , not working

const container = document.querySelector(".container");

const maskEl = document.querySelector(".mask");

const galleryEL = container.querySelector(".gallery");
const slides = galleryEL.querySelectorAll(".slide");

const transitionTime = 2000;
const slidesLength = slides.length;
const autoplay = true;

var interval;
var mylatesttap;
var currentIndex = 0;
var rotate = 0;

createDot();
const dots = document.getElementsByClassName("dot");

console.assert(slides.length === dots.length, "length mismatch");

dots[currentIndex].classList.add("active");
container.style.setProperty("--t", `${transitionTime}ms`);

autoplayFn();

for (let i = 0; i < dots.length; i++) {
  let item = dots[i];
  item.addEventListener("click", dotClick);
}

maskEl.addEventListener("click", (e) => {
  const { top, left, width, height } = e.target.getBoundingClientRect();

  const x = e.clientX - left; //x position within the element.
  // const y = e.clientY - top; //y position within the element.

  if (x < width / 4) prev();
  else if (x > (3 * width) / 4) next();
});

function autoplayFn() {
  if (autoplay == true)
    interval = setInterval(() => {
      next();
    }, transitionTime);
}

function createDot() {
  const dotsContainer = document.querySelector(".dots");
  let html = "";
  for (let i = 0; i < slidesLength; i++) {
    html = html + `<li class="dot"></li>`;
  }
  dotsContainer.innerHTML = html;
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

  if (slidesLength >= 6) {
    dummyEl.style.display = "block";

    dummyEl.style.rotate = parseInt(newRotate) + 60 + "deg";

    nextEl.style.display = "none";
  } else if (slidesLength === 5) {
    dummyEl.style.rotate = parseInt(newRotate) + 60 + "deg";
  } else if (slidesLength == 4) {
    console.log(prevEl);
    // const dummy = (currentIndex + 2) % slidesLength;
    // const dummyEl = slides[dummy];
    prevEl.style.rotate = parseInt(newRotate) - 120 + "deg";
  }

  currentIndex = (currentIndex + 1) % slidesLength;

  const activeDot = document.querySelector(".dot.active");

  activeDot.classList.remove("active");

  console.log(currentIndex);

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

  if (slidesLength >= 6) {
    dummyEl.style.display = "block";

    dummyEl.style.rotate = parseInt(newRotate) - 60 + "deg";

    nextEl.style.display = "none";
  } else if (slidesLength === 5) {
    dummyEl.style.rotate = parseInt(newRotate) - 60 + "deg";
  } else {
    dummyEl.style.rotate = parseInt(newRotate) - 120 + "deg";
  }

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
