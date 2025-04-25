// js/03_detect.js

document.addEventListener('DOMContentLoaded', () => {
    // References for split display
    const weightIntegerElement = document.getElementById('weightInteger');
    const weightDecimalElement = document.getElementById('weightDecimal');
    const weightDisplayContainer = document.getElementById('weightDisplayContainer'); // Container for color
    // Removed progress bar reference

    // Simulation parameters
    const startDelay = 1000;
    const simulationDuration = 2500;
    const updateInterval = 50;
    const targetWeight = 75.3;
    const steps = simulationDuration / updateInterval;
    const weightIncrement = targetWeight / steps;
    let currentWeight = 0;
    let stepCount = 0;

    // Color settings
    const colorClasses = ['text-blue-400', 'text-cyan-400', 'text-green-400', 'text-yellow-400', 'text-orange-400', 'text-red-500'];
    const weightThresholds = [15, 30, 45, 60, 75];

    function updateSimulation() {
        stepCount++;
        currentWeight += weightIncrement;
        // Removed progressPercent calculation
        let displayedWeight = (Math.round(currentWeight * 20) / 20); // Snap to 0.05

        if (currentWeight >= targetWeight) {
            currentWeight = targetWeight;
            displayedWeight = targetWeight;
            clearInterval(simulationInterval);

            updateWeightElements(displayedWeight); // Update final display
            setColorClass(currentWeight);
            // Removed progress bar update

            // Navigate to user selection screen
            setTimeout(() => { window.location.href = '04_User_Selection.html'; }, 750);
            return;
        }

        updateWeightElements(displayedWeight); // Update split display
        setColorClass(currentWeight); // Update color based on smooth weight
        // Removed progress bar update
    }

    // Function to update separate integer and decimal elements
    function updateWeightElements(weight) {
        const weightString = weight.toFixed(2);
        const parts = weightString.split('.');
        const integerPart = parts[0];
        const decimalPart = '.' + (parts[1] || '00'); // Prepend dot

        if (weightIntegerElement) weightIntegerElement.textContent = integerPart;
        if (weightDecimalElement) weightDecimalElement.textContent = decimalPart;
    }

    // setColorClass applies color to the container
    function setColorClass(weight) {
        let colorIndex = 0;
        for (let i = 0; i < weightThresholds.length; i++) {
            if (weight > weightThresholds[i]) { colorIndex = i + 1; } else { break; }
        }
        colorIndex = Math.min(colorIndex, colorClasses.length - 1);
        if (weightDisplayContainer) {
            colorClasses.forEach(cls => weightDisplayContainer.classList.remove(cls));
            weightDisplayContainer.classList.add(colorClasses[colorIndex]);
        }
    }

    let simulationInterval;
    // Set initial display to "0" and ".00"
    updateWeightElements(0);
    // Start simulation after delay
    simulationInterval = setTimeout(() => {
        // Check if elements exist before starting interval
         if (weightIntegerElement && weightDecimalElement && weightDisplayContainer) {
            simulationInterval = setInterval(updateSimulation, updateInterval);
         }
    }, startDelay);

});
