document.addEventListener("DOMContentLoaded", () => {

    const testimonials = document.querySelectorAll(".testimonial");
    const nextBtn = document.querySelector(".arrow.right");
    const prevBtn = document.querySelector(".arrow.left");
    const wrapper = document.querySelector(".testimonial-wrapper");

    let index = 0;
    let slideTimeout;

    function show(newIndex, direction) {
        // ahghhhhhhh
        // bug where when changing movment directions have to click twice 
        // otherwise workes fine
        //oh and shows nothing on start
        const oldIndex = index;
        index = (newIndex + testimonials.length) % testimonials.length;

        const oldTestemonial = testimonials[oldIndex]
        const newTestemonial = testimonials[index]

        testimonials.forEach(t => {
            t.classList.remove("slide-out-left", "slide-out-right");
        });

        if (direction === 1) {
            newTestemonial.classList.add("slide-out-right");
            oldTestemonial.classList.add("slide-out-left");
        } else {
            newTestemonial.classList.add("slide-out-left");
            oldTestemonial.classList.add("slide-out-right");          
        }

        newTestemonial.classList.add("active");

        // schedule next slide
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => show(index + 1, 1), 10000);
    }

    function resetTimer() {
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => show(index + 1, 1), 10000);
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
    show(0);
});
