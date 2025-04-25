// js/05_results.js

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('metricCarousel');
    const chartContainer = document.getElementById('trendChart'); // Get SVG element
    const slides = carousel ? carousel.querySelectorAll('.metric-slide') : [];

    // Check if essential elements exist
    if (!carousel || !chartContainer || slides.length === 0) {
        console.error("Essential elements for results page not found (#metricCarousel, #trendChart, or .metric-slide).");
        return;
    }
     // Check if D3 is loaded
    if (typeof d3 === 'undefined') {
        console.error("D3.js library is not loaded. Make sure the CDN link is correct in the HTML.");
        // Optionally display an error message to the user in the chart area
        chartContainer.innerHTML = '<text x="10" y="20" fill="#9ca3af">无法加载图表库</text>';
        return;
    }


    const totalSlides = slides.length;
    let currentSlideIndex = 0;
    const intervalTime = 1000; // 1 second interval for carousel

    // --- Sample Trend Data (Last 7 entries for each metric) ---
    // Generated plausible-looking sample data
    const trendData = {
        '体重': [75.1, 75.5, 75.2, 75.6, 75.4, 75.8, 75.3], // kg
        '心率': [70, 69, 71, 67, 68, 70, 68],       // bpm
        'BMI': [24.7, 24.9, 24.7, 24.9, 24.8, 25.0, 24.8],
        '体脂率': [18.6, 18.4, 18.5, 18.3, 18.4, 18.2, 18.5], // %
        '肌肉率': [55.1, 55.3, 55.2, 55.4, 55.3, 55.5, 55.2], // %
        '水分率': [60.0, 60.2, 60.1, 60.3, 60.2, 60.4, 60.1], // %
        '健康评分': [86, 84, 85, 87, 86, 88, 85]        // points
    };
    // --- End Sample Data ---

    // --- D3 Chart Drawing Function ---
    function drawChart(metricName, data) {
        // Ensure data is valid and container exists
        if (!data || !Array.isArray(data) || data.length < 2 || !chartContainer) {
             console.warn(`Invalid data or container for metric: ${metricName}`);
             // Optionally clear the chart or display a message
             d3.select(chartContainer).selectAll("*").remove();
             d3.select(chartContainer).append("text")
                .attr("x", 10)
                .attr("y", 20)
                .attr("fill", "#9ca3af")
                .style("font-size", "10px")
                .text("无足够数据");
             return;
        }

        // Select the SVG container and clear previous contents
        const svg = d3.select(chartContainer);
        svg.selectAll("*").remove();

        // Get dimensions (use getBoundingClientRect for responsive size)
        const bounds = chartContainer.getBoundingClientRect();
        // Define minimal margins
        const margin = { top: 10, right: 15, bottom: 5, left: 15 };
        const width = bounds.width - margin.left - margin.right;
        const height = bounds.height - margin.top - margin.bottom;

         // Ensure width and height are positive
        if (width <= 0 || height <= 0) {
            console.error("Chart container has invalid dimensions.");
            return;
        }


        // Create main group element, translated by margins
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        // --- Scales ---
        // X scale (simple index based, 0 to 6 for 7 points)
        const xScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width]);

        // Y scale (dynamic based on data)
        const [minVal, maxVal] = d3.extent(data); // Find min and max
        // Add padding to the y-domain to prevent line touching edges
        const yPadding = (maxVal - minVal) * 0.15 || (maxVal * 0.1) || 1; // Add 15% padding, or 10% of max, or 1 unit if flat/zero
        const yScale = d3.scaleLinear()
            .domain([minVal - yPadding, maxVal + yPadding])
            .range([height, 0]); // Inverted range for SVG y-coordinate

        // --- Line Generator ---
        const line = d3.line()
            .x((d, i) => xScale(i)) // Use index for x
            .y(d => yScale(d))     // Use data value for y
            .curve(d3.curveCatmullRom.alpha(0.5)); // Smoother curve (CatmullRom)

        // --- Draw Line ---
        g.append("path")
            .datum(data)
            .attr("class", "trend-line") // Apply style from CSS
            .attr("d", line);

        // --- Optional: Add subtle points ---
        /*
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", (d, i) => xScale(i))
            .attr("cy", d => yScale(d))
            .attr("r", 2)
            .style("fill", "#2dd4bf");
        */

        // --- Optional: Add subtle background grid lines (horizontal) ---
        /*
        const yTicks = yScale.ticks(3); // Aim for 3 horizontal lines
        g.selectAll(".grid-line")
            .data(yTicks)
            .enter()
            .append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", d => yScale(d))
            .attr("y2", d => yScale(d))
            .attr("stroke", "#4b5563") // gray-600
            .attr("stroke-width", 0.5)
            .attr("stroke-dasharray", "2,2"); // Dashed lines
        */
    }
    // --- End D3 Chart Drawing Function ---


    // --- Carousel Logic ---
    function showSlide(index) {
        if (index < 0 || index >= totalSlides) return;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Get metric name and corresponding data
        const currentMetricName = slides[index].dataset.metric || '体重'; // Default to 体重
        const currentData = trendData[currentMetricName] || []; // Get data or empty array

        // Draw the chart for the current metric
        drawChart(currentMetricName, currentData);

        currentSlideIndex = index;
    }

    // --- Initial Setup ---
    if (slides.length > 0) {
        slides.forEach((slide, i) => {
             if (slide.classList.contains('active')) { currentSlideIndex = i; }
        });
        // Show the initial slide and draw its chart
        // Use requestAnimationFrame to ensure layout is calculated before drawing
        requestAnimationFrame(() => showSlide(currentSlideIndex));

        // Start the carousel interval
        setInterval(() => {
            const nextSlideIndex = (currentSlideIndex + 1) % totalSlides;
            showSlide(nextSlideIndex);
        }, intervalTime);
    } else {
        console.error("No slides found within #metricCarousel.");
    }
    // --- End Carousel Logic ---

});
