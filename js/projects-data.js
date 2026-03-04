// ===== PROJECTS DATA =====
const projectsData = [
    {
        id: 'genetic-ai-ipd',
        title: 'AI: Iterated Prisoner\'s Dilemna',
        subtitle: 'Evolving cooperative strategies through genetic algorithms',
        date: 'January 2024',
        githubUrl: 'https://github.com/nathanieltroy/genetic-ai-ipd',
        featuredImage: 'images/projects/genetic algorithm/image 1.jpeg',
        content: {
            overview: `This is where you'll write a comprehensive overview of the project. Explain the problem you were solving, the goals you set out to achieve, and the overall approach you took. This section should give readers a clear understanding of what the project is about and why it matters. The typography is set to be highly readable with the Montserrat font family you've chosen for body text, and the line height is optimized for comfortable reading.`,
            
            technicalDeepDive: `Deep dive into the technical aspects of your project. Discuss the technologies, frameworks, and methodologies you used. This is where you can showcase your technical expertise while maintaining the article's narrative flow. The key is to explain complex concepts in accessible language without oversimplifying.`,
            
            keyFeatures: [
                {
                    title: "Feature One",
                    description: "Describe the first key feature and its importance. Explain how it solves a particular problem and why you chose this approach."
                },
                {
                    title: "Feature Two",
                    description: "The second key feature builds on the first, adding functionality that transforms the project from a simple solution into something truly innovative."
                }
            ],
            
            results: `Share the results of your project. What did you achieve? What metrics improved? Include any relevant data, charts, or feedback you received.`,
            
            challenges: `Every project has challenges. Discuss what obstacles you faced and how you overcame them. This shows your problem-solving skills and resilience.`,
            
            futureWork: `Discuss potential improvements, extensions, or related projects you're considering. This shows forward-thinking and continuous improvement.`
        },
        pullQuote: "The most elegant solutions often emerge from the simplest observations about the problem at hand.",
        skills: ['Python', 'AI', 'Data Visualisation'],
        images: [
            'images/projects/genetic algorithm/image 1.jpeg',
            'images/projects/genetic algorithm/image 1.png',
            'images/projects/genetic algorithm/image 2.png',
            'images/projects/genetic algorithm/image 2.jpeg'
        ]
    },
    
    {
        id: 'fyp',
        title: 'Predicting Life Satisfaction Using a Neural Network',
        subtitle: 'Using health and socioeconomic data to understand well-being',
        date: 'May 2024',
        githubUrl: 'https://github.com/nathanieltroy/fyp',
        featuredImage: 'images/projects/fyp/image1.jpg',
        content: {
            overview: `Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project.`,
            // Add similar content structure for other projects
        },
        pullQuote: "Neural networks can reveal hidden patterns in how we live and what makes us happy.",
        skills: ['R', 'Neural Networks', 'Data Visualisation'],
        images: [
            'images/projects/fyp/image1.jpg',
            'images/projects/fyp/image2.jpg',
            'images/projects/fyp/image3.jpg',
            'images/projects/fyp/image4.jpg'
        ]
    },
    
];

// Make sure it's available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
}