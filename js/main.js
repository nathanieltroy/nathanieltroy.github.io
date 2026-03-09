// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    initBackToTop();
    initializeSkills();
    initializeProjects();
    initializeTimelineToggles();
    initializeEmailCopy();

    // Set overlay heights AFTER projects are created and rendered
    requestAnimationFrame(function() {
        setTimeout(function() {
            // Start the tile animation AFTER everything is set
            setTimeout(function() {
                startTileAnimation();
            }, 900);
        }, 100);
    });
    
    // Also check on orientation change
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && window.matchMedia("(orientation: portrait)").matches) {
            initBackToTop();
        }
        // Re-initialize project tiles on resize to recalculate heights
        setTimeout(initializeProjectTiles, 100);
    });
});

const ANIMATION_DURATION = 1200; // Duration of the flip animation in milliseconds

// Timeline toggle functionality
function initializeTimelineToggles() {
    const toggles = document.querySelectorAll('.timeline-toggle');
    
    if (toggles.length === 0) {
        console.log('No timeline toggles found');
        return;
    }
    
    console.log(`Found ${toggles.length} timeline toggles`);
    
    toggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const timelineItem = this.closest('.timeline-item');
            const description = timelineItem.querySelector('.timeline-description');
            
            if (!description) {
                console.log('No description found for toggle', index);
                return;
            }
            
            this.classList.toggle('open');
            description.classList.toggle('open');
            timelineItem.classList.toggle('has-open-description');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('open')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                description.style.maxHeight = description.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                description.style.maxHeight = '0';
            }
        });
    });
}

// ===== EMAIL COPY FUNCTIONALITY =====
function initializeEmailCopy() {
    const emailCopyBtn = document.getElementById('email-copy-btn');

    if (emailCopyBtn) {
        const emailUser = 'nathanieltroy';
        const emailDomain = 'protonmail';
        const emailTld = 'com';
        
        emailCopyBtn.setAttribute('title', 'Copy email address');
        
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        
        function showToast(message) {
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
        
        emailCopyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = `${emailUser}@${emailDomain}.${emailTld}`;
            
            navigator.clipboard.writeText(email).then(function() {
                const originalIcon = emailCopyBtn.innerHTML;
                emailCopyBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailCopyBtn.style.backgroundColor = 'var(--accent-secondary)';
                emailCopyBtn.setAttribute('title', 'Copied!');
                
                showToast('Email copied to clipboard!');
                
                setTimeout(function() {
                    emailCopyBtn.innerHTML = originalIcon;
                    emailCopyBtn.style.backgroundColor = '';
                    emailCopyBtn.setAttribute('title', 'Copy email address');
                }, 2000);
            }).catch(function(err) {
                console.error('Could not copy email: ', err);
                
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                const originalIcon = emailCopyBtn.innerHTML;
                emailCopyBtn.innerHTML = '<i class="fas fa-check"></i>';
                emailCopyBtn.style.backgroundColor = 'var(--accent-secondary)';
                emailCopyBtn.setAttribute('title', 'Copied!');
                
                showToast('Email copied to clipboard!');
                
                setTimeout(function() {
                    emailCopyBtn.innerHTML = originalIcon;
                    emailCopyBtn.style.backgroundColor = '';
                    emailCopyBtn.setAttribute('title', 'Copy email address');
                }, 2000);
            });
        });
    }
}

// ===== EXTRACT AND COUNT SKILLS FROM PROJECTS =====
function extractAndCountSkills() {
    const skillCount = {};
    
    projectsData.forEach(project => {
        project.skills.forEach(skill => {
            if (skillCount[skill]) {
                skillCount[skill]++;
            } else {
                skillCount[skill] = 1;
            }
        });
    });
    
    return skillCount;
}

// ===== SORT SKILLS BY FREQUENCY (MOST TO LEAST) =====
function sortSkillsByFrequency(skillCount) {
    return Object.keys(skillCount).sort((a, b) => {
        return skillCount[b] - skillCount[a];
    });
}

