// src/chartConfig.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
    CategoryScale,   // For x-axis categories
    LinearScale,     // For y-axis values
    BarElement,      // For rendering bar elements
    Title,           // For adding a title to the chart
    Tooltip,         // For displaying tooltips
    Legend           // For displaying chart legends
);
