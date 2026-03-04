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
    
    // Initialize gallery
    initializeGallery();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Calculate reading time
    calculateReadingTime();
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
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
    
    // Overview paragraphs
    if (project.content && project.content.overview) {
        const overviewParagraphs = project.content.overview.split('\n\n');
        overviewParagraphs.forEach(para => {
            if (para.trim()) {
                html += `<p>${para.trim()}</p>\n\n`;
            }
        });
    } else {
        html += `<p>${project.description}</p>\n\n`;
    }
    
    // Pull quote
    if (project.pullQuote) {
        html += `<div class="pull-quote">"${project.pullQuote}"</div>\n\n`;
    }
    
    // Technical deep dive
    if (project.content && project.content.technicalDeepDive) {
        html += `<p>${project.content.technicalDeepDive}</p>\n\n`;
    }
    
    // First image from gallery as figure
    if (project.images && project.images.length > 1) {
        html += `
            <figure class="article-image">
                <img src="${project.images[1]}" alt="Technical implementation diagram">
                <figcaption>Figure 1: System architecture showing data flow between components</figcaption>
            </figure>
        \n\n`;
    }
    
    // Key Features
    if (project.content && project.content.keyFeatures) {
        html += `<h2>Key Features</h2>\n\n`;
        
        project.content.keyFeatures.forEach(feature => {
            html += `<p><strong>${feature.title}:</strong> ${feature.description}</p>\n\n`;
        });
    }
    
    // Image grid if we have at least 3 images
    if (project.images && project.images.length >= 3) {
        html += `
            <div class="article-image-grid">
                <img src="${project.images[2]}" alt="Feature demonstration 1">
                <img src="${project.images[project.images.length - 1]}" alt="Feature demonstration 2">
            </div>
        \n\n`;
    }
    
    // Results
    if (project.content && project.content.results) {
        html += `<h2>Results & Outcomes</h2>\n\n`;
        html += `<p>${project.content.results}</p>\n\n`;
    }
    
    // Challenges
    if (project.content && project.content.challenges) {
        html += `<p>${project.content.challenges}</p>\n\n`;
    }
    
    // Future Work
    if (project.content && project.content.futureWork) {
        html += `<h2>Future Work</h2>\n\n`;
        html += `<p>${project.content.futureWork}</p>\n\n`;
    }
    
    return html;
}

// ===== POPULATE GALLERY =====
function populateGallery(images) {
    const galleryMain = document.getElementById('gallery-main-img');
    const galleryThumbs = document.querySelector('.gallery-thumbnails');
    
    if (!galleryMain || !galleryThumbs) return;
    
    // Set first image as main
    galleryMain.src = images[0];
    
    // Clear existing thumbnails
    galleryThumbs.innerHTML = '';
    
    // Add new thumbnails
    images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.alt = `Gallery image ${index + 1}`;
        thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
        thumb.onclick = function() { changeGalleryImage(this); };
        galleryThumbs.appendChild(thumb);
    });
}

// ===== SETUP PROJECT NAVIGATION =====
function setupProjectNavigation(currentId) {
    const currentIndex = projectsData.findIndex(p => p.id === currentId);
    
    const prevLink = document.querySelector('.prev-project');
    const nextLink = document.querySelector('.next-project');
    
    if (currentIndex > 0) {
        const prevProject = projectsData[currentIndex - 1];
        prevLink.href = `project.html?id=${prevProject.id}`;
        prevLink.querySelector('span').textContent = prevProject.title.substring(0, 20) + '...';
    } else {
        prevLink.style.visibility = 'hidden';
    }
    
    if (currentIndex < projectsData.length - 1) {
        const nextProject = projectsData[currentIndex + 1];
        nextLink.href = `project.html?id=${nextProject.id}`;
        nextLink.querySelector('span').textContent = nextProject.title.substring(0, 20) + '...';
    } else {
        nextLink.style.visibility = 'hidden';
    }
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

// Make changeGalleryImage available globally
window.changeGalleryImage = changeGalleryImage;