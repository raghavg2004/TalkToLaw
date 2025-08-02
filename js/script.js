document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading delay
    setTimeout(function() {
        document.querySelector('.studio-loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.studio-loader').style.display = 'none';
            document.querySelector('.studio-main').style.display = 'block';
            
            // Initialize components
            initStudioNavbar();
            initStudioTestimonials();
            initStudioThemeToggle();
            initStudioAnimations();
            initStudioSmoothScroll();
        }, 300);
    }, 1500);
});

// Initialize navbar functionality
function initStudioNavbar() {
    const navbar = document.querySelector('.studio-nav');
    const toggle = document.querySelector('.studio-nav-toggle');
    const navLinks = document.querySelector('.studio-nav-links');
    
    // Toggle mobile menu
    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.studio-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize testimonials slider
function initStudioTestimonials() {
    const slider = document.querySelector('.studio-testimonials-slider');
    const dotsContainer = document.querySelector('.studio-slider-dots');
    const prevBtn = document.querySelector('.studio-slider-prev');
    const nextBtn = document.querySelector('.studio-slider-next');
    const testimonials = document.querySelectorAll('.studio-testimonial-card');
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('studio-slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    let currentSlide = 0;
    const maxSlide = testimonials.length - 1;
    
    // Go to specific slide
    function goToSlide(slide) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.transform = `translateX(${100 * (index - slide)}%)`;
        });
        
        // Update dots
        document.querySelectorAll('.studio-slider-dot').forEach(dot => {
            dot.classList.remove('active');
        });
        document.querySelectorAll('.studio-slider-dot')[slide].classList.add('active');
        
        currentSlide = slide;
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide === maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        goToSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide === 0) {
            currentSlide = maxSlide;
        } else {
            currentSlide--;
        }
        goToSlide(currentSlide);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Initialize slider
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transform = `translateX(${100 * index}%)`;
    });
    
    // Auto slide
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// Initialize theme toggle
function initStudioThemeToggle() {
    const themeToggle = document.querySelector('.studio-theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('studio-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('studio-theme', newTheme);
    });
}

// Initialize animations
function initStudioAnimations() {
    const animateElements = document.querySelectorAll('.studio-feature-card, .studio-process-step, .studio-pricing-card, .studio-testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize smooth scrolling
function initStudioSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}