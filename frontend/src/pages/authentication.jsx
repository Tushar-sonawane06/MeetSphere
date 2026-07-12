import * as React from "react";
import { AuthContext } from "../contexts/authContext.jsx";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  
  import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  
  export default function Authentication() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();
  
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
      
    const {handleRegister, handleLogin} = React.useContext(AuthContext);

    let handleAuth = async() => {
      try{
        if(formState === 0){

        }

        if(formState ===1){
           
        }
      }catch(err){

      }
    }

    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
        }}
      >
        {/* Left Side Image */}
        <Box
          sx={{
            flex: 1.3,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />
  
        {/* Right Side Form */}
        <Paper
          elevation={0}
          square
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Stack alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  bgcolor: "#9c27b0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LockOutlinedIcon sx={{ color: "#fff" }} />
              </Box>
  
              <div>
                <Button varient={formState===0 ? "contained":""} onClick={()=>{setFormState(0)}}>
                  Sign In
                </Button>
                <Button varient={formState===1 ? "contained" : ""} onClick={()=>{setFormState(1)}}>
                  Sign Up
                </Button>
              </div>
            </Stack>
            
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {formState === 1 ? <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Full Name"
                name="username"
                autoComplete="username"
                autoFocus
                type="email"
                onChange={(e)=>setName(e.target.value)}
              /> : <></>}
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                type="email"
                onChange={(e)=>setUsername(e.target.value)}

              />
  
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
              />
  
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
            </Box>
  
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                py: 1.2,
              }}
            >
              SIGN IN
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }