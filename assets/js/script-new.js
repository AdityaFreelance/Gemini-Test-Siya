document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function() {
            menuContainer.classList.toggle('active');
        });
    }

    // Landscope Cover Image Animation
    const landscopeSection = document.querySelector('.landscope-wrapper'); // Assuming .landscope-wrapper is the parent section
    const landscopeImages = document.querySelectorAll('.landscope-cover ul li .landscope-image img');

    if (landscopeSection && landscopeImages.length > 0) {
        // Convert NodeList to array and shuffle it
        const shuffledImages = Array.from(landscopeImages).sort(() => Math.random() - 0.5);

        let imageIndex = 0;
        let animationStarted = false; // Flag to ensure animation runs only once

        const animateImage = () => {
            if (imageIndex < shuffledImages.length) {
                const img = shuffledImages[imageIndex];
                img.style.visibility = 'visible';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                imageIndex++;
                setTimeout(animateImage, 200); // Decreased delay between images for faster animation
            }
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationStarted) {
                    // Start the animation when the section enters the viewport
                    animationStarted = true;
                    setTimeout(animateImage, 500); // Decreased initial delay for faster animation
                    observer.disconnect(); // Disconnect after triggering once
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the section is visible
        });

        observer.observe(landscopeSection);
    }

    // Home-wrapper slider
    const sliderContainer = document.querySelector(".home-cover-container");
    const sliderRow = document.querySelector(".home-cover-row");
    const slides = document.querySelectorAll(".home-cover-col");

    if (sliderRow && slides.length > 0) {
        const originalSlidesCount = slides.length;
        let clones = [];

        // Clone slides for infinite loop
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderRow.appendChild(clone);
            clones.push(clone);
        });

        let position = 0;
        const speed = 2; // Adjust speed as needed

        function animateSlider() {
            position -= speed;
            const totalWidth = originalSlidesCount * slides[0].offsetWidth;
            if (position <= -totalWidth) {
                position = 0;
            }
            sliderRow.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateSlider);
        }

        animateSlider();
    }

    // Testing Slider
    const testingSliderContainer = document.querySelector('.testing-wrapper'); // Assuming .testing-wrapper is the container for overflow:hidden
    const testingSliderRow = document.querySelector('.testing-slider-row');
    const testingOriginalCols = Array.from(document.querySelectorAll('.testing-slider-row .testing-slider-col'));
    const testingSliderDotsContainer = document.querySelector('.testing-slider-dots');

    if (testingSliderRow && testingOriginalCols.length > 0 && testingSliderDotsContainer) {
        const originalSlideCount = testingOriginalCols.length;
        const slidesToClone = originalSlideCount; // Clone all original slides for seamless loop

        // Clone last few slides and prepend them
        for (let i = 0; i < slidesToClone; i++) {
            const clone = testingOriginalCols[originalSlideCount - 1 - i].cloneNode(true);
            testingSliderRow.prepend(clone);
        }

        // Clone first few slides and append them
        for (let i = 0; i < slidesToClone; i++) {
            const clone = testingOriginalCols[i].cloneNode(true);
            testingSliderRow.appendChild(clone);
        }

        const allTestingSlides = Array.from(document.querySelectorAll('.testing-slider-row .testing-slider-col'));
        const totalSlidesWithClones = allTestingSlides.length;

        let testingCurrentIndex = slidesToClone; // Start at the first original slide

        // Set initial width for the slider row and individual slides
        testingSliderRow.style.width = `${totalSlidesWithClones * 100}%`;
        allTestingSlides.forEach(col => {
            col.style.width = `${100 / totalSlidesWithClones}%`;
        });

        // Create dots
        for (let i = 0; i < originalSlideCount; i++) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.addEventListener('click', () => {
                testingCurrentIndex = slidesToClone + i; // Go to the corresponding original slide
                updateTestingSlider(true); // true for smooth transition
                updateTestingDots();
            });
            li.appendChild(button);
            testingSliderDotsContainer.appendChild(li);
        }

        const testingDots = testingSliderDotsContainer.querySelectorAll('button');

        function updateTestingSlider(smooth = true) {
            testingSliderRow.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
            testingSliderRow.style.transform = `translateX(-${testingCurrentIndex * (100 / totalSlidesWithClones)}%)`;
        }

        function updateTestingDots() {
            const activeDotIndex = (testingCurrentIndex - slidesToClone) % originalSlideCount;
            testingDots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextTestingSlide() {
            testingCurrentIndex++;
            updateTestingSlider();
            updateTestingDots();

            if (testingCurrentIndex >= originalSlideCount + slidesToClone) {
                setTimeout(() => {
                    testingCurrentIndex = slidesToClone; // Jump to the first original slide
                    updateTestingSlider(false); // false for instant jump
                }, 500); // Match this with CSS transition duration
            }
        }

        // Initial setup
        updateTestingSlider(false); // Set initial position instantly
        updateTestingDots();

        setInterval(nextTestingSlide, 3000);
    }
});