// ===== INITIALIZE SKILLS FROM PROJECTS =====
function initializeSkills() {
    const skillsGrid = document.getElementById('skills-grid');

    if (!skillsGrid) {
        console.error('Skills grid not found');
        return;
    }
    
    const skillCount = extractAndCountSkills();
    const sortedSkills = sortSkillsByFrequency(skillCount);
    
    let selectedSkill = null;
    
    skillsGrid.innerHTML = '';
    
    sortedSkills.forEach(skill => {
        const button = document.createElement('button');
        button.className = 'skill-button';
        button.textContent = skill;
        button.dataset.skill = skill;
        
        const count = skillCount[skill];
        if (count > 1) {
            button.title = `Appears in ${count} project${count > 1 ? 's' : ''}`;
        }
        
        button.addEventListener('click', function() {
            if (selectedSkill === skill) {
                this.classList.remove('active');
                selectedSkill = null;
                filterProjects(null);
            } else {
                if (selectedSkill) {
                    const prevActive = document.querySelector(`.skill-button[data-skill="${selectedSkill}"]`);
                    if (prevActive) {
                        prevActive.classList.remove('active');
                    }
                }
                this.classList.add('active');
                selectedSkill = skill;
                filterProjects(skill);
            }
        });
        
        skillsGrid.appendChild(button);
    });
    
    console.log('Skills initialized:', sortedSkills);
}

// ===== PROJECT TILES SETUP =====
function initializeProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid not found');
        return;
    }
    
    projectsGrid.innerHTML = '';
    
    projectsData.forEach(project => {
        const tile = createProjectTile(project);
        projectsGrid.appendChild(tile);
    });
    
    // Initialize hover effects after tiles are added
    setTimeout(() => {
        initializeProjectTiles();
    }, 100);
}

function initializeProjectTiles() {
    const projectTiles = document.querySelectorAll('.project-tile');
    
    projectTiles.forEach(tile => {
        const overlay = tile.querySelector('.project-overlay');
        const description = tile.querySelector('.project-description');
        const title = tile.querySelector('.project-title');
        const skills = tile.querySelector('.project-skills');
        
        if (!overlay || !description) return;
        
        // Store original base height (title + skills only, no description)
        const baseHeight = 100; // Default fallback
        
        // Temporarily show everything to measure
        const originalTitleWebkitLineClamp = title.style.webkitLineClamp;
        const originalDescriptionDisplay = description.style.display;
        
        // Remove line clamp temporarily to measure full title height
        title.style.webkitLineClamp = 'unset';
        description.style.display = 'block';
        
        // Force reflow
        void overlay.offsetHeight;
        
        // Measure heights
        const titleHeight = title.offsetHeight;
        const skillsHeight = skills.offsetHeight;
        const descriptionHeight = description.offsetHeight;
        
        // Calculate padding (approximately)
        const padding = 32; // 1rem top + 1rem bottom = 32px roughly
        
        // Calculate expanded height (title + skills + description + padding)
        const expandedHeight = titleHeight + skillsHeight + descriptionHeight + padding;
        
        // Store title line count for potential future use
        const titleLineCount = Math.ceil(titleHeight / (parseFloat(getComputedStyle(title).lineHeight) || 20));
        
        // Restore original styles
        title.style.webkitLineClamp = originalTitleWebkitLineClamp;
        description.style.display = originalDescriptionDisplay;
        
        // Store measurements
        tile.dataset.baseHeight = baseHeight;
        tile.dataset.expandedHeight = expandedHeight;
        tile.dataset.titleHeight = titleHeight;
        tile.dataset.titleLineCount = titleLineCount;
        
        // Remove any existing listeners to prevent duplicates
        tile.removeEventListener('mouseenter', handleMouseEnter);
        tile.removeEventListener('mouseleave', handleMouseLeave);
        tile.removeEventListener('touchstart', handleTileTouchStart);
        
        // Add desktop hover listeners
        tile.addEventListener('mouseenter', handleMouseEnter);
        tile.addEventListener('mouseleave', handleMouseLeave);
        
        // Add mobile touch listener
        tile.addEventListener('touchstart', handleTileTouchStart, { passive: false });
    });
}

function handleMouseEnter(e) {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        expandOverlay(e.currentTarget);
    }
}

function handleMouseLeave(e) {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        collapseOverlay(e.currentTarget);
    }
}

function handleTileTouchStart(e) {
    e.preventDefault();
    const tile = e.currentTarget;
    
    // Collapse any other expanded tiles
    document.querySelectorAll('.project-tile.expanded').forEach(t => {
        if (t !== tile) collapseOverlay(t);
    });
    
    // Toggle this tile
    if (tile.classList.contains('expanded')) {
        collapseOverlay(tile);
    } else {
        expandOverlay(tile);
    }
}

