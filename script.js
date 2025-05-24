// script.js

document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('sampleSizeInput');
    const startButton = document.getElementById('startButton');
    let chart;

    function randomGroup(size) {
        // Generate random normal data for realism
        return Array.from({ length: size }, () =>
            Math.round(50 + 15 * (Math.random() + Math.random() + Math.random() - 1.5))
        );
    }

    function drawBoxplot(sampleSize) {
        const ctx = document.getElementById('boxplot').getContext('2d');
        const groupLabels = ['Group 1', 'Group 2', 'Group 3', 'Group 4'];
        const data = groupLabels.map(() => randomGroup(sampleSize));

        const backgroundColors = [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',  // Blue
            'rgba(255, 206, 86, 0.5)',  // Yellow
            'rgba(75, 192, 192, 0.5)'   // Green
        ];

        const darkerColor = 'rgba(0, 0, 0, 0.7)'; // Example: semi-transparent black

        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'boxplot',
            data: {
                labels: groupLabels,
                datasets: [{
                    label: 'Random Groups',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: darkerColor, // Set the border color for the box
                    itemStrokeColor: darkerColor, // Set the color for the whiskers and median line
                    itemStrokeWidth: 2          // Make the lines thicker (optional)
                }]
            },
            options: {  //  <--  This is the 'options' object where you need to add 'animation: false'
                responsive: true,
                animation: false,  //  <--  Add 'animation: false' here
                scales: {
                    y: {
                        min: 20,
                        max: 80
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Randomly Generated Boxplots for 4 Groups'
                    }
                }
            } // <-- closing curly brace for options
        });
    }

    startButton.addEventListener('click', () => {
        const sampleSize = parseInt(inputElement.value);
        if (!isNaN(sampleSize) && sampleSize >= 1 && sampleSize <= 100) {
            drawBoxplot(sampleSize);
        }
    });

    // Initial draw
    drawBoxplot(Number(inputElement.value));
});
