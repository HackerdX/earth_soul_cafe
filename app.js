// Earth Soul Cafe - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
  console.log('Earth Soul Cafe: Initializing JavaScript...');

  // ================= NAVIGATION FUNCTIONALITY =================
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.site-header');

  // Mobile navigation toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function() {
      const isOpen = siteNav.classList.contains('nav-open');
      
      if (isOpen) {
        siteNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        siteNav.classList.add('nav-open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // ================= SMOOTH SCROLLING FUNCTIONALITY =================
  function smoothScrollTo(targetId) {
    console.log('Attempting to scroll to:', targetId);
    const element = document.getElementById(targetId.replace('#', ''));
    
    if (element) {
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      console.log('Successfully scrolled to:', targetId);
      return true;
    } else {
      console.warn('Element not found:', targetId);
      return false;
    }
  }

  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      // Close mobile nav if open
      if (siteNav && siteNav.classList.contains('nav-open')) {
        siteNav.classList.remove('nav-open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
      
      // Scroll to section
      if (href && href.startsWith('#')) {
        smoothScrollTo(href);
      }
    });
  });

  // Handle hero button clicks
  const heroBtns = document.querySelectorAll('.hero-cta .btn');
  heroBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        smoothScrollTo(href);
      }
    });
  });

  // Handle footer link clicks
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        smoothScrollTo(href);
      }
    });
  });

  // Handle logo click
  const logoLink = document.querySelector('.site-logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollTo('#home');
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', function(event) {
    if (header && !header.contains(event.target) && siteNav && siteNav.classList.contains('nav-open')) {
      siteNav.classList.remove('nav-open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // ================= INTERSECTION OBSERVER FOR ACTIVE NAV =================
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length > 0 && header) {
    const navOptions = {
      root: null,
      rootMargin: `-${header.offsetHeight + 20}px 0px -60% 0px`,
      threshold: 0.2
    };

    const navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          
          // Remove active class from all nav links
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to current nav link
          const activeNavLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
          if (activeNavLink) {
            activeNavLink.classList.add('active');
          }
        }
      });
    }, navOptions);

    // Observe all sections
    sections.forEach(section => {
      navObserver.observe(section);
    });
  }

  // ================= HEADER BACKGROUND ON SCROLL =================
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        header.style.background = 'rgba(245, 242, 232, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
      } else {
        header.style.background = 'rgba(245, 242, 232, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      }
    });
  }

  // ================= LOGO IMAGE LOADING =================
  const logoImg = document.querySelector('.site-logo-img');
  if (logoImg) {
    // Ensure logo is visible
    logoImg.style.display = 'block';
    logoImg.style.opacity = '1';
    
    logoImg.addEventListener('load', function() {
      console.log('Logo loaded successfully');
      this.style.opacity = '1';
    });
    
    logoImg.addEventListener('error', function() {
      console.warn('Logo failed to load, keeping text visible');
      this.style.display = 'none';
      const logoText = document.querySelector('.site-logo-text');
      if (logoText) {
        logoText.style.display = 'block';
      }
    });
  }

  // ================= CONTACT FORM HANDLING =================
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function showFormStatus(message, type) {
    console.log('Showing form status:', message, type);
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = `status status--${type} mt-8`;
      formStatus.classList.remove('hidden');
      formStatus.style.display = 'block';
      formStatus.style.opacity = '1';
      
      // Scroll to show the message
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      if (type === 'success') {
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.classList.add('hidden');
            formStatus.style.display = 'none';
          }, 300);
        }, 4000);
      }
    } else {
      console.warn('Form status element not found');
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  if (contactForm) {
    console.log('Contact form found, adding event listener');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name')?.trim();
      const email = formData.get('email')?.trim();
      const phone = formData.get('phone')?.trim();
      const message = formData.get('message')?.trim();
      
      console.log('Form data:', { name, email, phone, message });
      
      // Basic validation
      if (!name || !email || !message) {
        showFormStatus('Please fill in all required fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      showFormStatus('Sending message...', 'info');
      
      setTimeout(() => {
        showFormStatus('Thank you for reaching out! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        console.log('Form reset completed');
      }, 1500);
    });
  } else {
    console.warn('Contact form not found');
  }

  // ================= GALLERY IMAGE HANDLING =================
  function ensureGalleryVisible() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    console.log('Gallery images found:', galleryImages.length);
    
    galleryImages.forEach((img, index) => {
      // Ensure images are visible and properly loaded
      img.style.display = 'block';
      img.style.opacity = '1';
      
      // Add loading and error handling
      if (!img.complete) {
        img.addEventListener('load', function() {
          console.log('Gallery image loaded:', this.src);
          this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
          console.error('Gallery image failed to load:', this.src);
          this.style.opacity = '0.7';
          this.alt = 'Image temporarily unavailable';
        });
      } else {
        console.log('Gallery image already loaded:', img.src);
      }
    });
  }

  // Initialize gallery
  ensureGalleryVisible();

  // ================= FEATURE CARDS ANIMATION =================
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (featureCards.length > 0) {
    const cardObserver = new IntersectionObserver(function(entries) {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty('--animation-delay', index);
          entry.target.classList.add('animate-in');
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    featureCards.forEach(card => {
      cardObserver.observe(card);
    });
  }

  // ================= MENU ITEMS ANIMATION =================
  const menuItems = document.querySelectorAll('.menu-category li');
  
  if (menuItems.length > 0) {
    const menuObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    menuItems.forEach((item, index) => {
      item.style.transform = 'translateX(-20px)';
      item.style.opacity = '0';
      item.style.transition = `all 0.6s ease ${index * 0.05}s`;
      menuObserver.observe(item);
    });
  }

  // ================= KEYBOARD NAVIGATION SUPPORT =================
  document.addEventListener('keydown', function(e) {
    // Close mobile nav with Escape key
    if (e.key === 'Escape' && siteNav && siteNav.classList.contains('nav-open')) {
      siteNav.classList.remove('nav-open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    }
  });

  // ================= ACCESSIBILITY ENHANCEMENTS =================
  if (navToggle) {
    navToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
      }
    });
  }

  // ================= SOCIAL LINKS ANIMATION =================
  const socialLinks = document.querySelectorAll('.social-icon');
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // ================= CURRENT YEAR IN FOOTER =================
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // ================= INITIALIZATION COMPLETE =================
  console.log('Earth Soul Cafe website loaded successfully! 🌱');
  
  // Final checks after everything loads
  setTimeout(() => {
    ensureGalleryVisible();
    
    // Ensure logo is visible
    const logoImg = document.querySelector('.site-logo-img');
    if (logoImg) {
      logoImg.style.display = 'block';
      logoImg.style.opacity = '1';
    }
    
    console.log('Final initialization check complete');
  }, 1000);
  
});

