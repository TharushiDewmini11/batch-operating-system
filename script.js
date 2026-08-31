/* ==========================================
   BATCHFLOW PRESENTATION CONTROLLER
========================================== */


const slides =
    document.querySelectorAll(".slide");


const previousButton =
    document.getElementById("prev");


const nextButton =
    document.getElementById("next");


const fullscreenButton =
    document.getElementById("fullscreen");


const printButton =
    document.getElementById("print-pdf");


const currentSlideDisplay =
    document.getElementById("current-slide");


const totalSlidesDisplay =
    document.getElementById("total-slides");


const progressBar =
    document.getElementById("progress-bar");


let currentSlide = 0;


const totalSlides =
    slides.length;


/* ==========================================
   INITIAL SETUP
========================================== */

totalSlidesDisplay.textContent =
    String(totalSlides).padStart(2, "0");


/* ==========================================
   SHOW SLIDE
========================================== */

function showSlide(index) {

    if (index < 0) {

        index =
            totalSlides - 1;

    }


    if (index >= totalSlides) {

        index = 0;

    }


    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    slides[index].classList.add("active");


    currentSlide = index;


    currentSlideDisplay.textContent =
        String(currentSlide + 1)
            .padStart(2, "0");


    const progress =
        ((currentSlide + 1) / totalSlides) * 100;


    progressBar.style.width =
        progress + "%";


    document.title =
        `Slide ${currentSlide + 1} / ${totalSlides} | Batch Operating Systems`;

}


/* ==========================================
   NEXT
========================================== */

function nextSlide() {

    showSlide(
        currentSlide + 1
    );

}


/* ==========================================
   PREVIOUS
========================================== */

function previousSlide() {

    showSlide(
        currentSlide - 1
    );

}


/* ==========================================
   BUTTON EVENTS
========================================== */

nextButton.addEventListener(
    "click",
    nextSlide
);


previousButton.addEventListener(
    "click",
    previousSlide
);


/* ==========================================
   KEYBOARD NAVIGATION
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

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


        if (
            event.key === "Home"
        ) {

            event.preventDefault();

            showSlide(0);

        }


        if (
            event.key === "End"
        ) {

            event.preventDefault();

            showSlide(
                totalSlides - 1
            );

        }


        if (
            event.key.toLowerCase() === "f"
        ) {

            toggleFullscreen();

        }


        /*
            Press P to print / save PDF
        */

        if (
            event.key.toLowerCase() === "p"
        ) {

            event.preventDefault();

            printPresentation();

        }

    }
);


/* ==========================================
   FULLSCREEN
========================================== */

fullscreenButton.addEventListener(
    "click",
    toggleFullscreen
);


function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement
            .requestFullscreen()
            .catch(
                function (error) {

                    console.log(
                        "Fullscreen error:",
                        error
                    );

                }
            );

    } else {

        document
            .exitFullscreen()
            .catch(
                function (error) {

                    console.log(
                        "Exit fullscreen error:",
                        error
                    );

                }
            );

    }

}


/* ==========================================
   PRINT / SAVE PDF
========================================== */

if (printButton) {

    printButton.addEventListener(
        "click",
        printPresentation
    );

}


function printPresentation() {

    /*
        Give the browser a small moment to
        apply the print stylesheet.
    */

    document.body.classList.add(
        "printing"
    );


    setTimeout(
        function () {

            window.print();

        },
        100
    );

}


/*
    Remove printing state after printing.
*/

window.addEventListener(
    "afterprint",
    function () {

        document.body.classList.remove(
            "printing"
        );

    }
);


/* ==========================================
   TOUCH SWIPE SUPPORT
========================================== */

let touchStartX = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        const touchEndX =
            event.changedTouches[0]
                .screenX;


        const difference =
            touchEndX - touchStartX;


        if (
            difference < -60
        ) {

            nextSlide();

        }


        if (
            difference > 60
        ) {

            previousSlide();

        }

    },
    {
        passive: true
    }
);


/* ==========================================
   INITIALIZE
========================================== */

showSlide(0);
