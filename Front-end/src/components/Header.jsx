import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from "../store";

const Header = () => {

    const dispatch = useDispatch()
   const isLoggedIn = useSelector(state=>state.isLoggedIn);
   console.log(isLoggedIn);

   const [value, setValue]= useState();
    return (
        <AppBar position="sticky" className="p-2 mb-2 bg-secondary text-white">
            <Toolbar>
                <Typography variant="h4">Blogs App</Typography>
                {
                    isLoggedIn &&
                    <Box display="flex" marginLeft='auto' marginRight='auto'>
                    <Tabs textColor="inherit" value={value} onChange={(e, value)=>setValue(value)}> 
                        <Tab LinkComponent={Link} to='/blogs' label='All Blogs'/>
                        <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs'/>
                        
                    </Tabs>
                </Box>
                }
                <Box display="flex" marginLeft='auto'>
                    { !isLoggedIn &&
                    <>
                        <Button LinkComponent={Link} to='/auth' className="rounded-3 m-3" variant="contained" color="warning">Login</Button>
                        <Button LinkComponent={Link} to='/auth' className="rounded-3 m-3" variant="contained"   color="warning">Register</Button>
                        </>
                    }
                    { isLoggedIn &&
                        <Button onClick={()=>dispatch(authAction.logout())} LinkComponent={Link} to='/auth' className="rounded-3 m-3" variant="contained"   color="warning">Logout</Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;