document.addEventListener("DOMContentLoaded", () => {

    const testimonials = document.querySelectorAll(".testimonial");
    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");
    const wrapper = document.querySelector(".testimonial-wrapper");

    let index = 0;
    let slideTimeout;

    function show(newIndex, direction) {
        if (direction === 0) {
            return;
        };

        const oldIndex = index;
        index = (newIndex + testimonials.length) % testimonials.length;

        const oldSlide = testimonials[oldIndex];
        const newSlide = testimonials[index];

        // Reset animation classes
        testimonials.forEach(t => {
            t.classList.remove("slide-in-left","slide-in-right",
                               "slide-out-left","slide-out-right");
        });

        // Animate old out, new in
        if (direction === 1) {
            oldSlide.classList.add("slide-out-left");
            newSlide.classList.add("slide-in-right");
        } else {
            oldSlide.classList.add("slide-out-right");
            newSlide.classList.add("slide-in-left");
        }

        newSlide.classList.add("active");
        oldSlide.classList.remove("active");

        // Schedule next slide
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => show(index + 1, 1), 5000);
    }


    function resetTimer() {
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => show(index + 1, 1), 5000);
    }

    // Arrow buttons
    nextBtn.addEventListener("click", () => show(index + 1, 1) || resetTimer());
    prevBtn.addEventListener("click", () => show(index - 1, -1) || resetTimer());

    // Pause on hover
    wrapper.addEventListener("mouseenter", () => clearTimeout(slideTimeout));
    wrapper.addEventListener("mouseleave", resetTimer);

    // Mobile swipe
    let startX = 0;
    wrapper.addEventListener("touchstart", e => startX = e.changedTouches[0].clientX);
    wrapper.addEventListener("touchend", e => {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) show(index + 1, 1);
            else show(index - 1, -1);
            resetTimer();
        }
    });

    // Start
    show(1, 1);
});
