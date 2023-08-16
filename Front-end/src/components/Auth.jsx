
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 2px 2px 10px 10px #888888;
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Auth = () => {
  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setisSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type='login') => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/${type}`, {
        name:inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      return res.data;
    } catch (error) {
      console.error("Error sending request:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    // const response = await sendRequest();
    // console.log(response);
    if(isSignup){
      sendRequest("register")
      .then(()=>dispatch(authAction.login()))
      .then(()=>navigate("/blogs"))
      .then((data)=>console.log(data))
    }else{
      sendRequest().then(()=>dispatch(authAction.login()))
      .then(()=>navigate("/blogs"))
      .then((data)=>console.log(data))
    }
  };

  return (
    <Component className="mt-4">
      <form onSubmit={handleSubmit}>
        <Box>
          <Image src={imageURL} alt="login" />
          <Wrapper>
            {isSignup && (
              <TextField
                className="mt-3"
                variant="standard"
                onChange={handleChange}
                value={inputs.name}
                label="Enter Username"
                name="name"
              />
            )}
            <TextField
              className="mt-3"
              variant="standard"
              onChange={handleChange}
              value={inputs.email}
              label="Enter Email"
              name="email"
              type="email"
            />
            <TextField
              className="mt-3"
              variant="standard"
              onChange={handleChange}
              value={inputs.password}
              label="Enter Password"
              name="password"
              type="password"
            />
            <SignupButton className="mt-3" type="submit">
              Submit
            </SignupButton>
            <Typography className="mt-3 text-center">OR</Typography>
            <LoginButton
              onClick={() => setisSignup(!isSignup)}
              className="mt-3"
              variant="contained"
            >
              Change To {isSignup ? "Login" : "Signup"}
            </LoginButton>
          </Wrapper>
        </Box>
      </form>
    </Component>
  );
};

export default Auth;
