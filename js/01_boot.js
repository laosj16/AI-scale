// js/01_boot.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements needed for this page
    const dotsContainer = document.getElementById('dotsContainer');
    const welcomeText = document.getElementById('welcomeText');

    // Animation cycle duration (must match CSS animation duration)
    const animationCycleDuration = 2000; // 2 seconds in milliseconds
    const cyclesToRun = 2;
    const textAppearDelay = animationCycleDuration * cyclesToRun; // Delay before showing text (e.g., 4000ms)
    const navigationDelay = 1500; // Delay after text appears before navigating (e.g., 1.5 seconds)

    // 1. Show text after 2 animation cycles
    setTimeout(() => {
        // Make text visible
        if (welcomeText) {
            welcomeText.classList.remove('opacity-0');
            welcomeText.classList.add('opacity-100');
        }

        // Optional: Pause the dots animation
        if (dotsContainer) {
            dotsContainer.style.animationPlayState = 'paused';
        }

        // 2. Navigate after text has been shown for a while
        setTimeout(() => {
            // Basic check to prevent navigation if user already left the page
             const currentPath = window.location.pathname;
             // Be more specific if possible, e.g. check for the exact filename
             if (currentPath.includes('01_Boot_Welcome.html') || currentPath === '/') {
                window.location.href = '02_Idle_Ready.html';
             }
        }, navigationDelay);

    }, textAppearDelay);
});
