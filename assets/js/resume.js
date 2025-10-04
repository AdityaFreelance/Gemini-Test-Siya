$(document).ready(function() {
    $('.work-experience-accordion-button').on('click', function() {
        // The accordion content is the next element sibling
        var content = $(this).next('.work-experience-box-content');

        // Close all other accordions
        $('.work-experience-box-content').not(content).slideUp();
        $('.work-experience-accordion-button').not(this).removeClass('active');

        // Toggle the clicked accordion
        content.slideToggle();
        $(this).toggleClass('active');
    });
});
