// projects-data.js
// ===== PROJECTS DATA =====
const projectsData = [
    {
        id: 'genetic-ai-ipd',
        title: 'AI: Iterated Prisoner\'s Dilemna',
        skills: ['Python', 'AI', 'Data Visualisation'],
        description: 'Used genetic algorithms to evolve strategies for the Iterated Prisoner\'s Dilemna. Analysed role of mutation rates, memory, population sizes, and random noise on strategy efficacy.',
        images: [
            'images/genetic algorithm/image 1.jpeg',
            'images/genetic algorithm/image 1.png',
            'images/genetic algorithm/image 2.png',
            'images/genetic algorithm/image 2.jpeg'
        ]
    },
    {
        id: 'fyp',
        title: 'Predicting Life Satisfaction Using a Neural Network',
        skills: ['R', 'Neural Networks', 'Data Visualisation'],
        description: 'Built a feedforward neural network using Keras (tensorflow) in R to predict life satisfaction of Europeans using health and socioeconomic data as part of a final year project',
        images: [
            'images/fyp/image1.jpg',
            'images/fyp/image2.jpg',
            'images/fyp/image3.jpg',
            'images/fyp/image4.jpg'
        ]
    },
    {
        id: 'nlp-sentiment',
        title: 'Sentiment Analysis',
        skills: ['Python', 'Neural Networks', 'Statistical Inference'],
        description: 'Fine-tuned BERT model to analyze customer reviews with 92% accuracy. Deployed as API for real-time sentiment monitoring of social media mentions.',
        images: [
            'images/nlp/image1.jpg',
            'images/nlp/image2.jpg',
            'images/nlp/image3.jpg',
            'images/nlp/image4.jpg'
        ]
    },
    {
        id: 'recommendation',
        title: 'Recommendation Engine',
        skills: ['Python', 'SQL', 'Model Evaluation'],
        description: 'Built collaborative filtering model for e-commerce platform with 10M+ users. Increased average order value by 15% through personalized recommendations.',
        images: [
            'images/recommendation/image1.jpg',
            'images/recommendation/image2.jpg',
            'images/recommendation/image3.jpg',
            'images/recommendation/image4.jpg'
        ]
    },
    {
        id: 'churn-prediction',
        title: 'Customer Churn Prediction',
        skills: ['R', 'Supervised ML', 'Data Visualisation'],
        description: 'Developed a logistic regression model to predict customer churn with 88% accuracy, enabling proactive retention campaigns that reduced churn by 25%.',
        images: [
            'images/churn/image1.jpg',
            'images/churn/image2.jpg',
            'images/churn/image3.jpg',
            'images/churn/image4.jpg'
        ]
    },
    {
        id: 'ab-testing',
        title: 'A/B Testing Framework',
        skills: ['Python', 'Hypothesis Testing', 'Statistical Inference'],
        description: 'Built an automated A/B testing platform that handles sample size calculation, test execution, and result analysis with proper statistical controls.',
        images: [
            'images/abtesting/image1.jpg',
            'images/abtesting/image2.jpg',
            'images/abtesting/image3.jpg',
            'images/abtesting/image4.jpg'
        ]
    },
    {
        id: 'image-classification',
        title: 'Image Classification',
        skills: ['Python', 'Neural Networks', 'Model Evaluation'],
        description: 'Implemented a CNN using TensorFlow to classify medical images with 94% accuracy, assisting radiologists in early disease detection.',
        images: [
            'images/classification/image1.jpg',
            'images/classification/image2.jpg',
            'images/classification/image3.jpg',
            'images/classification/image4.jpg'
        ]
    },
    {
        id: 'time-series',
        title: 'Stock Market Analysis',
        skills: ['Python', 'Supervised ML', 'Data Visualisation'],
        description: 'Created time series models to analyze and predict stock market trends using ARIMA and Prophet, with interactive dashboards for visualization.',
        images: [
            'images/timeseries/image1.jpg',
            'images/timeseries/image2.jpg',
            'images/timeseries/image3.jpg',
            'images/timeseries/image4.jpg'
        ]
    },
    {
        id: 'nlp-summarization',
        title: 'Text Summarization',
        skills: ['Python', 'Neural Networks', 'Statistical Inference'],
        description: 'Developed an extractive text summarization system using BERT embeddings, achieving ROUGE scores comparable to state-of-the-art models.',
        images: [
            'images/summarization/image1.jpg',
            'images/summarization/image2.jpg',
            'images/summarization/image3.jpg',
            'images/summarization/image4.jpg'
        ]
    }
];

// Make sure it's available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData; // For Node.js environments
}