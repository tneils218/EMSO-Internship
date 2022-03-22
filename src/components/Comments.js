import React, { useState, useEffect } from "react";
import { getComments } from "../api/api";
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../Layout/Layout";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';

const Comments = ({match}) => {

  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState()
  const [values, setValues] = useState({
    name: '',
    body: '',
});   
const {
    name,
    body
} = values;
  const init = () => {
      getComments(match.params.postId).then(data => {
          if (data.error) {
          } else {
          setComments(data);
          console.log(data)
            }
          });
      };
      useEffect(() => {
        init();
        console.log(match)
    }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'post_id', headerName: 'Post Id', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'body', headerName: 'Body', width: 400 },
    {
      field: 'action', headerName: 'Action',
      renderCell: (cellValues) => {
        return (
          <Stack direction="row" spacing={3} style={{ padding: "11px 0px" }}>
          <IconButton
            color="secondary"
            aria-label="edit"
            onClick={()=>handleClickOpen(cellValues)}
            >
            <VisibilityIcon/>
          </IconButton>
          </Stack>
          );
      },
      width:200
    }
  ];

  const rows = comments;
  const handleClickOpen = (cellValues) => {
    setOpen(true);
    setPostId(cellValues.id)
    setValues({
      ...values,
      name: cellValues.row.name,                    
      body: cellValues.row.body,
    });
  };
  const Dailog = () => {
    return(
      <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View Comment</DialogTitle>
        <DialogContent>
          <TextField autoFocus
            margin="dense"
            id="title"
            label="Title"
            multiline
            fullWidth
            variant="standard"
            value={name}
          />
             <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            multiline
            fullWidth
            variant="standard"
            value={body}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
    
  }
  const handleClose = () => {
    setOpen(false);
  };
  const DataTable = () => {
    return (
      <div style={{ height: 500, width: '100%', marginTop: '100px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />-
      </div>
    )};

      return (
        <Layout>
        <div>
          <div className="col-9">
              {DataTable()}
              {Dailog()}
              </div>
        </div>
        </Layout>
      );
};

export default Comments;