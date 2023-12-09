import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
const { Pool } = require('pg')

require('dotenv').config()

// Define a type for the expected structure of the prices data
type PriceData = {
  date: Date,
  price: number
};


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM btc_usd_historical ORDER BY date DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ message: 'Database query failed', error: error instanceof Error ? error.message : 'Unknown error' });
  } finally {
    client.release();
  }
}




// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const response = await axios.get<{ prices: [number, number][] }>('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily');

//     // Map and convert the prices data to the defined type
//     const prices: PriceData[] = response.data.prices.map(([timestamp, price]) => ({
//       date: new Date(timestamp),
//       price
//     }));

//     const client = await pool.connect();
//     try {
//       await client.query('BEGIN');
//       for (const item of prices) {
//         await client.query('INSERT INTO btc_usd_historical (date, price) VALUES ($1, $2) ON CONFLICT (date) DO UPDATE SET price = EXCLUDED.price', [item.date, item.price]);
//       }
//       await client.query('COMMIT');
//     } catch (err) {
//       await client.query('ROLLBACK');
//       console.error('Database operation failed:', err);
//       res.status(500).json({ message: 'Database operation failed', error: err instanceof Error ? err.message : 'Unknown error' });
//       return;
//     } finally {
//       client.release();
//     }

//     res.status(200).json({ message: 'Bitcoin data updated successfully' });
//   } catch (error) {
//     console.error('Error fetching data from CoinGecko:', error);
//     res.status(500).json({ 
//       message: 'Error fetching data from CoinGecko', 
//       error: error instanceof AxiosError ? error.message : 'Unknown Axios error' 
//     });
//   }
// }
