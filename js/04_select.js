// js/04_select.js
// Restore full logic, trigger CSS animation via JS style setting

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('carouselSlider');
    const items = slider ? slider.querySelectorAll('.user-item') : [];
    const indicatorProgress = document.getElementById('indicatorProgress'); // Get indicator element
    const totalItems = items.length;
    const itemWidth = 100;
    const itemMargin = 10;
    const containerWidth = 320;

    let currentActiveIndex = 0;
    let randomSwitchTimeoutId = null;
    const randomSwitchMinDelay = 800;
    const randomSwitchMaxDelay = 1500;

    // --- Countdown Indicator Animation (CSS Keyframes defined in HTML) ---
    // We will trigger it via JS setting the 'animation' style property

    // Function to center a specific user index (remains the same)
    function centerUser(index) {
        if (!slider || index < 0 || index >= totalItems) return;
        const itemTotalWidth = itemWidth + itemMargin * 2;
        const offset = (containerWidth / 2) - (index * itemTotalWidth + itemTotalWidth / 2);
        slider.style.transform = `translateX(${offset}px)`;
        items.forEach((item, i) => { item.classList.toggle('active', i === index); });
        currentActiveIndex = index;
    }

    // Function to perform one random switch (remains the same)
    function randomSwitch() {
        let nextIndex = currentActiveIndex;
        if (totalItems > 1) { while (nextIndex === currentActiveIndex) { nextIndex = Math.floor(Math.random() * totalItems); } }
        else { nextIndex = 0; }
        centerUser(nextIndex);
        const randomDelay = Math.random() * (randomSwitchMaxDelay - randomSwitchMinDelay) + randomSwitchMinDelay;
        clearTimeout(randomSwitchTimeoutId);
        randomSwitchTimeoutId = setTimeout(randomSwitch, randomDelay);
    }

    // --- Initial Setup ---
    if (items.length > 0) {
        items.forEach((item, i) => { if (item.classList.contains('active')) { currentActiveIndex = i; }});
        const initialOffset = (containerWidth / 2) - (currentActiveIndex * (itemWidth + itemMargin * 2) + (itemWidth + itemMargin * 2) / 2);
        if(slider) {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${initialOffset}px)`;
        }

        // --- Start Random Switching & Countdown ---
        setTimeout(() => {
            if(slider) slider.style.transition = 'transform 0.5s ease-in-out';
            if (indicatorProgress) {
                 // Ensure starting width is 100% before animation starts
                 indicatorProgress.style.width = '100%';
                 // Apply animation directly via style property
                 console.log("Applying animation style directly to progress bar.");
                 indicatorProgress.style.animation = 'countdown 8s linear forwards';
            } else {
                 console.error("Cannot start countdown animation: indicatorProgress element not found.");
            }
            // Start the random switching loop
            if (totalItems > 0) { randomSwitch(); }
        }, 100); // Small delay
    }


    // --- Countdown End and Auto Selection Logic ---
    // This timeout still runs for 8 seconds, matching the CSS animation duration
    const finalSelectionDelay = 8000;
    const navigationDelay = 1000;

    setTimeout(() => {
        // Stop the random switching loop
        clearTimeout(randomSwitchTimeoutId);
        // No need to stop CSS animation explicitly if using 'forwards' fill mode

        console.log("8s timer finished. Selecting final user.");

        // Find the index of "华仔"
        let targetIndex = -1;
        items.forEach((item, i) => { if (item.dataset.userId === 'huazai') { targetIndex = i; }});
        if (targetIndex === -1 && totalItems > 0) { targetIndex = 0; } // Fallback

        // Center the target user ("华仔") if found
        if (targetIndex !== -1) {
            console.log("Centering target user: 华仔");
            centerUser(targetIndex);
        }

        // Navigate after a short delay
        setTimeout(() => {
            console.log("Navigating to 04_Measuring.html...");
            window.location.href = '04_Measuring.html';
        }, navigationDelay);

    }, finalSelectionDelay);
});
