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
});