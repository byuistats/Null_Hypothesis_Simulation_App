document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('sampleSizeInput');
  const plotContainer = document.getElementById('plotContainer');

  inputElement.addEventListener('input', () => {
    const sampleSize = parseInt(inputElement.value);

    if (!isNaN(sampleSize) && sampleSize >= 1 && sampleSize <= 100) {
      generateBoxPlot(sampleSize);
    } else {
      plotContainer.innerHTML = '<p>Please enter a valid number between 1 and 100.</p>';
    }
  });

  function generateBoxPlot(sampleSize) {
    // Clear any existing chart
    plotContainer.innerHTML = '';

    // Generate random data similar to the R code
    const groups = ['A', 'B', 'C', 'D'];
    const data = [];
    for (const group of groups) {
      for (let i = 0; i < sampleSize; i++) {
        data.push({
          Group: group,
          Weight: rnorm(100, 7) // Using a normal distribution function
        });
      }
    }

    // Prepare data for Chart.js boxplot
    const chartData = groups.map(group => {
      const weights = data.filter(item => item.Group === group).map(item => item.Weight);
      return weights;
    });

    // Create the boxplot using Chart.js
    const canvas = document.createElement('canvas');
    plotContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'boxplot', // Make sure you've included the Chart.js boxplot plugin!
      data: {
        labels: groups,
        datasets: [{
          label: 'Weight',
          data: chartData,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow custom aspect ratio
        scales: {
          y: {
            min: 80,
            max: 120,
            title: {
              display: true,
              text: 'Weight'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Randomly Assigned Groups'
          },
          subtitle: {
            display: true,
            text: `Sample Size: ${sampleSize}`
          },
          legend: {
            display: false // Same as legend.position="null" in R
          }
        }
      }
    });

  }

  // Helper function to generate random numbers from a normal distribution
  // Box-Muller transform: https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
  function rnorm(mean, sd) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return num * sd + mean;
  }
});