function expandOverlay(tile) {
    const overlay = tile.querySelector('.project-overlay');
    const description = tile.querySelector('.project-description');
    const title = tile.querySelector('.project-title');
    
    if (!overlay || !description) return;
    
    // Remove line clamp to show full title
    title.style.webkitLineClamp = 'unset';
    
    // Show description
    description.style.display = 'block';
    
    // Expand overlay
    overlay.style.height = tile.dataset.expandedHeight + 'px';
    
    // Add expanded class
    tile.classList.add('expanded');
    
    // Add highlight to skills that match filter
    const activeSkill = document.querySelector('.skill-button.active');
    if (activeSkill) {
        const skillName = activeSkill.dataset.skill;
        tile.querySelectorAll('.skill').forEach(s => {
            if (s.textContent === skillName) {
                s.classList.add('highlight');
            }
        });
    }
}

function collapseOverlay(tile) {
    const overlay = tile.querySelector('.project-overlay');
    const description = tile.querySelector('.project-description');
    const title = tile.querySelector('.project-title');
    
    if (!overlay || !description) return;
    
    // Restore line clamp to 3 lines
    title.style.webkitLineClamp = '3';
    
    // Hide description
    description.style.display = 'none';
    
    // Collapse overlay
    overlay.style.height = tile.dataset.baseHeight + 'px';
    
    // Remove expanded class
    tile.classList.remove('expanded');
    
    // Remove skill highlights
    tile.querySelectorAll('.skill.highlight').forEach(s => {
        s.classList.remove('highlight');
    });
}

