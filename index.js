import { MoodWidget } from './moodWidget.js';
const summerBg = './assets/summer-bg.jpg';
const rainyBg = './assets/rainy-bg.jpg';
const winterBg = './assets/winter-bg.jpg';
const nightForestBg = './assets/night-forest.jpg';
const summerSound = './assets/sounds/summer.mp3';
const rainySound = './assets/sounds/rain.mp3';
const winterSound = './assets/sounds/winter.mp3';
const nightForestSound = './assets/sounds/forest.mp3';
const summerIcon = './assets/icons/sun.svg';
const rainIcon = './assets/icons/cloud-rain.svg';
const snowIcon = './assets/icons/cloud-snow.svg';
const nightForestIcon = './assets/icons/forest.svg';
const data = {
    moods: [
        {
            image: summerBg,
            sound: summerSound,
            icon: summerIcon,
        },
        {
            image: rainyBg,
            sound: rainySound,
            icon: rainIcon,
        },
        {
            image: winterBg,
            sound: winterSound,
            icon: snowIcon,
        },
        {
            image: nightForestBg,
            sound: nightForestSound,
            icon: nightForestIcon,
        },
    ],
    pauseIcon: './assets/icons/pause.svg',
};
new MoodWidget(data).render();
