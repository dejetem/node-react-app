import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from '../axios.js' 
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
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

const AddressCall = () => {

  const [tableData, setTableData] = useState([])
  const [cardData, setCardData] = useState([])
  
   
  useEffect(() => {
    async function fetchTransac () {
      const response = await axios.get('/latest')
      const arr = response?.data.transac;
      setTableData(arr[0].result)
      const arr1 = response?.data.transac;
      setCardData(arr1[0].bal)
    }
    fetchTransac();
  }, [])

   console.log(tableData);
   console.log(cardData)
  return (
    <> 
      {cardData.map(card =>
       <div key={card._id}>
        <Accordion>
          <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Overview
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>ETH Balance of the inputed address</Typography>
           </AccordionSummary>
        </Accordion>
        <Accordion>
        <AccordionSummary
          aria-controls="panel2bh-content"
          id="panel2bh-header"
         >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Balance:</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {card.result / 1000000000000000000} ETH
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion>
          <AccordionSummary
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Value:
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            $ {card.result / 1000000000000000000 * 3380.12} (@ $3,380.12/ETH)
          </Typography>
         </AccordionSummary>
        </Accordion>
    </div>
    )};
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

export default AddressCall