// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize skills and projects
    initializeSkills();
    initializeProjects();
    
    // Initialize timeline toggles
    initializeTimelineToggles();
    
    // Start the tile animation after a short delay
    setTimeout(() => {
        startTileAnimation();
    }, 1000);
});

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
            
            // Find the timeline item and description
            const timelineItem = this.closest('.timeline-item');
            const description = timelineItem.querySelector('.timeline-description');
            
            if (!description) {
                console.log('No description found for toggle', index);
                return;
            }
            
            // Toggle open class
            this.classList.toggle('open');
            description.classList.toggle('open');
            timelineItem.classList.toggle('has-open-description');
            
            // Update arrow icon
            const icon = this.querySelector('i');
            if (this.classList.contains('open')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                
                // Set max-height for smooth animation
                description.style.maxHeight = description.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                
                // Remove max-height to allow smooth closing
                description.style.maxHeight = '0';
            }
            
            console.log(`Timeline item ${index + 1} toggled:`, this.classList.contains('open') ? 'open' : 'closed');
        });
    });
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
    
    // Extract and count skills from projects
    const skillCount = extractAndCountSkills();
    
    // Sort skills by frequency (most to least)
    const sortedSkills = sortSkillsByFrequency(skillCount);
    
    let selectedSkill = null;
    
    skillsGrid.innerHTML = '';
    
    sortedSkills.forEach(skill => {
        const button = document.createElement('button');
        button.className = 'skill-button';
        button.textContent = skill;
        button.dataset.skill = skill;
        
        // Optional: Add count badge
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

// ===== INITIALIZE PROJECTS =====
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
}

// Updated to use slideshow container structure
function createProjectTile(project) {
    const tile = document.createElement('div');
    tile.className = 'project-tile';
    tile.dataset.projectId = project.id;
    tile.dataset.skills = project.skills.join(',');

    // Make tile clickable
    tile.style.cursor = 'pointer';
    tile.addEventListener('click', function(e) {
        // Don't navigate if clicking on a skill tag (to preserve filtering)
        if (e.target.classList.contains('skill')) {
            e.stopPropagation();
            return;
        }
        window.location.href = `project.html?id=${project.id}`;
    });
    
    // Create slideshow container (keeping original structure)
    const slideshowContainer = document.createElement('div');
    slideshowContainer.className = 'slideshow-container';
    
    // Add slides
    project.images.forEach((imageSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.style.display = 'block';
        else slide.style.display = 'none';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${project.title} - image ${index + 1}`;
        
        slide.appendChild(img);
        slideshowContainer.appendChild(slide);
    });
    
    tile.appendChild(slideshowContainer);
    
    // Create project info overlay
    const info = document.createElement('div');
    info.className = 'project-info';
    
    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;
    
    const skills = document.createElement('div');
    skills.className = 'project-skills';
    project.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill';
        skillTag.textContent = skill;
        skills.appendChild(skillTag);
    });
    
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = project.description;
    
    info.appendChild(title);
    info.appendChild(skills);
    info.appendChild(description);
    
    tile.appendChild(info);
    
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

function startTileAnimation() {
    const tiles = document.querySelectorAll('.project-tile');
    if (tiles.length === 0) return;
    
    addFlipAnimationStyles();
    
    const columns = 3;
    const rows = Math.ceil(tiles.length / columns);
    
    // Store animation state
    let animationInterval;
    let isAnimating = false;
    
    // Pre-calculate wave groups
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

    ANIMATION_DURATION = 1200;
    
    function animateWaveGroup(group, waveIndex) {
        return new Promise(resolve => {
            const startDelay = waveIndex * (ANIMATION_DURATION / 2);
            
            setTimeout(() => {
                group.forEach(tile => {
                    const slides = tile.querySelectorAll('.slide');
                    if (slides.length === 0) return;
                    
                    const currentIndex = getCurrentSlideIndex(tile);
                    const nextIndex = (currentIndex + 1) % slides.length;
                    
                    // Reset all slides first
                    slides.forEach(slide => {
                        slide.style.transition = '';
                        slide.style.filter = 'brightness(1)';
                        slide.classList.remove('fade-to-white', 'fade-from-white');
                    });
                    
                    // Initially, only show the current slide
                    slides.forEach((slide, index) => {
                        slide.style.display = index === currentIndex ? 'block' : 'none';
                    });
                    
                    // Start the flip animation
                    tile.classList.add('flip-diagonal');
                    
                    // Force reflow
                    void tile.offsetWidth;
                    
                    // FIRST HALF: Show current image, fade to white
                    slides[currentIndex].style.display = 'block';
                    slides[currentIndex].style.transition = 'filter 0.6s ease-in-out';
                    
                    requestAnimationFrame(() => {
                        slides[currentIndex].classList.add('fade-to-white');
                    });
                    
                    // MIDPOINT: Switch images
                    setTimeout(() => {
                        // Hide current slide, show next slide at full white
                        slides[currentIndex].style.display = 'none';
                        slides[currentIndex].classList.remove('fade-to-white');
                        
                        slides[nextIndex].style.display = 'block';
                        slides[nextIndex].style.filter = 'brightness(5) blur(2px)'; // Start fully white
                        slides[nextIndex].style.transition = 'filter 0.6s ease-in-out';
                        
                        // Force reflow before starting second half
                        void slides[nextIndex].offsetWidth;
                        
                        // Fade from white to normal
                        requestAnimationFrame(() => {
                            slides[nextIndex].style.filter = 'brightness(1)';
                        });
                        
                    }, ANIMATION_DURATION / 2);
                    
                    // Clean up
                    setTimeout(() => {
                        tile.classList.remove('flip-diagonal');
                        
                        // Ensure only the new slide is visible
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
        
        // Start all groups at their calculated offsets
        const promises = waveGroups.map((group, i) => {
            if (group) {
                return animateWaveGroup(group, i);
            }
        });
        
        // Wait for ALL groups to complete their START delays
        await Promise.all(promises);
        
        // Wait for the longest animation to complete
        const longestDuration = (waveGroups.length - 1) * (ANIMATION_DURATION / 2) + ANIMATION_DURATION;
        setTimeout(() => {
            isAnimating = false;
        }, longestDuration);
    }
        // Start animation with cleanup capability
        animationInterval = setInterval(runAnimationCycle, 6000);
        
        // Return cleanup function
        return () => {
            clearInterval(animationInterval);
            // Reset any inline styles
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
        /* Set up 3D space for each tile */
        .project-tile {
            transform-style: preserve-3d;
            perspective: 1500px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
        }
        
        /* Position slides absolutely for overlay effect during crossfade */
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
            /* Remove display: none from here - we'll control it in JS */
        }

        /* Update first slide rule */
        .project-tile .slide:first-child {
            /* Remove display: block from here - we'll control it in JS */
        }
                
        /* Apply the flip animation */
        .project-tile.flip-diagonal {
            animation: flipDiagonal 1.2s ease-in-out;
            box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
            z-index: 10;
        }
        
        /* Ensure smooth transitions */
        .project-tile * {
            backface-visibility: visible;
        }
    `;
    
    document.head.appendChild(styleSheet);
}