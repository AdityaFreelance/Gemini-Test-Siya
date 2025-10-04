// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Handle different navigation targets
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (targetId === '#about') {
                const aboutSection = document.querySelector('.about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else if (targetId === '#projects') {
                const projectsSection = document.querySelector('.projects');
                if (projectsSection) {
                    projectsSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Hero section project preview interactions with image cycling
    const hoverAreas = document.querySelectorAll('.hover-area');
    const projectPreviews = document.querySelectorAll('.project-preview');
    let currentIntervals = {};
    
    // Individual image mappings - each hover area shows one specific image
    const projectImages = {
        'setu-1': 'preview-setu-1',      // angel and devil 1.png
        'setu-2': 'preview-setu-2',      // Setu 1.png
        'setu-3': 'preview-setu-3',      // setu.png
        'loop-1': 'preview-loop-1',      // final rendering.37 1.png
        'loop-2': 'preview-loop-2',      // Loop 2.png
        'loop-3': 'preview-loop-3',      // loop.png
        'porsche-1': 'preview-porsche-1', // IMG_1955 1.png
        'porsche-2': 'preview-porsche-2', // PorscheClinetBookSpread (1) 2.png
        'lowes-1': 'preview-lowes-1',    // inside out 1.png
        'design-1': 'preview-design-1',  // kera.png
        'design-2': 'preview-design-2',  // Rectangle 4670.png
        'design-3': 'preview-design-3',  // Rectangle 4672.png
        'design-4': 'preview-design-4',  // rendered packaging.79 1.png
        'design-5': 'preview-design-5',  // shaped 1.png
        'design-6': 'preview-design-6',  // Trapped 1.png
        'design-7': 'preview-design-7'   // Untitled_Artwork 1 1.png
    };
    
    hoverAreas.forEach(area => {
        area.addEventListener('mouseenter', function(e) {
            const projectName = this.getAttribute('data-project');
            const imageId = projectImages[projectName];
            
            // Hide all previews first
            projectPreviews.forEach(p => p.classList.remove('show'));
            
            // Show the corresponding image at cursor position
            if (imageId) {
                const image = document.getElementById(imageId);
                if (image) {
                    // Get mouse position relative to the hero section
                    const heroRect = document.querySelector('.hero').getBoundingClientRect();
                    const mouseX = e.clientX - heroRect.left;
                    const mouseY = e.clientY - heroRect.top;
                    
                    // Position image at mouse cursor once
                    image.style.left = mouseX + 'px';
                    image.style.top = mouseY + 'px';
                    image.classList.add('show');
                }
            }
        });
        
        area.addEventListener('mouseleave', function() {
            const projectName = this.getAttribute('data-project');
            const imageId = projectImages[projectName];
            
            // Hide the image
            if (imageId) {
                const image = document.getElementById(imageId);
                if (image) {
                    image.classList.remove('show');
                }
            }
        });
    });
    
    // Also hide previews when mouse leaves the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseleave', function() {
            projectPreviews.forEach(p => p.classList.remove('show'));
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project sections for animations
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(50px)';
        project.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(project);
    });

    // Observe about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        aboutSection.style.opacity = '0';
        aboutSection.style.transform = 'translateY(30px)';
        aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(aboutSection);
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('class');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (current === 'hero' && link.getAttribute('href') === '#home') {
                link.classList.add('active');
            } else if (current === 'about' && link.getAttribute('href') === '#about') {
                link.classList.add('active');
            } else if (current.includes('project') && link.getAttribute('href') === '#projects') {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.color = '#ffffff';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.cursor = 'pointer';
        
        navContainer.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
        });
        
        // Show/hide mobile menu button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navMenu.classList.add('mobile-menu');
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.classList.remove('mobile-menu', 'mobile-active');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileMenu();

    // Preload images for better performance
    const preloadImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const imageUrl = img.src;
            const preloadImg = new Image();
            preloadImg.src = imageUrl;
        });
    };
    
    preloadImages();

    // Resume accordion functionality
    const initResumeAccordions = () => {
        const expandButtons = document.querySelectorAll('.resume-expand-btn');
        
        expandButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                if (targetId) {
                    const content = document.getElementById(targetId);
                    
                    if (content) {
                        // Toggle expanded class on content
                        content.classList.toggle('expanded');
                        
                        // Toggle expanded class on button for rotation
                        this.classList.toggle('expanded');
                        
                        // Close other accordions in the same section
                        const currentSection = this.closest('.resume-section');
                        const otherButtons = currentSection.querySelectorAll('.resume-expand-btn');
                        const otherContents = currentSection.querySelectorAll('.resume-item-content');
                        
                        otherButtons.forEach(otherButton => {
                            if (otherButton !== this) {
                                otherButton.classList.remove('expanded');
                            }
                        });
                        
                        otherContents.forEach(otherContent => {
                            if (otherContent !== content) {
                                otherContent.classList.remove('expanded');
                            }
                        });
                    }
                }
            });
        });
    };
    
    // Initialize accordion functionality if on resume page
    if (document.querySelector('.resume-main')) {
        initResumeAccordions();
    }
});

// Add CSS for active nav link and mobile menu
const additionalStyles = `
    .nav-link.active {
        color: #ff6b35 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    @media (max-width: 768px) {
        .mobile-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 250px;
            height: calc(100vh - 70px);
            background-color: rgba(26, 26, 26, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .mobile-menu.mobile-active {
            right: 0;
        }
        
        .mobile-menu .nav-link {
            padding: 1rem 0;
            font-size: 1.1rem;
        }
    }
`;



