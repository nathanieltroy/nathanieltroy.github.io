// ===== DYNAMIC PROJECT LOADER =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dynamic project page loaded');
    
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        // No project ID, redirect to projects page or show error
        window.location.href = 'index.html';
        return;
    }
    
    // Find the project
    const project = projectsData.find(p => p.id === projectId);
    
    if (!project) {
        // Project not found
        document.querySelector('.article-container').innerHTML = `
            <div style="text-align: center; padding: 4rem;">
                <h1>Project Not Found</h1>
                <p>Sorry, the project you're looking for doesn't exist.</p>
                <a href="index.html" class="nav-link all-projects" style="display: inline-block; margin-top: 2rem;">
                    <i class="fas fa-home"></i>
                    <span>Back to Home</span>
                </a>
            </div>
        `;
        return;
    }
    
    // Populate the page with project data
    populateProjectPage(project);
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Calculate reading time
    calculateReadingTime();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // ===== BACK TO TOP INITIALIZATION =====
    // Initialize back to top button
    initBackToTop();
});

// ===== POPULATE PROJECT PAGE =====
function populateProjectPage(project) {
    // Set page title
    document.title = `${project.title} | Nathaniel Troy`;
    
    // Populate featured image
    document.querySelector('.article-featured-image img').src = project.featuredImage || project.images[0];
    document.querySelector('.image-overlay h1').textContent = project.title;
    
    // Populate subtitle
    document.querySelector('.article-subheading').textContent = project.subtitle || 'A deep dive into the project methodology and results';
    
    // Populate meta bar
    document.querySelector('.meta-detail-item .fa-calendar-alt + span').textContent = project.date || 'January 2024';
    
    // Update GitHub link
    const githubLink = document.querySelector('.github-link');
    if (project.githubUrl) {
        githubLink.href = project.githubUrl;
        githubLink.style.display = 'flex';
    } else {
        githubLink.style.display = 'none';
    }
    
    // Populate article content
    const contentDiv = document.getElementById('article-content');
    contentDiv.innerHTML = generateArticleContent(project);
    
    // Populate gallery if exists
    if (document.querySelector('.project-gallery')) {
        populateGallery(project.images);
    }
    
    // Setup navigation between projects
    setupProjectNavigation(project.id);
}

// ===== GENERATE ARTICLE CONTENT =====
function generateArticleContent(project) {
    let html = '';
    
    if (!project.content || !project.content.sections) {
        return html;
    }
    
    project.content.sections.forEach(section => {
        switch(section.type) {
            case 'heading':
                html += `<${section.level || 'h2'}>${section.text}</${section.level || 'h2'}>\n\n`;
                break;
                
            case 'paragraph':
                html += `<p>${section.text}</p>\n\n`;
                break;
                
            case 'pullQuote':
                html += `<div class="pull-quote">"${section.text}"</div>\n\n`;
                break;
                
            case 'image':
                html += `
                    <figure class="article-image">
                        <img src="${section.src}" alt="${section.caption || ''}">
                        ${section.caption ? `<figcaption>${section.caption}</figcaption>` : ''}
                    </figure>\n\n`;
                break;
                
            case 'feature-list':
                html += `<div class="feature-list">\n`;
                section.features.forEach(feature => {
                    html += `<p><strong>${feature.title}:</strong> ${feature.description}</p>\n\n`;
                });
                html += `</div>\n\n`;
                break;

            case 'bullet-list':
                html += `<${section.level || 'h2'}>${section.title}</${section.level || 'h2'}>\n\n`; // Optional heading
                html += `<ul>\n`;
                section.items.forEach(item => {
                    html += `<li>${item}</li>\n`;
                });
                html += `</ul>\n\n`;
                break;
                
            case 'code':
                html += `<pre><code class="language-${section.language || 'text'}">${section.text}</code></pre>\n\n`;
                break;
                
            case 'image-grid':
                html += `<div class="article-image-grid">\n`;
                section.images.forEach(img => {
                    html += `<img src="${img.src}" alt="${img.alt || ''}">\n`;
                });
                html += `</div>\n\n`;
                break;
        }
    });
    
    return html;
}

