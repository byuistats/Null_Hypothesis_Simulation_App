// Register the boxplot plugin
Chart.register(window['chartjs-chart-box-and-violin-plot']);

document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('sampleSizeInput');
  const plotContainer = document.getElementById('plotContainer');
  const startButton = document.getElementById('startButton');

  function randomSample(size) {
    return Array.from({ length: size }, () => Math.round(50 + 15 * (Math.random() - 0.5)));
  }

  let chart;

  function drawBoxplot(sampleSize) {
    const ctx = document.getElementById('boxplot').getContext('2d');
    const data = randomSample(sampleSize);

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'boxplot',
      data: {
        labels: ['Sample'],
        datasets: [{
          label: 'Random Sample',
          data: [data],
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  startButton.addEventListener('click', () => {
    const sampleSize = parseInt(inputElement.value);
    if (!isNaN(sampleSize) && sampleSize >= 1 && sampleSize <= 100) {
      drawBoxplot(sampleSize);
    } else {
      plotContainer.innerHTML = '<p>Please enter a valid number between 1 and 100.</p>';
    }
  });

  drawBoxplot(Number(inputElement.value));
});


