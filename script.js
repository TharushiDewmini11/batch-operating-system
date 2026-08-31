/* ==========================================
   BATCHFLOW PRESENTATION CONTROLLER
========================================== */


/* ==========================================
   DOM ELEMENTS
========================================== */

const slides =
    document.querySelectorAll(".slide");


const previousButton =
    document.getElementById("prev");


const nextButton =
    document.getElementById("next");


const fullscreenButton =
    document.getElementById("fullscreen");


const downloadPDFButton =
    document.getElementById("downloadPDF");


const currentSlideDisplay =
    document.getElementById("current-slide");


const totalSlidesDisplay =
    document.getElementById("total-slides");


const progressBar =
    document.getElementById("progress-bar");


/* ==========================================
   PRESENTATION VARIABLES
========================================== */

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
        Go to last slide if
        index is below zero.
    */

    if (index < 0) {

        index =
            totalSlides - 1;

    }


    /*
        Go to first slide if
        index is too large.
    */

    if (index >= totalSlides) {

        index = 0;

    }


    /*
        Remove active class
        from every slide.
    */

    slides.forEach(
        function (slide) {

            slide.classList.remove(
                "active"
            );

        }
    );


    /*
        Activate selected slide.
    */

    slides[index].classList.add(
        "active"
    );


    /*
        Update current slide.
    */

    currentSlide =
        index;


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
        Update browser title.
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
            NEXT
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
            PREVIOUS
        */

        if (

            event.key === "ArrowLeft" ||

            event.key === "PageUp"

        ) {

            event.preventDefault();

            previousSlide();

        }


        /*
            FIRST SLIDE
        */

        if (
            event.key === "Home"
        ) {

            showSlide(0);

        }


        /*
            LAST SLIDE
        */

        if (
            event.key === "End"
        ) {

            showSlide(
                totalSlides - 1
            );

        }


        /*
            FULLSCREEN
            F KEY
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


    /*
        Enter fullscreen.
    */

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


    }


    /*
        Exit fullscreen.
    */

    else {


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
   TOUCH SWIPE
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


        /*
            Swipe left
            = next slide
        */

        if (
            difference < -60
        ) {

            nextSlide();

        }


        /*
            Swipe right
            = previous slide
        */

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
   PDF BUTTON
========================================== */

if (downloadPDFButton) {

    downloadPDFButton.addEventListener(
        "click",
        downloadAllSlidesAsPDF
    );

}


/* ==========================================
   PDF EXPORT
========================================== */

async function downloadAllSlidesAsPDF() {


    /* --------------------------------------
       CHECK html2canvas
    -------------------------------------- */

    if (
        typeof html2canvas === "undefined"
    ) {

        alert(
            "PDF system could not load html2canvas."
        );

        return;

    }


    /* --------------------------------------
       CHECK jsPDF
    -------------------------------------- */

    if (
        typeof window.jspdf === "undefined"
    ) {

        alert(
            "PDF system could not load jsPDF."
        );

        return;

    }


    /* --------------------------------------
       CHECK SLIDES
    -------------------------------------- */

    if (
        !slides.length
    ) {

        alert(
            "No presentation slides found."
        );

        return;

    }


    /* --------------------------------------
       SAVE CURRENT SLIDE
    -------------------------------------- */

    const savedSlide =
        currentSlide;


    /* --------------------------------------
       GET NAVIGATION
    -------------------------------------- */

    const navigation =
        document.querySelector(
            ".navigation"
        );


    /* --------------------------------------
       PDF SIZE
       16:9
    -------------------------------------- */

    const PDF_WIDTH =
        1280;


    const PDF_HEIGHT =
        720;


    /* --------------------------------------
       DISABLE BUTTON
    -------------------------------------- */

    if (downloadPDFButton) {

        downloadPDFButton.disabled =
            true;

        downloadPDFButton.innerText =
            "0/" + totalSlides;

    }


    try {


        /* ----------------------------------
           CREATE jsPDF
        ---------------------------------- */

        const {
            jsPDF
        } = window.jspdf;


        const pdf =
            new jsPDF({

                orientation:
                    "landscape",

                unit:
                    "px",

                format:
                    [
                        PDF_WIDTH,
                        PDF_HEIGHT
                    ],

                compress:
                    true

            });


        /* ----------------------------------
           HIDE NAVIGATION
        ---------------------------------- */

        if (navigation) {

            navigation.style.display =
                "none";

        }


        /* ----------------------------------
           PROCESS ALL SLIDES
        ---------------------------------- */

        for (
            let i = 0;
            i < slides.length;
            i++
        ) {


            const slide =
                slides[i];


            /* ------------------------------
               SHOW CURRENT SLIDE
            ------------------------------ */

            slides.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            slide.classList.add(
                "active"
            );


            /* ------------------------------
               ADD PDF CAPTURE CLASS
            ------------------------------ */

            slide.classList.add(
                "pdf-capture"
            );


            /* ------------------------------
               SAVE CURRENT INLINE STYLES
            ------------------------------ */

            const oldStyles = {

                width:
                    slide.style.width,

                height:
                    slide.style.height,

                minWidth:
                    slide.style.minWidth,

                minHeight:
                    slide.style.minHeight,

                maxWidth:
                    slide.style.maxWidth,

                maxHeight:
                    slide.style.maxHeight,

                position:
                    slide.style.position,

                top:
                    slide.style.top,

                left:
                    slide.style.left,

                transform:
                    slide.style.transform,

                margin:
                    slide.style.margin

            };


            /* ------------------------------
               FORCE EXACT PDF SIZE
            ------------------------------ */

            slide.style.width =
                PDF_WIDTH + "px";


            slide.style.height =
                PDF_HEIGHT + "px";


            slide.style.minWidth =
                PDF_WIDTH + "px";


            slide.style.minHeight =
                PDF_HEIGHT + "px";


            slide.style.maxWidth =
                PDF_WIDTH + "px";


            slide.style.maxHeight =
                PDF_HEIGHT + "px";


            slide.style.position =
                "relative";


            slide.style.top =
                "0";


            slide.style.left =
                "0";


            slide.style.transform =
                "none";


            slide.style.margin =
                "0";


            /* ------------------------------
               WAIT FOR RENDERING
            ------------------------------ */

            await wait(700);


            /* ------------------------------
               CAPTURE
            ------------------------------ */

            const canvas =
                await html2canvas(
                    slide,
                    {

                        scale:
                            2,

                        width:
                            PDF_WIDTH,

                        height:
                            PDF_HEIGHT,

                        windowWidth:
                            PDF_WIDTH,

                        windowHeight:
                            PDF_HEIGHT,

                        x:
                            0,

                        y:
                            0,

                        scrollX:
                            0,

                        scrollY:
                            0,

                        useCORS:
                            true,

                        allowTaint:
                            true,

                        backgroundColor:
                            "#080b10",

                        imageTimeout:
                            20000,

                        logging:
                            false

                    }
                );


            /* ------------------------------
               RESTORE INLINE STYLES
            ------------------------------ */

            slide.style.width =
                oldStyles.width;


            slide.style.height =
                oldStyles.height;


            slide.style.minWidth =
                oldStyles.minWidth;


            slide.style.minHeight =
                oldStyles.minHeight;


            slide.style.maxWidth =
                oldStyles.maxWidth;


            slide.style.maxHeight =
                oldStyles.maxHeight;


            slide.style.position =
                oldStyles.position;


            slide.style.top =
                oldStyles.top;


            slide.style.left =
                oldStyles.left;


            slide.style.transform =
                oldStyles.transform;


            slide.style.margin =
                oldStyles.margin;


            slide.classList.remove(
                "pdf-capture"
            );


            /* ------------------------------
               CONVERT TO IMAGE
            ------------------------------ */

            const imageData =
                canvas.toDataURL(
                    "image/jpeg",
                    0.98
                );


            /* ------------------------------
               ADD PAGE
            ------------------------------ */

            if (i > 0) {

                pdf.addPage(
                    [
                        PDF_WIDTH,
                        PDF_HEIGHT
                    ],
                    "landscape"
                );

            }


            /* ------------------------------
               ADD IMAGE
            ------------------------------ */

            pdf.addImage(

                imageData,

                "JPEG",

                0,

                0,

                PDF_WIDTH,

                PDF_HEIGHT,

                undefined,

                "FAST"

            );


            /* ------------------------------
               UPDATE BUTTON
            ------------------------------ */

            if (downloadPDFButton) {

                downloadPDFButton.innerText =
                    (i + 1) +
                    "/" +
                    totalSlides;

            }

        }


        /* ----------------------------------
           DOWNLOAD PDF
        ---------------------------------- */

        pdf.save(
            "Batch-Operating-Systems-Group-37.pdf"
        );


        /* ----------------------------------
           RESTORE NAVIGATION
        ---------------------------------- */

        if (navigation) {

            navigation.style.display =
                "";

        }


        /* ----------------------------------
           RESTORE SLIDE
        ---------------------------------- */

        showSlide(
            savedSlide
        );


        /* ----------------------------------
           RESET BUTTON
        ---------------------------------- */

        if (downloadPDFButton) {

            downloadPDFButton.innerText =
                "PDF";

        }


    }


    catch (error) {


        /* ----------------------------------
           LOG ERROR
        ---------------------------------- */

        console.error(
            "PDF generation error:",
            error
        );


        /* ----------------------------------
           SHOW ERROR
        ---------------------------------- */

        alert(
            "PDF generation failed. Please refresh the page and try again."
        );


        /* ----------------------------------
           RESTORE NAVIGATION
        ---------------------------------- */

        if (navigation) {

            navigation.style.display =
                "";

        }


        /* ----------------------------------
           RESTORE SLIDE
        ---------------------------------- */

        slides.forEach(
            function (slide) {

                slide.classList.remove(
                    "pdf-capture"
                );

            }
        );


        showSlide(
            savedSlide
        );


        /* ----------------------------------
           RESET BUTTON
        ---------------------------------- */

        if (downloadPDFButton) {

            downloadPDFButton.innerText =
                "PDF";

        }

    }


    /* --------------------------------------
       ENABLE BUTTON
    -------------------------------------- */

    if (downloadPDFButton) {

        downloadPDFButton.disabled =
            false;

    }

}


/* ==========================================
   WAIT FUNCTION
========================================== */

function wait(milliseconds) {

    return new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );

}


/* ==========================================
   START PRESENTATION
========================================== */

showSlide(0);
