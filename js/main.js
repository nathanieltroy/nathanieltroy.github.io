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
    const title = tile.querySelector('.project-title');
        
    // Remove title line clamp (CSS handles this via .expanded class)
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
    // Remove expanded class - CSS handles the transform
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
const ANIMATION_CONFIG = {
    // Duration of one complete flip (in milliseconds)
    FLIP_DURATION: 1200,        // Was: ANIMATION_DURATION = 1200
    
    // Delay between wave groups starting (as fraction of FLIP_DURATION)
    GROUP_DELAY_FACTOR: 0.5,    // Was: waveIndex * (ANIMATION_DURATION / 2)
    
    // Interval between animation cycles (in milliseconds)
    CYCLE_INTERVAL: 6000,       // Was: 6000
    
    // Fade transition duration (in milliseconds)
    FADE_DURATION: 600,         // Was: hardcoded as 0.6s in CSS
    
    // Optional: Brightness flash level for mid-point
    FLASH_BRIGHTNESS: 5,        // Was: brightness(5)
    FLASH_BLUR: '2px'           // Was: blur(2px)
};

function startTileAnimation() {
    const tiles = document.querySelectorAll('.project-tile');
    if (tiles.length === 0) return;
    
    // Add the appropriate animation styles based on column count
    addFlipStyles();
    
    let animationInterval;
    let isAnimating = false;
    
    function createWaveGroups(tiles) {
        const waveGroups = [];
        const columns = getColumnCount();
        const rows = Math.ceil(tiles.length / columns);
        
        // Wave pattern is determined SOLELY by number of columns
        if (columns >= 2) {
            // 2+ columns: Diagonal wave pattern (row + col)
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
        } else {
            // 1 column: Sequential (tile by tile)
            for (let i = 0; i < tiles.length; i++) {
                waveGroups[i] = [tiles[i]]; // Each tile gets its own group
            }
        }
        
        return waveGroups;
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
            // Use config for delay calculation
            const startDelay = waveIndex * (ANIMATION_CONFIG.FLIP_DURATION * ANIMATION_CONFIG.GROUP_DELAY_FACTOR);
            
            setTimeout(() => {
                group.forEach(tile => {
                    const slides = tile.querySelectorAll('.slide');
                    if (slides.length === 0) return;
                    
                    const currentIndex = getCurrentSlideIndex(tile);
                    const nextIndex = (currentIndex + 1) % slides.length;
                    
                    // Reset all slides
                    slides.forEach(slide => {
                        slide.style.transition = '';
                        slide.style.filter = 'brightness(1)';
                        slide.classList.remove('fade-to-white', 'fade-from-white');
                        slide.style.display = 'none';
                    });
                    
                    // Show current slide
                    slides[currentIndex].style.display = 'block';
                    
                    // Add flip animation class
                    tile.classList.add('flip-diagonal');
                    void tile.offsetWidth; // Force reflow
                    
                    // Fade out current slide using config duration
                    slides[currentIndex].style.transition = `filter ${ANIMATION_CONFIG.FADE_DURATION}ms ease-in-out`;
                    requestAnimationFrame(() => {
                        slides[currentIndex].classList.add('fade-to-white');
                    });
                    
                    // Mid-point: switch to next slide with bright flash
                    setTimeout(() => {
                        slides[currentIndex].style.display = 'none';
                        slides[currentIndex].classList.remove('fade-to-white');
                        
                        slides[nextIndex].style.display = 'block';
                        // Use config for flash intensity
                        slides[nextIndex].style.filter = `brightness(${ANIMATION_CONFIG.FLASH_BRIGHTNESS}) blur(${ANIMATION_CONFIG.FLASH_BLUR})`;
                        slides[nextIndex].style.transition = `filter ${ANIMATION_CONFIG.FADE_DURATION}ms ease-in-out`;
                        
                        void slides[nextIndex].offsetWidth; // Force reflow
                        
                        requestAnimationFrame(() => {
                            slides[nextIndex].style.filter = 'brightness(1)';
                        });
                        
                    }, ANIMATION_CONFIG.FLIP_DURATION / 2);
                    
                    // End of animation: clean up
                    setTimeout(() => {
                        tile.classList.remove('flip-diagonal');
                        
                        slides.forEach((slide, index) => {
                            slide.style.display = index === nextIndex ? 'block' : 'none';
                            slide.style.transition = '';
                            slide.style.filter = 'brightness(1)';
                            slide.classList.remove('fade-to-white', 'fade-from-white');
                        });
                        
                    }, ANIMATION_CONFIG.FLIP_DURATION);
                });
                
                resolve();
            }, startDelay);
        });
    }
    
    async function runAnimationCycle() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Create wave groups fresh each cycle to handle resize
        const waveGroups = createWaveGroups(tiles);
        
        const promises = waveGroups.map((group, i) => {
            if (group) {
                return animateWaveGroup(group, i);
            }
        });
        
        await Promise.all(promises);
        
        // Use config for longest duration calculation
        const longestDuration = (waveGroups.length - 1) * 
            (ANIMATION_CONFIG.FLIP_DURATION * ANIMATION_CONFIG.GROUP_DELAY_FACTOR) + 
            ANIMATION_CONFIG.FLIP_DURATION;
        
        setTimeout(() => {
            isAnimating = false;
        }, longestDuration);
    }
    
    // Start animation using config interval
    animationInterval = setInterval(runAnimationCycle, ANIMATION_CONFIG.CYCLE_INTERVAL);
    
    // Return cleanup function
    return () => {
        clearInterval(animationInterval);
        tiles.forEach(tile => {
            tile.classList.remove('flip-diagonal');
            const slides = tile.querySelectorAll('.slide');
            slides.forEach((slide, i) => {
                slide.style.transition = '';
                slide.style.display = i === 0 ? 'block' : 'none';
            });
        });
    };
}

function getColumnCount() {
    const width = window.innerWidth;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    
    // Desktop (1200px and up) - 3 columns
    if (width >= 1200) {
        return 3;
    }
    
    // Tablet (769px - 1199px) - 2 columns
    if (width >= 769 && width <= 1199) {
        return 2;
    }
    
    // Mobile (up to 768px) - 1 column
    if (width <= 768) {
        return 1;
    }
    
    // Fallback
    return 3;
}

// ===== TILE ANIMATION STYLES =====
function addFlipStyles() {
    const columns = getColumnCount();
    const styleId = 'flip-animation-styles';
    
    // Remove existing styles
    const existingStyles = document.getElementById(styleId);
    if (existingStyles) {
        existingStyles.remove();
    }
    
    const styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    
    // Choose animation name based on column count
    const animationName = columns >= 2 ? 'flipDiagonal' : 'flipHorizontal';
    
    // Convert ms to seconds for CSS
    const flipDurationSec = ANIMATION_CONFIG.FLIP_DURATION / 1000;
    const fadeDurationSec = ANIMATION_CONFIG.FADE_DURATION / 1000;
    
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
            transition: filter ${fadeDurationSec}s cubic-bezier(0.42, 0, 0.58, 1);
        }
        
        .project-tile.flip-diagonal {
            animation: ${animationName} ${flipDurationSec}s ease-in-out;
            box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        
        .project-tile * {
            backface-visibility: visible;
        }
    `;
    document.head.appendChild(styleSheet);
}
