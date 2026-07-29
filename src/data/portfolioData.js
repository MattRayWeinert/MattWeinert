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
        description: 'Multidisciplinary IoT smart-hub on Raspberry Pi with OpenCV human detection, MicroPython sensors, and a PyQt5 desktop UI for real-time monitoring and alerts.',
        technologies: ['Python', 'OpenCV', 'PyQt5', 'Raspberry Pi', 'MicroPython']
    },
    {
        id: 'exas',
        title: 'Exas',
        image: showMarket,
        alt: 'Exas CRM / Field Service platform',
        link: null,
        description: 'Full-stack CRM and Field Service Management platform connecting consumers with local businesses. React Native mobile apps for iOS/Android with Spring Boot REST APIs and AWS cloud infrastructure.',
        technologies: ['React Native', 'Spring Boot', 'TypeScript', 'Java', 'AWS']
    },
    {
        id: 'baldr',
        title: 'Baldr',
        image: balder,
        alt: 'Baldr trading interface',
        link: null,
        description: 'Futures trading and backtesting tool with multi-timeframe indicators, EMA analysis, and real-time market insights. Built with Python (pandas/yfinance) and a React front end. Code available on request.',
        technologies: ['Python', 'React', 'JavaScript', 'pandas']
    },
    {
        id: 'portfolio',
        title: 'Portfolio Website',
        image: portfolio,
        alt: 'Portfolio Website',
        link: 'https://github.com/MattRayWeinert/MattWeinert',
        description: 'Personal portfolio with a terminal-inspired UI, interactive Q&A assistant grounded in experience data, and EmailJS contact. Deployed at mattweinert.com.',
        technologies: ['React', 'JavaScript', 'CSS', 'EmailJS']
    },
    {
        id: 'twoters',
        title: 'Twoters',
        image: twoters,
        alt: 'Twoters',
        link: 'https://github.com/MattRayWeinert/twoters',
        description: 'MERN stack collaborative learning platform for students with authentication, profiles, posts, and search.',
        technologies: ['React', 'MongoDB', 'Express', 'Node']
    },
    {
        id: 'dodge',
        title: 'Dodge',
        image: dodge,
        alt: 'Dodge',
        link: 'https://github.com/MattRayWeinert/Dodge',
        description: 'Survival game with a custom tick-based engine and Java JFrame GUI where players dodge increasingly dangerous obstacles.',
        technologies: ['Java']
    }
];
