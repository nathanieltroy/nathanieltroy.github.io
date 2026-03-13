// ===== PROJECTS DATA =====
const projectsData = [
    {
        id: 'genetic-ai-ipd',
        title: 'AI: Iterated Prisoner\'s Dilemna',
        subtitle: 'Evolving strategies for the famous game theory problem using genetic algorithms',
        date: 'March 2025',
        githubUrl: 'https://github.com/nathanieltroy/Genetic-Algorithms-Iterated-Prisoners-Dilemma',
        skills: ['Python', 'AI', 'Data Visualisation'],
        images: [
            'images/projects/genetic algorithm/image 1.jpeg',
            'images/projects/genetic algorithm/image 1.png',
            'images/projects/genetic algorithm/image 2.png',
            'images/projects/genetic algorithm/image 2.jpeg'
        ],
        featuredImage: 'images/projects/genetic algorithm/image 1.jpeg',
        pullQuote: "The most elegant solutions often emerge from the simplest observations about the problem at hand.",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `This is where you'll write a comprehensive overview of the project. Explain the problem you were solving, the goals
                     you set out to achieve, and the overall approach you took. This section should give readers a clear understanding of what the project is
                      about and why it matters. The typography is set to be highly readable with the Montserrat font family you've chosen for body text, and
                       the line height is optimized for comfortable reading.` },
                
                { type: 'pullQuote', text: 'The most elegant solutions often emerge from the simplest observations about the problem at hand.' },
                
                { type: 'heading', text: 'Technical Deep Dive', level: 'h2' },
                { type: 'paragraph', text: `Deep dive into the technical aspects of your project. Discuss the technologies, frameworks, and methodologies
                     you used. This is where you can showcase your technical expertise while maintaining the article's narrative flow. The key is to explain
                      complex concepts in accessible language without oversimplifying.` },
                
                { type: 'image', src: 'images/projects/genetic algorithm/image 1.png', caption: 'Figure 1: Initial algorithm visualization' },
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: 'Describe the first key feature and its importance. Explain how it solves a particular problem and why you chose this approach.' },
                    { title: 'Feature Two', description: 'The second key feature builds on the first, adding functionality that transforms the project from a simple solution into something truly innovative.' }
                ]},
                
                { type: 'image', src: 'images/projects/genetic algorithm/image 2.png', caption: 'Figure 2: Performance comparison' },
                
                { type: 'heading', text: 'Results', level: 'h2' },
                { type: 'paragraph', text: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.` },
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` }
            ]
        }
    },
    
    {
        id: 'fyp',
        title: 'Neural Networks: Predicting Life Satisfaction',
        subtitle: 'Using health and socioeconomic indicators to predict life satisfaction across Europe',
        date: 'May 2024',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        skills: ['R', 'Neural Networks', 'Data Wrangling'],
        images: [
            'images/projects/fyp/image1.png',
            'images/projects/fyp/image2.jpg',
            'images/projects/fyp/image3.jpg',
            'images/projects/fyp/image4.jpg'
        ],
        featuredImage: 'images/projects/fyp/image1.png',
        pullQuote: "Neural networks can reveal hidden patterns in how we live and what makes us happy.",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project.` },
                
                { type: 'pullQuote', text: 'Neural networks can reveal hidden patterns in how we live and what makes us happy.' },
                
                { type: 'image', src: 'images/projects/fyp/image2.jpg', caption: 'Figure 1: Neural network architecture' },
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: '' },
                    { title: 'Feature Two', description: '' }
                ]},
                
                { type: 'image-grid', images: [
                    { src: 'images/projects/fyp/image3.jpg', alt: 'Data visualization 1' },
                    { src: 'images/projects/fyp/image4.jpg', alt: 'Data visualization 2' }
                ]},
                
                { type: 'heading', text: 'Results', level: 'h2' },
                { type: 'paragraph', text: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.` },
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` }
            ]
        }
    },

    {
        id: 'portfolio-website',
        title: 'Building this Website Portfolio',
        subtitle: `With the assistance of LLMs, I built my first fully functional portfolio website to showcase previous projects I have worked on and showcase the skills I have developed from each. Built using HTML, CSS, and JavaScript, all of which was my first time writing code with.`,
        date: 'March 2026',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        skills: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design'],
        images: [
            'images/projects/portfolio website/image1.jpg',
            'images/projects/portfolio website/image2.png',
            'images/projects/portfolio website/image3.png',
            'images/projects/portfolio website/image4.png'
        ],
        featuredImage: 'images/projects/portfolio website/image1.jpg',
        pullQuote: "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `I have always loved design. As a data scientist, much of my work is analytical, whether that be problem solving using code or statistically testing data. I studied a module in my final year of college called Human Computer Interaction where I was introduced to the history of product design and how modern user interfaces on websites and applications are built on these fundamental concepts. I drew parallels from this to how we communicate data in the analysis industry and a lot of the same core principles overlap. Building this website was a fun challenge that allowed me to feed my desire to design while also developing relevant data communication skills for my career.` },
                
                { type: 'image', src: 'images/projects/portfolio website/image2.png', caption: 'Figure 1: Initial wireframe design' },
                
                { type: 'heading', text: 'Functionality', level: 'h2' },
                { type: 'paragraph', text: `The most important aspect of a modern userface is its ease of use.` },
                
                { type: 'heading', text: 'Aesthetics', level: 'h2' },
                { type: 'paragraph', text: `Aesthetics play a huge but often underappreciated role in the speed that a user can take in information.` },
                
                { type: 'pullQuote', text: 'Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs' },
                
                { type: 'heading', text: 'Technical Deep Dive', level: 'h2' },
                { type: 'paragraph', text: `HTML, CSS, and JavaScript` },
                
                { type: 'image', src: 'images/projects/portfolio website/image3.png', caption: 'Figure 2: Component structure' },
                
                { type: 'heading', text: 'AI Assistance', level: 'h2' },
                { type: 'paragraph', text: `I have used large language models since they ` },
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: '' },
                    { title: 'Feature Two', description: '' }
                ]},
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'image', src: 'images/projects/portfolio website/image4.png', caption: 'Figure 3: Final implementation' },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` },
                
                { type: 'heading', text: 'Remarks', level: 'h2' },
                { type: 'paragraph', text: `` }
            ]
        }
    },

    {
        id: 'exercise-effect-bg',
        title: 'Bayesian Analysis of Exercise and Blood Glucose Levels',
        subtitle: 'Using personal health and biometric data to measure the effect of different levels of exercise on blood glucose levels in diabetics',
        date: 'December 2024',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        skills: ['R', 'Bayesian Statistics', 'Data Visualisation'],
        images: [
            'images/projects/bayesian diabetes/image1.png',
            'images/projects/bayesian diabetes/image2.png',
            'images/projects/bayesian diabetes/image3.jpg',
            'images/projects/bayesian diabetes/image4.jpeg'
        ],
        featuredImage: 'images/projects/bayesian diabetes/image1.png',
        pullQuote: "Bayesian methods provide a natural framework for understanding uncertainty in health data.",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project.` },
                
                { type: 'pullQuote', text: 'Bayesian methods provide a natural framework for understanding uncertainty in health data.' },
                
                { type: 'image', src: 'images/projects/bayesian diabetes/image1.png', caption: 'Figure 1: Prior and posterior distributions' },
                
                { type: 'heading', text: 'Technical Deep Dive', level: 'h2' },
                { type: 'paragraph', text: `` },
                
                { type: 'image', src: 'images/projects/bayesian diabetes/image2.png', caption: 'Figure 2: MCMC trace plots' },
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: '' },
                    { title: 'Feature Two', description: '' }
                ]},
                
                { type: 'image-grid', images: [
                    { src: 'images/projects/bayesian diabetes/image3.jpg', alt: 'Results visualization 1' },
                    { src: 'images/projects/bayesian diabetes/image4.jpeg', alt: 'Results visualization 2' }
                ]},
                
                { type: 'heading', text: 'Results', level: 'h2' },
                { type: 'paragraph', text: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.` },
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` }
            ]
        }
    },

    {
        id: 'intro-ml',
        title: 'Machine Learning: Estimating Steel Strength',
        subtitle: 'Using ML classification and regression techniques in the context of material science',
        date: 'May 2024',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        skills: ['Python', 'Machine Learning'],
        images: [
            'images/projects/intro ml/image 1.jpeg',
            'images/projects/intro ml/image 2.jpeg',
            'images/projects/intro ml/image 3.png',
            'images/projects/intro ml/image 4.png'
        ],
        featuredImage: 'images/projects/intro ml/image 1.jpeg',
        pullQuote: "Machine learning can uncover complex relationships in material properties that traditional methods miss.",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project.` },
                
                { type: 'pullQuote', text: 'Machine learning can uncover complex relationships in material properties that traditional methods miss.' },
                
                { type: 'image', src: 'images/projects/intro ml/image 1.jpeg', caption: 'Figure 1: Steel microstructure samples' },
                
                { type: 'heading', text: 'Technical Deep Dive', level: 'h2' },
                { type: 'paragraph', text: `` },
                
                { type: 'image-grid', images: [
                    { src: 'images/projects/intro ml/image 2.jpeg', alt: 'Feature importance' },
                    { src: 'images/projects/intro ml/image 3.png', alt: 'Model performance' }
                ]},
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: '' },
                    { title: 'Feature Two', description: '' }
                ]},
                
                { type: 'image', src: 'images/projects/intro ml/image 4.png', caption: 'Figure 2: Prediction vs actual' },
                
                { type: 'heading', text: 'Results', level: 'h2' },
                { type: 'paragraph', text: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.` },
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` }
            ]
        }
    },
    
    {
        id: 'bipartite-graph-matching',
        title: 'Network Analysis: Bipartite Matching Algorithms',
        subtitle: 'Using health and socioeconomic data to understand well-being',
        date: 'April 2024',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        skills: ['C++', 'Python', 'Data Visualisation'],
        images: [
            'images/projects/bipartite matching/image1.png',
            'images/projects/bipartite matching/image2.png',
            'images/projects/bipartite matching/image3.jpg',
            'images/projects/bipartite matching/image4.jpeg'
        ],
        featuredImage: 'images/projects/bipartite matching/image1.png',
        pullQuote: "Network algorithms reveal the hidden connections that shape our world.",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project.` },
                
                { type: 'pullQuote', text: 'Network algorithms reveal the hidden connections that shape our world.' },
                
                { type: 'image', src: 'images/projects/bipartite matching/image1.png', caption: 'Figure 1: Bipartite graph structure' },
                
                { type: 'heading', text: 'Technical Deep Dive', level: 'h2' },
                { type: 'paragraph', text: `` },
                
                { type: 'image', src: 'images/projects/bipartite matching/image2.png', caption: 'Figure 2: Matching algorithm visualization' },
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: '' },
                    { title: 'Feature Two', description: '' }
                ]},
                
                { type: 'image-grid', images: [
                    { src: 'images/projects/bipartite matching/image3.jpg', alt: 'Performance comparison' },
                    { src: 'images/projects/bipartite matching/image4.jpeg', alt: 'Scale testing' }
                ]},
                
                { type: 'heading', text: 'Results', level: 'h2' },
                { type: 'paragraph', text: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.` },
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` }
            ]
        }
    },

    {
        id: 'causal-inference-dutch-study',
        title: 'Estimating Causal Effects of Child Brain Development',
        subtitle: 'Using health and socioeconomic data to understand well-being',
        date: 'April 2024',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        skills: ['R', 'Causal Inference', 'Hypothesis Testing'],
        images: [
            'images/projects/causal effects study/image1.jpg',
            'images/projects/causal effects study/image2.jpg',
            'images/projects/causal effects study/image3.jpg',
            'images/projects/causal effects study/image4.jpg'
        ],
        featuredImage: 'images/projects/causal effects study/image1.jpg',
        pullQuote: "Causal inference helps us move beyond correlation to understand what truly drives outcomes.",
        content: {
            sections: [
                { type: 'heading', text: 'Overview', level: 'h2' },
                { type: 'paragraph', text: `Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project.` },
                
                { type: 'pullQuote', text: 'Causal inference helps us move beyond correlation to understand what truly drives outcomes.' },
                
                { type: 'image', src: 'images/projects/causal effects study/image1.jpg', caption: 'Figure 1: Study design' },
                
                { type: 'heading', text: 'Technical Deep Dive', level: 'h2' },
                { type: 'paragraph', text: `` },
                
                { type: 'image-grid', images: [
                    { src: 'images/projects/causal effects study/image2.jpg', alt: 'Causal diagram' },
                    { src: 'images/projects/causal effects study/image3.jpg', alt: 'Effect estimates' }
                ]},
                
                { type: 'heading', text: 'Key Features', level: 'h2' },
                { type: 'feature-list', features: [
                    { title: 'Feature One', description: '' },
                    { title: 'Feature Two', description: '' }
                ]},
                
                { type: 'image', src: 'images/projects/causal effects study/image4.jpg', caption: 'Figure 2: Sensitivity analysis' },
                
                { type: 'heading', text: 'Results', level: 'h2' },
                { type: 'paragraph', text: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.` },
                
                { type: 'heading', text: 'Challenges', level: 'h2' },
                { type: 'paragraph', text: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.` },
                
                { type: 'heading', text: 'Future Work', level: 'h2' },
                { type: 'paragraph', text: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.` }
            ]
        }
    }
];

// Make sure it's available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
}