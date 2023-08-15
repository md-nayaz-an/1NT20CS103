import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'trainName', headerName: 'Train Name', width: 150 },
    { field: 'trainNumber', headerName: 'Train Number', width: 150 },
    {
      field: 'departureTime',
      headerName: 'Departure Time',
      width: 150,
      valueFormatter: (params) =>
        `${params.value.Hours}:${params.value.Minutes}:${params.value.Seconds}`
    },
    {
      field: 'seatsAvailable',
      headerName: 'Seats Available',
      width: 180,
      valueFormatter: (params) =>
        `Sleeper: ${params.value.sleeper}, AC: ${params.value.AC}`
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 180,
      valueFormatter: (params) =>
        `Sleeper: ${params.value.sleeper}, AC: ${params.value.AC}`
    },
    { field: 'delayedBy', headerName: 'Delayed By', width: 150 },
  ];

export default function DataTable() {
    const url = "http://localhost:8000/";
    const [rows, setRows] = React.useState([])
    
    React.useEffect(() => {
        fetch(url + "train/trains")
        .then(response => response.json())
        .then(data => {
            setRows(data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });    
        console.log(rows)
    }, []);

    const navigate = useNavigate();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.trainNumber}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(r) => { 
            console.log(`/train?id=${r.row.trainNumber}`)
            navigate(`/train?id=${r.row.trainNumber}`)
        }
        }
      />
    </div>
  );
}