// ===== SETUP PROJECT NAVIGATION =====
function setupProjectNavigation(currentId) {
    const currentIndex = projectsData.findIndex(p => p.id === currentId);
    
    const prevLink = document.querySelector('.prev-project');
    const nextLink = document.querySelector('.next-project');
    const allProjectsLink = document.querySelector('.all-projects');
    
    // Handle previous project
    if (currentIndex > 0) {
        const prevProject = projectsData[currentIndex - 1];
        prevLink.href = `project.html?id=${prevProject.id}`;
        prevLink.querySelector('span').textContent = prevProject.title;
        prevLink.style.visibility = 'visible';
        prevLink.style.display = 'flex';  // Ensure it's visible
    } else {
        // Keep the element in the DOM but make it invisible and non-interactive
        prevLink.style.visibility = 'hidden';
        prevLink.style.display = 'flex';  // Keep display flex to maintain layout
        prevLink.style.pointerEvents = 'none';  // Prevent clicking
        prevLink.href = '#';  // Remove href
    }
    
    // Handle next project
    if (currentIndex < projectsData.length - 1) {
        const nextProject = projectsData[currentIndex + 1];
        nextLink.href = `project.html?id=${nextProject.id}`;
        nextLink.querySelector('span').textContent = nextProject.title;
        nextLink.style.visibility = 'visible';
        nextLink.style.display = 'flex';
    } else {
        // Keep the element in the DOM but make it invisible and non-interactive
        nextLink.style.visibility = 'hidden';
        nextLink.style.display = 'flex';  // Keep display flex to maintain layout
        nextLink.style.pointerEvents = 'none';  // Prevent clicking
        nextLink.href = '#';  // Remove href
    }
    
    // All projects button always visible and centered
    allProjectsLink.style.visibility = 'visible';
    allProjectsLink.style.display = 'flex';
}

// ===== GALLERY FUNCTIONS (from your original) =====
function changeGalleryImage(thumbnail) {
    const mainImage = document.getElementById('gallery-main-img');
    if (!mainImage || !thumbnail) return;
    
    mainImage.src = thumbnail.src;
    
    const thumbnails = document.querySelectorAll('.gallery-thumb');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    thumbnail.classList.add('active');
    
    mainImage.style.opacity = '0.5';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 50);
}

// ===== KEYBOARD NAVIGATION =====
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (!document.querySelector('.project-gallery')) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeThumb = document.querySelector('.gallery-thumb.active');
            if (!activeThumb) return;
            
            const thumbnails = Array.from(document.querySelectorAll('.gallery-thumb'));
            const currentIndex = thumbnails.indexOf(activeThumb);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                changeGalleryImage(thumbnails[currentIndex - 1]);
                thumbnails[currentIndex - 1].style.transform = 'scale(0.95)';
                setTimeout(() => {
                    thumbnails[currentIndex - 1].style.transform = '';
                }, 200);
            } else if (e.key === 'ArrowRight' && currentIndex < thumbnails.length - 1) {
                changeGalleryImage(thumbnails[currentIndex + 1]);
                thumbnails[currentIndex + 1].style.transform = 'scale(0.95)';
                setTimeout(() => {
                    thumbnails[currentIndex + 1].style.transform = '';
                }, 200);
            }
        }
    });
}

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

// ===== READING TIME CALCULATION =====
function calculateReadingTime() {
    const content = document.getElementById('article-content');
    if (!content) return;
    
    const text = content.innerText || content.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    const readingTimeElement = document.getElementById('reading-time');
    if (readingTimeElement) {
        readingTimeElement.textContent = readingTime + ' min read';
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    if (backToTopBtn) {
        
        // Remove any existing listeners
        const newBtn = backToTopBtn.cloneNode(true);
        backToTopBtn.parentNode.replaceChild(newBtn, backToTopBtn);
        
        // Add click listener
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back to top clicked');
            
            // Check which element is scrollable
            const rightContent = document.querySelector('.right-content');
            
            if (rightContent && rightContent.scrollTop > 0) {
                // Scroll inside right-content (portrait mode)
                rightContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Scroll the main window (landscape/desktop)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Make changeGalleryImage available globally
window.changeGalleryImage = changeGalleryImage;