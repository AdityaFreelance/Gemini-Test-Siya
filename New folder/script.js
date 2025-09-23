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

    // Hero section is now completely fixed - no parallax effect needed

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

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
