// export async function GET() {
//   const result = await fetch(
//     'http://worldtimeapi.org/api/timezone/America/Chicago',
//     {
//       cache: 'no-store',
//     },
//   );
//   const data = await result.json();
 
//   return Response.json({ datetime: data.datetime });
// }
  




// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios, { AxiosError } from 'axios';




// // Define a type for the expected structure of the prices data
// type PriceData = {
//   date: Date,
//   price: number
// };



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const client = await pool.connect();
//   try {
//     const { rows } = await client.query('SELECT * FROM btc_usd_historical ORDER BY date DESC');
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error('Database query failed:', error);
//     res.status(500).json({ message: 'Database query failed', error: error instanceof Error ? error.message : 'Unknown error' });
//   } finally {
//     client.release();
//   }
// }
