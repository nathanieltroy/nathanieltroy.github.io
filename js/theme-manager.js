// theme-manager.js
const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark-theme')) {
        // Switch to light
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});