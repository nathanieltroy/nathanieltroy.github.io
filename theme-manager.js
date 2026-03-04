// theme-manager.js
document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            console.log('========== THEME TOGGLE CLICKED ==========');
            
            // Log BEFORE any changes
            const beforeTheme = localStorage.getItem('theme');
            const beforeClass = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
            console.log('📦 BEFORE - localStorage.getItem("theme"):', beforeTheme);
            console.log('🎨 BEFORE - Current page theme class:', beforeClass);
            console.log('🔘 Toggle button pressed - changing theme...');
            
            // Toggle the theme
            document.documentElement.classList.toggle('dark-theme');
            
            // Save to localStorage
            const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            
            // Log AFTER changes
            const afterTheme = localStorage.getItem('theme');
            const afterClass = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
            console.log('💾 AFTER - localStorage.setItem("theme", "' + currentTheme + '") executed');
            console.log('📦 AFTER - localStorage.getItem("theme"):', afterTheme);
            console.log('🎨 AFTER - Current page theme class:', afterClass);
            console.log('==========================================');
        });
        
        // Also log the initial state when page loads
        console.log('========== PAGE LOADED ==========');
        console.log('📍 Page:', window.location.href);
        console.log('📦 localStorage.getItem("theme"):', localStorage.getItem('theme'));
        console.log('🎨 Applied theme class:', document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light');
        console.log('================================');
    }
});