// Updated to use slideshow container structure
function createProjectTile(project) {
    const tile = document.createElement('div');
    tile.className = 'project-tile';
    tile.dataset.projectId = project.id;
    tile.dataset.skills = project.skills.join(',');
    
    // Click navigation
    tile.style.cursor = 'pointer';
    tile.addEventListener('click', function(e) {
        if (e.target.classList.contains('skill')) {
            e.stopPropagation();
            return;
        }
        window.location.href = `project.html?id=${project.id}`;
    });
    
    // Slideshow
    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-container';
    
    project.images.forEach((imageSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.display = index === 0 ? 'block' : 'none';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${project.title} - image ${index + 1}`;
        
        img.onerror = function() {
            console.error(`Failed to load: ${imageSrc}`);
            this.src = 'images/placeholder.jpg';
        };
        
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    });
    
    tile.appendChild(slideshowContainer);
    
    // Overlay with grouped content
    const overlay = document.createElement('div');
    overlay.className = 'project-overlay';
    
    const contentGroup = document.createElement('div');
    contentGroup.className = 'overlay-content'; // REMOVED 'project-info' class
    
    // Title
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;
    
    // Skills
    const skills = document.createElement('div');
    skills.className = 'project-skills';
    project.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill';
        skillTag.textContent = skill;
        skills.appendChild(skillTag);
    });
    
    // Description
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.subtitle;
    
    // Assemble
    contentGroup.appendChild(title);
    contentGroup.appendChild(skills);
    contentGroup.appendChild(description);
    overlay.appendChild(contentGroup);
    tile.appendChild(overlay);
    
    return tile;
}

// ===== FILTER PROJECTS BY SKILL =====
function filterProjects(skill) {
    const tiles = document.querySelectorAll('.project-tile');
    const allSkills = document.querySelectorAll('.skill');
    
    allSkills.forEach(s => s.classList.remove('highlight'));
    
    if (!skill) {
        tiles.forEach(tile => {
            tile.classList.remove('hidden');
        });
        return;
    }
    
    tiles.forEach(tile => {
        const projectSkills = tile.dataset.skills.split(',');
        const hasSkill = projectSkills.includes(skill);
        
        if (hasSkill) {
            tile.classList.remove('hidden');
            
            const skillElements = tile.querySelectorAll('.skill');
            skillElements.forEach(s => {
                if (s.textContent === skill) {
                    s.classList.add('highlight');
                }
            });
        } else {
            tile.classList.add('hidden');
        }
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {    
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    if (backToTopBtn) {
        const rect = backToTopBtn.getBoundingClientRect();
        const newBtn = backToTopBtn.cloneNode(true);
        backToTopBtn.parentNode.replaceChild(newBtn, backToTopBtn);
        
        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const rightContent = document.querySelector('.right-content');
            
            if (rightContent && rightContent.scrollTop > 0) {
                rightContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ===== TILE SLIDESHOW ANIMATION =====
function startTileAnimation() {
    const tiles = document.querySelectorAll('.project-tile');
    if (tiles.length === 0) return;
    
    addFlipAnimationStyles();
    
    const columns = 3;
    const rows = Math.ceil(tiles.length / columns);
    
    let animationInterval;
    let isAnimating = false;
    
    const waveGroups = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const tileIndex = row * columns + col;
            if (tileIndex >= tiles.length) continue;
            
            const waveGroup = row + col;
            if (!waveGroups[waveGroup]) {
                waveGroups[waveGroup] = [];
            }
            waveGroups[waveGroup].push(tiles[tileIndex]);
        }
    }
    
    function getCurrentSlideIndex(tile) {
        const slides = tile.querySelectorAll('.slide');
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].style.display === 'block' || 
                (i === 0 && slides[i].style.display !== 'none')) {
                return i;
            }
        }
        return 0;
    }
    
    function animateWaveGroup(group, waveIndex) {
        return new Promise(resolve => {
            const startDelay = waveIndex * (ANIMATION_DURATION / 2);
            
            setTimeout(() => {
                group.forEach(tile => {
                    const slides = tile.querySelectorAll('.slide');
                    if (slides.length === 0) return;
                    
                    const currentIndex = getCurrentSlideIndex(tile);
                    const nextIndex = (currentIndex + 1) % slides.length;
                    
                    slides.forEach(slide => {
                        slide.style.transition = '';
                        slide.style.filter = 'brightness(1)';
                        slide.classList.remove('fade-to-white', 'fade-from-white');
                    });
                    
                    slides.forEach((slide, index) => {
                        slide.style.display = index === currentIndex ? 'block' : 'none';
                    });
                    
                    tile.classList.add('flip-diagonal');
                    
                    void tile.offsetWidth;
                    
                    slides[currentIndex].style.display = 'block';
                    slides[currentIndex].style.transition = 'filter 0.6s ease-in-out';
                    
                    requestAnimationFrame(() => {
                        slides[currentIndex].classList.add('fade-to-white');
                    });
                    
                    setTimeout(() => {
                        slides[currentIndex].style.display = 'none';
                        slides[currentIndex].classList.remove('fade-to-white');
                        
                        slides[nextIndex].style.display = 'block';
                        slides[nextIndex].style.filter = 'brightness(5) blur(2px)';
                        slides[nextIndex].style.transition = 'filter 0.6s ease-in-out';
                        
                        void slides[nextIndex].offsetWidth;
                        
                        requestAnimationFrame(() => {
                            slides[nextIndex].style.filter = 'brightness(1)';
                        });
                        
                    }, ANIMATION_DURATION / 2);
                    
                    setTimeout(() => {
                        tile.classList.remove('flip-diagonal');
                        
                        slides.forEach((slide, index) => {
                            slide.style.display = index === nextIndex ? 'block' : 'none';
                            slide.style.transition = '';
                            slide.style.filter = 'brightness(1)';
                            slide.classList.remove('fade-to-white', 'fade-from-white');
                        });
                        
                    }, ANIMATION_DURATION);
                });
                
                resolve();
            }, startDelay);
        });
    }

    async function runAnimationCycle() {
        if (isAnimating) return;
        isAnimating = true;
        
        const promises = waveGroups.map((group, i) => {
            if (group) {
                return animateWaveGroup(group, i);
            }
        });
        
        await Promise.all(promises);
        
        const longestDuration = (waveGroups.length - 1) * (ANIMATION_DURATION / 2) + ANIMATION_DURATION;
        setTimeout(() => {
            isAnimating = false;
        }, longestDuration);
    }
    
    animationInterval = setInterval(runAnimationCycle, 6000);
    
    return () => {
        clearInterval(animationInterval);
        tiles.forEach(tile => {
            tile.classList.remove('flip-diagonal');
            const slides = tile.querySelectorAll('.slide');
            slides.forEach((slide, i) => {
                slide.style.transition = '';
                slide.style.opacity = i === 0 ? '1' : '0';
                slide.style.display = i === 0 ? 'block' : 'none';
            });
        });
    };
}

function addFlipAnimationStyles() {
    if (document.getElementById('flip-animation-styles')) {
        return;
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'flip-animation-styles';
    styleSheet.textContent = `
        .project-tile {
            transform-style: preserve-3d;
            perspective: 1500px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
        }
        
        .project-tile .slideshow-container {
            position: relative;
            width: 100%;
            height: 100%;
        }
        
        .project-tile .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1;
            filter: brightness(1);
            transition: filter 0.6s cubic-bezier(0.42, 0, 0.58, 1);
        }
        
        .project-tile.flip-diagonal {
            animation: flipDiagonal 1.2s ease-in-out;
            box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        
        .project-tile * {
            backface-visibility: visible;
        }
    `;
    
    document.head.appendChild(styleSheet);
}