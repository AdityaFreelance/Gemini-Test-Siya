document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContainer = document.querySelector('.menu-container');

    if (menuToggle && menuContainer) {
        menuToggle.addEventListener('click', function() {
            menuContainer.classList.toggle('active');
        });
    }
});