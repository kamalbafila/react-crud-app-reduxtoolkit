// src/components/DataGridDemo.tsx
import { useState, useEffect, ChangeEvent } from "react";
import { Box, Stack, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useConfirm } from "material-ui-confirm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, editUser, deleteUser } from "../api/UserSlice";
import IUser from "../DataModel/IUser";
import { RootState, AppDispatch } from "../state/store";

export default function DataGridDemo() {
  const confirm = useConfirm();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState<IUser>({
    id: 0,
    firstName: "",
    lastName: "",
    age: 0,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    setOpen(true);
    setEdit(false);
    setFormData({
      id: 0,
      firstName: "",
      lastName: "",
      age: 0,
    });
  };

  const handleEditUser = (row: IUser) => {
    setOpen(true);
    setEdit(true);
    setFormData(row);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  function handleTextChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleCloseSnackbar(): void {
    setOpenSnackbar(false);
  }

  const handleSave = async () => {
    if (edit) {
      dispatch(editUser(formData));
    } else {
      dispatch(addUser(formData));
    }
    setOpen(false);
    setOpenSnackbar(true);
    dispatch(fetchUsers());
  };

  const handleDeleteUser = async (id: number) => {
    confirm({ title: "", description: "Are you sure to delete the user?" })
      .then(async () => {
        await dispatch(deleteUser(id));
        setOpenSnackbar(true);
        dispatch(fetchUsers());
      })
      .catch(() => {
        /* ... */
      });
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: 400, width: "60%" }}>
        <Stack spacing={2} marginBottom={2} direction="row">
          <Button variant="contained" onClick={handleAddUser}>
            Add User
          </Button>
          <Button variant="contained">Delete</Button>
        </Stack>
        <DataGrid
          rows={users}
          columns={[
            { field: "id", headerName: "ID", width: 90 },
            {
              field: "firstName",
              headerName: "First name",
              width: 150,
              editable: true,
            },
            {
              field: "lastName",
              headerName: "Last name",
              width: 150,
              editable: true,
            },
            {
              field: "age",
              headerName: "Age",
              type: "number",
              width: 150,
              editable: true,
            },
            {
              field: "Actions",
              headerName: "Actions",
              width: 300,
              renderCell: (params) => (
                <strong>
                  <Button
                    variant="text"
                    onClick={() => handleEditUser(params.row)}
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => handleDeleteUser(params.row.id)}
                    size="small"
                    color="primary"
                  >
                    Delete
                  </Button>
                </strong>
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <Dialog open={open} onClose={handleDialogClose}>
          <DialogTitle>Add/Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData?.firstName}
              onChange={handleTextChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData?.lastName}
              onChange={handleTextChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="age"
              name="age"
              label="Age"
              type="number"
              fullWidth
              variant="standard"
              value={formData?.age ? formData.age : ""}
              onChange={handleTextChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            This is a success Alert inside a Snackbar!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
