  document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu visibility on button click
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.style.display === 'flex') {
          mobileMenu.style.display = 'none';
        } else {
          mobileMenu.style.display = 'flex';
        }
      });
    }


    // Close mobile menu while clicking on any menu's item
    const mobileMenuItems = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.style.display = 'none';
      });
    });

    
    // Implement smooth scrolling for navigation links

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });


    // Handle contact form and newsletter form submissions with success messages too 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
      });
    }


    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
      });
    }
    
    // Adjust mobile menu visibility on window resize
    function handleResize() {
      const windowWidth = window.innerWidth;
      
      // Reset mobile menu display on window resize
      if (windowWidth >= 768 && mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    }

    
    // Initial call
    handleResize();
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Add active class to current nav link
    // Highlight the current active navigation link as user scrolls
    function setActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      let scrollY = window.pageYOffset;
      
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
            
          // // Loop through all mobile navigation links
          document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');  // Add 'active' class to the link corresponding to the current section
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
  });
