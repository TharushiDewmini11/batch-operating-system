const slides = document.querySelectorAll(".slide");

const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const fullscreenButton = document.getElementById("fullscreen");
const counter = document.getElementById("counter");

let currentSlide = 0;


function showSlide(index) {

    if (index < 0) {
        index = slides.length - 1;
    }

    if (index >= slides.length) {
        index = 0;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

    currentSlide = index;

    counter.textContent =
        `${currentSlide + 1} / ${slides.length}`;
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function previousSlide() {
    showSlide(currentSlide - 1);
}


nextButton.addEventListener("click", nextSlide);

prevButton.addEventListener("click", previousSlide);


document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowRight" ||
        event.key === " " ||
        event.key === "PageDown"
    ) {
        event.preventDefault();
        nextSlide();
    }

    if (
        event.key === "ArrowLeft" ||
        event.key === "PageUp"
    ) {
        event.preventDefault();
        previousSlide();
    }

    if (event.key === "Home") {
        showSlide(0);
    }

    if (event.key === "End") {
        showSlide(slides.length - 1);
    }

});


fullscreenButton.addEventListener("click", function() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

});


showSlide(0);
