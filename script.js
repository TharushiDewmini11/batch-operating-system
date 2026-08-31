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


    /*
        Loop back to the last slide
        if the user goes before slide 1.
    */

    if (index < 0) {

        index =
            totalSlides - 1;

    }


    /*
        Return to slide 1
        after the final slide.
    */

    if (index >= totalSlides) {

        index = 0;

    }


    /*
        Remove active class
        from every slide.
    */

    slides.forEach(function (slide) {

        slide.classList.remove("active");

    });


    /*
        Activate selected slide.
    */

    slides[index].classList.add("active");


    /*
        Update current slide number.
    */

    currentSlide = index;


    /*
        Update navigation number.
    */

    currentSlideDisplay.textContent =
        String(currentSlide + 1)
            .padStart(2, "0");


    /*
        Calculate progress.
    */

    const progress =
        ((currentSlide + 1) / totalSlides) * 100;


    /*
        Update progress bar.
    */

    progressBar.style.width =
        progress + "%";


    /*
        Update page title.
    */

    document.title =
        `Slide ${currentSlide + 1} / ${totalSlides} | Batch Operating Systems`;

}


/* ==========================================
   NEXT SLIDE
========================================== */


function nextSlide() {

    showSlide(
        currentSlide + 1
    );

}


/* ==========================================
   PREVIOUS SLIDE
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


        /*
            Next slide controls.
        */

        if (

            event.key === "ArrowRight" ||

            event.key === " " ||

            event.key === "PageDown"

        ) {

            event.preventDefault();

            nextSlide();

        }


        /*
            Previous slide controls.
        */

        if (

            event.key === "ArrowLeft" ||

            event.key === "PageUp"

        ) {

            event.preventDefault();

            previousSlide();

        }


        /*
            Go to first slide.
        */

        if (
            event.key === "Home"
        ) {

            showSlide(0);

        }


        /*
            Go to final slide.
        */

        if (
            event.key === "End"
        ) {

            showSlide(
                totalSlides - 1
            );

        }


        /*
            Toggle fullscreen
            with F key.
        */

        if (
            event.key.toLowerCase() === "f"
        ) {

            toggleFullscreen();

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


    if (
        !document.fullscreenElement
    ) {


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
   TOUCH SWIPE SUPPORT
========================================== */


let touchStartX = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0]
                .screenX;

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


        /*
            Swipe left:
            Next slide
        */

        if (
            difference < -60
        ) {

            nextSlide();

        }


        /*
            Swipe right:
            Previous slide
        */

        if (
            difference > 60
        ) {

            previousSlide();

        }


    }
);


/* ==========================================
   START PRESENTATION
========================================== */


showSlide(0);
