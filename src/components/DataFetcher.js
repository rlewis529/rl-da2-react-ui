// src/components/DataFetcher.js
import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress 
} from '@mui/material'; // <-- Import Material UI components including spinner
import './DataFetcher.css'; // Optional if you have custom styles

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Added loading state

  useEffect(() => {
    fetch('http://localhost:5000/stocks')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false); // <-- Turn off loading when data arrives
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false); // <-- Turn off loading even if error
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <CircularProgress />
          <p>Loading data...</p>
        </div>
      ) : (
        <>
          <h2 className="heading">Database Results (Plain Table)</h2>

          {/* Plain HTML Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Symbol</th>
                <th style={{ borderBottom: '1px solid black', padding: '8px' }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} style={{ textAlign: 'center', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                  <td style={{ padding: '8px' }}>{item.symbol}</td>
                  <td style={{ padding: '8px' }}>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="heading">Database Results (Material UI Table)</h2>

          {/* Material UI Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Symbol</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow hover key={index}>
                    <TableCell>{item.symbol}</TableCell>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default DataFetcher;
