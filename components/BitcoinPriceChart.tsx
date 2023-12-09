'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BitcoinData {
  date: Date;
  price: number;
}

const BitcoinPriceChart = () => {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get('/api/cron/route');

        setBitcoinData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(err?.toString() || 'Unknown error'));
        console.error('Failed to fetch Bitcoin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBitcoinData();
  }, []);

  const chartData = {
    labels: bitcoinData.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Bitcoin Price',
        data: bitcoinData.map(data => data.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  if (loading) {
    return <p>Loading Bitcoin data...</p>;
  }

  if (error) {
    return <p>Error fetching Bitcoin data: {error.message}</p>;
  }

  return (
    <div>
      <h2>Bitcoin Price Chart</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default BitcoinPriceChart;
