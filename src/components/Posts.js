import React, { useState, useEffect } from "react";
import { getPosts, deletePost,updatePost } from "../api/api";
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../Layout/Layout";
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Posts = () => {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [deleteId, setDeleteId] = useState()
    const [mutilDelete, setMutilDelete] = useState([])
    const [popupConfirm, setPopupConfirm] = useState(false)
    const [popupsuccess, setPopupSuccess] = useState(false)
    const [openPopup, setOpenPopup] = useState(false);
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [messageerror, setMessageError] = useState([{
      field:'',
      message:'',
    }])
    const [postId, setPostId] = useState()
    const [values, setValues] = useState({
      title: '',
      body: '',
  });   
  const {
      title,
      body
  } = values;
  const handleChange = title => e => {
    setValues({ ...values, error: false, [title]: e.target.value });
};
const clickSubmit = e => {
  e.preventDefault();
  updatePost(postId, {title,body})
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
};
    const init = () => {
        getPosts().then(data => {
            if (data.error) {

            } else {
              console.log(data)
              setPosts(data);
              setData(data)
            }
        });
    };
    useEffect(() => {
      init();
  }, []);
const handleDeleteClick = (cellValues) =>{
  setPopupConfirm(true)
  setDeleteId(cellValues.id)

};
const handleClose = () => {
  setOpen(false);
  setPopupConfirm(false)
};

const clickSubmitPopup = () =>{
  setOpenPopup(false)
}
const clickNoConfirm = () => {
    setPopupConfirm(false)
}
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
const handleClickOpen = (cellValues) => {
  setOpen(true);
  setPostId(cellValues.id)
  setValues({
    ...values,
    title: cellValues.row.title,                    
    body: cellValues.row.body,
  });
};
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'user_id', headerName: 'USER ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 400 },
  { field: 'body', headerName: 'body', width: 400,  },
  {
    field: 'action', headerName: 'Action',
    renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={3} style={{ padding: "11px 0px" }}>
        <IconButton
          color="primary"
          aria-label="edit"
          onClick={()=>handleClickOpen(cellValues)}
          >
          <EditIcon/>
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="show"
          href={`/comments/${cellValues.id}`}>
          <VisibilityIcon/>
        </IconButton>
        </Stack>
        );
    },
    width:200
  }
  
];
const onDeleteMutil = () => {
 
  mutilDelete.length !==0 ? setPopupConfirm(true) : setPopupConfirm(false)

}

const onSearch = (search) => {
  if(search){
    const a =  posts.filter(posts =>{
      return (
        posts.title.toLowerCase().includes(search.toLowerCase().trim()) ||
        posts.body.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
     );
    setData(a)
  }
  else{
    setData(posts)
  }
  console.log(search)
  
  document.getElementById('search').value = ''

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
     <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase id="search"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={(e) => {
            setSearch(e.target.value)
        }}
      />
      <IconButton onClick={() => onSearch(search)} sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
   <Button onClick={onDeleteMutil} variant="outlined" color="error" startIcon={<DeleteIcon />}>
     Delete
   </Button>
 </Stack>
    <div style={{ height: 370, width: '100%'}}>
      <DataGrid
        rows={data}
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
  const PopupSuccess = () => {
    return(
      <div>
        <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>
          {open ? `${messageerror[0].field} ${messageerror[0].message}` : 'Update Success!' }
          </DialogTitle>
        <DialogActions>
          <Button onClick={clickSubmitPopup}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
    
  }
  const Dailog = () => {
    return(
      <div>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Post</DialogTitle>
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
    return (
      <Layout>
        <Grid>
            {DataTable()}
            {PopupConfirm()}
            {PopupSuccess()}
            {PopupDeleteSuccess()}
            {Dailog()}

        </Grid>
      </Layout>
    );
};

export default Posts;