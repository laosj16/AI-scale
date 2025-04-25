// js/04_measure.js
// Using requestAnimationFrame for 3-second count-up animation

const progressBar = document.getElementById('progressBarInnerMeasuring');

if (!progressBar) {
    console.error("Progress bar element #progressBarInnerMeasuring not found.");
} else {
    console.log("Progress bar element found. Initializing rAF count-up animation."); // Debug Log
    const animationDuration = 3000; // 3 seconds
    const navigationDelay = 500; // 0.5 seconds after completion
    let startTime = null;
    let animationFrameId = null;

    function animateProgress(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        // Calculate progress: 0 to 1 over animationDuration
        let progress = Math.min(elapsedTime / animationDuration, 1);

        // Ensure progressBar still exists before updating
        if(progressBar) {
             const newWidth = progress * 100;
             progressBar.style.width = `${newWidth}%`; // Update width
             // console.log(`Measure Time: ${elapsedTime.toFixed(0)}ms, Width: ${newWidth.toFixed(1)}%`); // Optional detailed log
        } else {
             if(animationFrameId) cancelAnimationFrame(animationFrameId);
             console.error("Progress bar element disappeared during animation.");
             return;
        }

        if (elapsedTime < animationDuration) {
            animationFrameId = requestAnimationFrame(animateProgress); // Continue animation
        } else {
            // Animation finished
            console.log("Measuring animation finished."); // Debug Log
            if(progressBar) progressBar.style.width = '100%'; // Ensure 100%
            animationFrameId = null;

            // Navigate to next screen after delay
            console.log(`Navigating to 05_Results_Primary.html in ${navigationDelay}ms...`); // Debug Log
            setTimeout(() => {
                 const currentPath = window.location.pathname;
                 if (currentPath.includes('04_Measuring.html')) {
                    console.log("Executing navigation from Measuring."); // Debug Log
                    window.location.href = '05_Results_Primary.html';
                 } else {
                    console.log("Navigation skipped from Measuring, path changed:", currentPath);
                 }
            }, navigationDelay);
        }
    }

    // Start the animation
    progressBar.style.width = '0%'; // Set initial width
    console.log("Progress bar initial width set to 0%. Requesting first animation frame for Measuring.");
    // Directly request the first frame to start the loop
    animationFrameId = requestAnimationFrame(animateProgress);

} // End of if(progressBar) block
