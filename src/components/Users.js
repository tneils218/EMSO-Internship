import React, { useState, useEffect } from "react";
import { getUsers, updateUser , deleteUser, createUser } from "../api/api";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Layout from "../Layout/Layout";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';





const Users = () => {
    const [open, setOpen] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [mutilDelete, setMutilDelete] = useState([])
    const [users, setUsers] = useState([]);
    const [popupConfirm, setPopupConfirm] = useState(false)
    const [popupsuccess, setPopupSuccess] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [UpdateTitle,setUpdateTitle] = useState('')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [messageerror, setMessageError] = useState([{
      field:'',
      message:'',
    }])
    const [values, setValues] = useState({
      name: '',
      email: '',
      gender:'',
      status:'',
      error:''
      
  }); 
  const [deleteId, setDeleteId] = useState()
  const [userId, setUserId] = useState()
  const {
      name,
      email,
      gender,
      status,
      error
  } = values;
    const init = () => {
        getUsers().then(data => {
            if (data.error) {
            } else {
              setUsers(data);
              setData(data)
              console.log(data)
              
            }
        });
    };
    useEffect(() => {
      init();
  }, [])
const handleDeleteClick = (cellValues) =>{
  setPopupConfirm(true)
  setDeleteId(cellValues.id)
 
};
const handleClickOpen = (cellValues) => {
  setUpdateTitle('Update User')
  setOpen(true);
  setIsUpdate(true);
  setUserId(cellValues.id)
  setValues({
    ...values,
    name: cellValues.row.name,                    
    email: cellValues.row.email,
    gender: cellValues.row.gender,
    status: cellValues.row.status,
  });
};
const handleClose = () => {
  setOpen(false);
  setPopupConfirm(false)
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 350 },
  { field: 'gender', headerName: 'Gender', width: 70 },
  { field: 'status', headerName: 'Status', width: 70 },
  {
    field: 'action', headerName: 'Action',
    renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={2} style={{ padding: "11px 0px" }}>
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
        href={`/posts/${cellValues.id}`}>
        <VisibilityIcon/>
      </IconButton>
        </Stack>
        );
      },
      width:200
    }
  ];
  
  const rows = users;
  
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  
  const clickSubmit = e => {
    e.preventDefault();
    (isUpdate ? updateUser(userId, values) : createUser(values) )
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
                name:'',
                email:'',
                gender:'',
                status:'',
            });
            init()
            } else {
              setMessageError(data)
            }
          }
          setOpenPopup(true)
      }); 
      
    } 
  const addNewUser = (cellValues) => {
    setUpdateTitle('Add New User')
    setIsUpdate(false)
    setOpen(true)
    setMessageError([{
      field:'',
      message:'',
    }])
    setValues({
      ...values,
      name: '',                    
      email: '',
      gender:'',
      status:''
    });
  }
  const clickSubmitPopup = () =>{
    setOpenPopup(false)
  }
  const clickNoConfirm = () => {
      setPopupConfirm(false)
  }
  const clickYesConfirm = () =>{
    mutilDelete.map((id) => ( 
      deleteUser(id)
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
  }
  const onDeleteMutil = () => {

    mutilDelete.length !==0 ? setPopupConfirm(true) : setPopupConfirm(false)

  }
  const onSearch = (search) => {
    if(search){
      const a =  users.filter(users =>{
        return (
          users.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          users.email.toLowerCase().includes(search.toLowerCase().trim())
        );
      } );
      setData(a)
    }
    else{
      setData(users)
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
   <Button onClick={addNewUser} variant="contained" endIcon={<SendIcon />}>
     Create
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
  const PopupSuccess = () => {
    return(
      <div>
        <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>
          {open ? `${messageerror[0].field} ${messageerror[0].message}` : `${isUpdate ? 'Update Success!' : 'Create Success!'}`}
          </DialogTitle>
        <DialogActions>
          <Button onClick={clickSubmitPopup}>Submit</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
    
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
  const genders = [
    'male',
    'female'
  ];
  const value = [
    'active',
    'inactive'
  ];
  const Dailog = () => {
    return(
      <Grid>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{UpdateTitle}</DialogTitle>
        <DialogContent>
          <TextField autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange('name')}
            value={name}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange('email')}
            value={email}
          />
          <Box sx={{ minWidth: 120, marginTop:'15px' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChange('gender')}
              >
                  {genders.map((gender) => (
                  <MenuItem
                    key={gender}
                    value={gender}
                  >
                    {gender}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, marginTop:"15px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange('status')}
              >
                  {value.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
            </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={clickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      </Grid>
    )
    
  }
  const showError = () => (
    <Grid className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </Grid>
);
    return (
      <Layout>
      
        <Grid>
            {DataTable()}
            {showError()}
            {Dailog()}
            {PopupDeleteSuccess()}
            {PopupConfirm()}
            {PopupSuccess()}
            </Grid>
      </Layout>
    );
};

export default Users;