// ================= HERO GALLERY FUNCTIONALITY =================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let slideInterval;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
        // Set background image
        const bgImage = slides[index].getAttribute('data-bg');
        if (bgImage) {
            slides[index].style.backgroundImage = `url(${bgImage})`;
        }
    }
    
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 3000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Initialize gallery
if (slides.length > 0) {
    // Set initial background images
    slides.forEach((slide, index) => {
        const bgImage = slide.getAttribute('data-bg');
        if (bgImage) {
            slide.style.backgroundImage = `url(${bgImage})`;
        }
    });
    
    showSlide(0);
    startSlideshow();
    
    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            setTimeout(startSlideshow, 1000);
        });
    });
    
    // Pause on hover
    const heroGallery = document.querySelector('.hero-gallery');
    if (heroGallery) {
        heroGallery.addEventListener('mouseenter', stopSlideshow);
        heroGallery.addEventListener('mouseleave', startSlideshow);
    }
}

// ================= MENU TOOLTIP FUNCTIONALITY =================
const menuItems = {
    'Acai Berry Bowl': {
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop',
        description: 'Fresh avocado spread on multigrain bread with herbs and cherry tomatoes'
    },
    'Green Power Bowl': {
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
        description: 'Nutrient-rich quinoa with fresh vegetables and citrus dressing'
    },
    'Tropical Paradise Bowl': {
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop',
        description: 'Acai and fruit blend topped with seeds, nuts, and fresh berries'
    },
    'Fresh Green Smoothie': {
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&h=200&fit=crop',
        description: 'Wholesome pizza base with fresh vegetables and dairy-free cheese'
    },
    'Cold Pressed Juices': {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
        description: 'Nutrient-packed blend of leafy greens, fruits, and superfoods'
    },
    'Specialty Coffee': {
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop',
        description: 'Plant-based pasta with seasonal vegetables and herbs'
    }
    /* Continue with all the menu items listed here */
};

function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'menu-item-tooltip';
    tooltip.innerHTML = `
        <img src="" alt="" />
        <h4></h4>
        <p></p>
    `;
    document.body.appendChild(tooltip);
    return tooltip;
}

function initMenuTooltips() {
    const tooltip = createTooltip();
    const menuListItems = document.querySelectorAll('.menu-category li');
    
    menuListItems.forEach(item => {
        const itemText = item.textContent.trim();
        const itemName = Object.keys(menuItems).find(key => 
            itemText.toLowerCase().includes(key.toLowerCase())
        );
        
        if (itemName && menuItems[itemName]) {
            item.addEventListener('mouseenter', (e) => {
                const itemData = menuItems[itemName];
                const img = tooltip.querySelector('img');
                const title = tooltip.querySelector('h4');
                const desc = tooltip.querySelector('p');
                
                img.src = itemData.image;
                img.alt = itemName;
                title.textContent = itemName;
                desc.textContent = itemData.description;
                
                tooltip.classList.add('show');
                
                // Position tooltip
                const rect = item.getBoundingClientRect();
                tooltip.style.left = Math.max(
                    rect.right + 10,
                    window.innerWidth - tooltip.offsetWidth - 20
                ) + 'px';
                tooltip.style.top = (rect.top - 10) + 'px';

                /*
                  bottom
                  : 
                  365.4000053405762
                  height
                  : 
                  48.79999923706055
                  left
                  : 
                  16
                  right
                  : 
                  538.4000244140625
                  top
                  : 
                  316.6000061035156
                  width
                  : 
                  522.4000244140625
                  x
                  : 
                  16
                  y
                  : 
                  316.6000061035156 */
            });
            
            item.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        }
    });
}

// Initialize tooltips after DOM is loaded
setTimeout(initMenuTooltips, 1000);

// ================= ENHANCED CONTACT MAP =================
function initMap() {
    // Earth Soul Cafe coordinates: CBD-Belapur, Navi Mumbai
    const cafeLocation = { lat: 19.009234, lng: 73.033149 };
    
    // Replace the existing map iframe with Google Maps embed
    const mapContainer = document.querySelector('.contact-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4!2d73.032505!3d19.006397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6066b4b4b4b4b4b4!2sEarth%20Soul%20Cafe!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin&cid=6943405223010935480"
                width="100%" 
                height="300" 
                style="border:0; border-radius: 8px;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
    }
}

// Initialize map
initMap();


// ================= ERROR HANDLING =================
window.addEventListener('error', function(e) {
  console.warn('Earth Soul Cafe: An error occurred:', e.error);
});

window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.warn('Earth Soul Cafe Error:', {
    message: msg,
    source: url,
    line: lineNo,
    column: columnNo,
    error: error
  });
  return false;
};

