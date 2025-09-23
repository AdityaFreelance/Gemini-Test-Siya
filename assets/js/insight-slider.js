window.onload = function() {
    const slider = document.querySelector('.main-insight-slider ul');
    const slides = document.querySelectorAll('.main-insight-slider ul li');
    if (slides.length <= 2) return; // Not enough slides to loop

    const slideHeight = slides[0].clientHeight;
    let slideIndex = 0;

    // Set container height for two slides
    const sliderContainer = document.querySelector('.main-insight-slider');
    sliderContainer.style.height = `${slideHeight * 2}px`;
    
    // Adjust individual slide li height to be sure
    slides.forEach(s => s.style.height = `${slideHeight}px`);


    // Clone all slides and append them to the end
    slides.forEach(slide => {
        slider.appendChild(slide.cloneNode(true));
    });

    function nextSlide() {
        slideIndex++;
        slider.style.transition = "transform 1s linear";
        slider.style.transform = `translateY(-${slideHeight * slideIndex}px)`;

        // If the slider has moved past the original number of slides, reset it.
        if (slideIndex >= slides.length) {
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = 'translateY(0)';
                slideIndex = 0;
            }, 1000); // This should match the transition duration
        }
    }

    setInterval(nextSlide, 2000); // Interval should be longer than transition
};