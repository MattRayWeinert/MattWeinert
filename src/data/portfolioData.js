import balder from '../assets/balder.png';
import showMarket from '../assets/show-market.png';
import camera from '../assets/camera.png';
import twoters from '../assets/twoters.png';
import dodge from '../assets/dodge.png';
import portfolio from '../assets/portfolio.png';

export const portfolioItems = [
    {
        id: 'surveillance',
        title: 'Smart-Hub Security System',
        image: camera,
        alt: 'Smart-Hub Security System',
        link: 'https://www.youtube.com/watch?v=HvO5HcZntn8',
        linkLabel: 'watch demo',
        featured: true,
        description: 'Multidisciplinary IoT smart-hub on Raspberry Pi with OpenCV human detection, MicroPython sensors, and a PyQt5 desktop UI for real-time monitoring and alerts.',
        technologies: ['Python', 'OpenCV', 'PyQt5', 'Raspberry Pi', 'MicroPython']
    },
    {
        id: 'skedit',
        title: 'Skedit',
        image: showMarket,
        alt: 'Skedit CRM / Field Service platform',
        link: 'https://www.skedit.app',
        linkLabel: 'view app',
        featured: true,
        description: 'Full-stack CRM and Field Service Management platform connecting consumers with local businesses. Expo / React Native mobile apps backed by a Node/TypeScript API with Fastify, Prisma, and Postgres.',
        technologies: ['Expo', 'React Native', 'TypeScript', 'Fastify', 'Prisma', 'Postgres']
    },
    {
        id: 'baldr',
        title: 'Baldr',
        image: balder,
        alt: 'Baldr trading interface',
        link: null,
        featured: true,
        private: true,
        description: 'Private futures trading and backtesting tool with multi-timeframe indicators, EMA analysis, and real-time market insights. Built with Python (pandas/yfinance) and a React front end.',
        technologies: ['Python', 'React', 'JavaScript', 'pandas']
    },
    {
        id: 'stream-echo',
        title: 'stream-echo',
        alt: 'stream-echo Twitch chat toolkit',
        repo: 'MattRayWeinert/stream-echo',
        link: 'https://github.com/MattRayWeinert/stream-echo',
        linkLabel: 'view on GitHub',
        featured: true,
        description: 'Twitch chat toolkit for streamers — mirror chatters across accounts, multi-account send, and chatbot helpers for live sessions.',
        technologies: ['Python', 'Twitch', 'asyncio']
    },
    {
        id: 'java-dojo',
        title: 'java-dojo',
        alt: 'java-dojo LeetCode practice IDE',
        repo: 'MattRayWeinert/java-dojo',
        link: 'https://github.com/MattRayWeinert/java-dojo',
        linkLabel: 'view on GitHub',
        featured: true,
        description: 'LeetCode-style Java practice environment with Monaco IDE, IntelliSense, and a local javac/java runner for solving problems in the browser.',
        technologies: ['TypeScript', 'Monaco', 'Java', 'Node']
    },
    {
        id: 'castle-sense',
        title: 'castle-sense',
        alt: 'castle-sense chess coaching extension',
        repo: 'MattRayWeinert/castle-sense',
        link: 'https://github.com/MattRayWeinert/castle-sense',
        linkLabel: 'view on GitHub',
        featured: true,
        description: 'Chrome extension for live-board chess coaching using local Stockfish with plain-English explanations of moves and positions.',
        technologies: ['JavaScript', 'Chrome Extension', 'Stockfish']
    },
    {
        id: 'portfolio',
        title: 'Portfolio Website',
        image: portfolio,
        alt: 'Portfolio Website',
        repo: 'MattRayWeinert/MattWeinert',
        link: 'https://github.com/MattRayWeinert/MattWeinert',
        linkLabel: 'view on GitHub',
        description: 'Personal portfolio with a terminal-inspired UI, interactive Q&A assistant grounded in experience data, and EmailJS contact. Deployed at mattweinert.com.',
        technologies: ['React', 'JavaScript', 'CSS', 'EmailJS']
    },
    {
        id: 'twoters',
        title: 'Twoters',
        image: twoters,
        alt: 'Twoters',
        repo: 'MattRayWeinert/twoters',
        link: 'https://github.com/MattRayWeinert/twoters',
        linkLabel: 'view on GitHub',
        description: 'MERN stack collaborative learning platform for students with authentication, profiles, posts, and search.',
        technologies: ['React', 'MongoDB', 'Express', 'Node']
    },
    {
        id: 'dodge',
        title: 'Dodge',
        image: dodge,
        alt: 'Dodge',
        repo: 'MattRayWeinert/Dodge',
        link: 'https://github.com/MattRayWeinert/Dodge',
        linkLabel: 'view on GitHub',
        description: 'Survival game with a custom tick-based engine and Java JFrame GUI where players dodge increasingly dangerous obstacles.',
        technologies: ['Java']
    }
];

export const getPortfolioItem = (id) => portfolioItems.find((item) => item.id === id);

export const getGithubRepo = (project) => {
    if (!project) return null;
    if (project.repo) return project.repo;
    if (!project.link) return null;
    const match = project.link.match(/github\.com\/([^/]+\/[^/#?]+)/i);
    return match ? match[1].replace(/\.git$/i, '') : null;
};

export const getYoutubeEmbedId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    return match ? match[1] : null;
};
