import React, { useState, useEffect } from "react";
import { createPost, deletePost, getUserPosts } from "../api/api";
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../Layout/Layout";
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
const UserPosts = ({match}) => {
  const [open, setOpen] = useState(false);
  const [mutilDelete, setMutilDelete] = useState([])
  const [userPosts, setUserPosts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupConfirm, setPopupConfirm] = useState(false)
  const [popupsuccess, setPopupSuccess] = useState(false)
  const [values, setValues] = useState({
    title: '',
    body: '',
    });
    const [messageerror, setMessageError] = useState([{
      field:'',
      message:'',
    }])
const {
    title,
    body
} = values;

  const init = () => {
      getUserPosts(match.params.userId).then(data => {
          if (data.error) {
          } else {
          setUserPosts(data);
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
    { field: 'title', headerName: 'Title', width: 350 },
    { field: 'body', headerName: 'Body', width: 500},
  ];
  const rows = userPosts;
  const clickYesConfirm = () =>{
    console.log(mutilDelete)
    mutilDelete.map((id) => ( 
      deletePost(id)
          .then(data => {
              if(data.error){
                  return <h3>Error</h3>;
              }
              else{
                  init()
                    setPopupSuccess(true)
                setPopupConfirm(false)
              }
          })
    ))
    };
  const onDeleteMutil = () => {
    mutilDelete.length !==0 ? setPopupConfirm(true) : setPopupConfirm(false)
  }
  const addNewPost = () => {
    setOpen(true);
  }
  const handleChange = title => e => {
    setValues({ ...values, error: false, [title]: e.target.value });
};
const handleClose = () => {
  setOpen(false);
}
  const clickSubmit = () => {
    createPost(match.params.userId, values)
    .then(data => {
      if (data.error) {
        setValues({ ...values, error: data });
    } else {
          console.log(Array.isArray(data))
          setOpen(Array.isArray(data))
          console.log(data)
          if(!Array.isArray(data)){
            setValues({
              ...values,
              title:'',
              body:''
          });
          init()
          } else {
            setMessageError(data)
          }
        }
        setOpenPopup(true)
    });
  }
  const clickNoConfirm = () => {
    setPopupConfirm(false)
}
  const PopupConfirm = () => {
    return(
      <div>
        <Dialog open={popupConfirm} onClose={handleClose}>
        <DialogTitle>
          Are you sure?
        </DialogTitle>
          <DialogActions>
          <Button onClick={clickYesConfirm}>Yes</Button>
          <Button onClick={clickNoConfirm}>No</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }
  const DataTable = () => {
    return (
      <Grid>
    <Stack direction="row" spacing={2} sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      p: 1,
      m: 1,
      marginTop:'50px'
   }}>
   <Button onClick={onDeleteMutil} variant="outlined" color="error" startIcon={<DeleteIcon />}>
     Delete
   </Button>
   <Button onClick={addNewPost} variant="contained" endIcon={<SendIcon />}>
     Create Post
   </Button>
 </Stack>
    <div style={{ height: 370, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(data)=>{
        setMutilDelete(data)
        }}
      />
    </div>
    </Grid>
    )};
    const Dailog = () => {
      return(
        <div>
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent>
            <TextField autoFocus
              margin="dense"
              id="title"
              label="Title"
              multiline
              fullWidth
              variant="standard"
              onChange={handleChange('title')}
              value={title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="body"
              label="Body"
              multiline
              fullWidth
              variant="standard"
              onChange={handleChange('body')}
              value={body}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={clickSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        </div>
      )
      
    }
    const clickSubmitPopup = () =>{
      setOpenPopup(false)
    }
    const PopupSuccess = () => {
      return(
        <div>
          <Dialog open={openPopup} onClose={handleClose}>
          <DialogTitle>
            {open ? `${messageerror[0].field} ${messageerror[0].message}` : 'Create Success!' }
            </DialogTitle>
          <DialogActions>
            <Button onClick={clickSubmitPopup}>Submit</Button>
          </DialogActions>
        </Dialog>
        </div>
      )
      
    }
    const clickCloseSuccess = () =>{
      setPopupSuccess(false)
    }
    const PopupDeleteSuccess = () => {
      return(
        <div>
          <Dialog open={popupsuccess} >
          <DialogTitle>
            Delete Success!
          </DialogTitle>
            <DialogActions>
            <Button onClick={clickCloseSuccess}>OK</Button>
          </DialogActions>
        </Dialog>
        </div>
      )
    }
      return (
        <Layout>
        <Grid>
         
              {DataTable()}
              {Dailog()}
              {PopupSuccess()}
              {PopupConfirm()}
              {PopupDeleteSuccess()}
        </Grid>
        </Layout>
      );
};

export default UserPosts;