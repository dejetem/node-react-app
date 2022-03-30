import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from '../axios.js' 
import './Home.css'
import moment from 'moment'

const columns = [
  { field: 'hash', headerName: 'Txn Hash', minWidth: 170},
  { field: 'blockNumber', headerName: 'Block', Width: 90},
  { field: 'timeStamp', headerName: 'Age', minWidth: 150,
    valueFormatter: (params) => {
      return moment.unix(params.value).startOf('day').fromNow()
  },
  },
  { field: 'from', headerName: 'From', minWidth: 170},
  { field: 'to', headerName: 'To', minWidth: 170},
  { field: 'value', headerName: 'Value', minWidth: 170,
   renderCell: (params) => (
    <>{params.value / 1000000000000000000}ETH</>
  )
},
  { field: 'Txn Fee', headerName: 'Txn Fee', minWidth: 170,
    valueGetter: (params) => params.row.gasPrice * params.row.gasUsed,
    renderCell: (params) => (
    <>{params.value / 1000000000000000000}ETH</>
  )
 },
  { field: 'confirmations', headerName: 'Confirmation ID', minWidth: 140},
  { field: 'transactionIndex', headerName: 'Transaction Index', minWidth: 140},
  { field: 'nonce', headerName: 'Nonce', Width: 30},
  { field: 'blockHash', headerName: 'Block Hash', minWidth: 170},
  { field: 'gasUsed', headerName: 'Gas Used', Width: 30},
  { field: 'gasPrice', headerName: 'Gas Price', minWidth: 170,
     renderCell: (params) => (
    <>{params.value} gwei</>
  )
   },
]

const Home = () => {

  const [tableData, setTableData] = useState([])
  
   
  useEffect(() => {
    async function fetchTransac () {
      const response = await axios.get('/latest')
      const arr = response?.data.transac;
      console.log(arr)
      setTableData(arr[0].result)
    }
    fetchTransac();
  }, [])

   console.log(tableData);
  return (
    <> 
    <div style={{ height: 700, width: '100%', cursor: 'pointer'}}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
      />
    </div>
    </>
  )
}

export default Home