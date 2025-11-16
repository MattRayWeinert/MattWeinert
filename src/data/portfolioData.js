import balder from '../assets/balder.png';
import showMarket from '../assets/show-market.png';
import camera from '../assets/camera.png';
import twoters from '../assets/twoters.png';
import dodge from '../assets/dodge.png';

export const portfolioItems = [
    {
        id: 'balder',
        title: 'Balder',
        image: balder,
        alt: 'Balder',
        link: null,
        description: 'Futures trading algorithm for scalping trades using pandas and yfinance. Features backtesting capabilities and real-time insights. Code is private on GitHub but available upon request.',
        technologies: ['Python', 'JavaScript', 'React', 'HTML/CSS']
    },
    {
        id: 'show-market',
        title: 'Show Market',
        image: showMarket,
        alt: 'Show Market',
        link: 'https://github.com/MattRayWeinert/show-market',
        description: 'Local marketplace app with user accounts and item listings. Features JWT authentication, Docker containerization, and React frontend with Spring Boot backend.',
        technologies: ['JavaScript', 'React', 'Java', 'Spring Boot', 'SQL']
    },
    {
        id: 'surveillance',
        title: 'Smart Surveillance Hub',
        image: camera,
        alt: 'Smart Surveillance Hub',
        link: 'https://www.ece.ucf.edu/seniordesign/sp2022su2022/g14/',
        description: 'Security system with person detection, video recording, and real-time alerts. Includes a full UI for storing and replaying footage.',
        technologies: ['Python', 'HTML/CSS']
    },
    {
        id: 'twoters',
        title: 'Twoters',
        image: twoters,
        alt: 'Twoters',
        link: 'https://github.com/MattRayWeinert/twoters',
        description: 'MERN stack collaborative learning platform for students. Features authentication, profiles, post creation, and search functionality.',
        technologies: ['React', 'Mongo', 'Express', 'Node']
    },
    {
        id: 'dodge',
        title: 'Dodge',
        image: dodge,
        alt: 'Dodge',
        link: 'https://github.com/MattRayWeinert/Dodge',
        description: 'Survival game where players dodge increasingly dangerous obstacles. Built with a custom tick-based engine and Java JFrame GUI.',
        technologies: ['Java']
    }
];

