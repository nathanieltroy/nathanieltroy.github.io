// project_page_sample.js
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Project page loaded, initializing...');
    
    // Theme is already applied by inline script in <head>
    // The toggle listener is attached by theme-manager.js
    // No theme code needed here at all!
    
    // Initialize gallery
    initializeGallery();
    
    // Add smooth scrolling for anchor links
    initializeSmoothScroll();
});

// ===== GALLERY FUNCTIONS =====
function initializeGallery() {
    // Set first thumbnail as active
    const firstThumb = document.querySelector('.gallery-thumb');
    if (firstThumb && !firstThumb.classList.contains('active')) {
        firstThumb.classList.add('active');
    }
}

// Change main gallery image when thumbnail is clicked
function changeGalleryImage(thumbnail) {
    // Get the main image element
    const mainImage = document.getElementById('gallery-main-img');
    
    if (!mainImage || !thumbnail) return;
    
    // Update main image source to clicked thumbnail's source
    mainImage.src = thumbnail.src;
    
    // Remove 'active' class from all thumbnails
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add 'active' class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Add a subtle fade effect
    mainImage.style.opacity = '0.5';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 50);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    // Only on project pages
    if (!document.querySelector('.project-gallery')) return;
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeThumb = document.querySelector('.gallery-thumb.active');
        if (!activeThumb) return;
        
        const thumbnails = Array.from(document.querySelectorAll('.gallery-thumb'));
        const currentIndex = thumbnails.indexOf(activeThumb);
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            // Previous image
            changeGalleryImage(thumbnails[currentIndex - 1]);
            // Optional: add ripple effect to indicate navigation
            thumbnails[currentIndex - 1].style.transform = 'scale(0.95)';
            setTimeout(() => {
                thumbnails[currentIndex - 1].style.transform = '';
            }, 200);
        } else if (e.key === 'ArrowRight' && currentIndex < thumbnails.length - 1) {
            // Next image
            changeGalleryImage(thumbnails[currentIndex + 1]);
            thumbnails[currentIndex + 1].style.transform = 'scale(0.95)';
            setTimeout(() => {
                thumbnails[currentIndex + 1].style.transform = '';
            }, 200);
        }
    }
});

// ===== SMOOTH SCROLLING =====
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== LAZY LOAD IMAGES (optional but recommended) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.gallery-thumb[data-src], .gallery-main img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== EXPORT FOR GLOBAL USE (if needed) =====
// Make changeGalleryImage available globally for onclick attributes
window.changeGalleryImage = changeGalleryImage;