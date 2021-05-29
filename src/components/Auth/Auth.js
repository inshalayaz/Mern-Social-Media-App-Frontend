import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login'
import Icon from './Icon'
import useStyles from './styles';
import Input from './Input';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'


const initialState = {
  fisrtName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory()
  
  const [isSignup, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
   e.preventDefault();
   console.log(formData)

    if(isSignup){
      dispatch(signup(formData, history))
    }else{
      dispatch(signin(formData, history))
    }


  };

  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const switchMode = () => {
    setIsSignUp(!isSignup)
    handleShowPassword(false)
  }
  const googleSuccess = async (res) => {
    const result = res?.profileObj
    const token = res?.tokenId
    try {
        dispatch({ type:'AUTH', data: { result,token } })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
  }

  const googleFailure = () => {
    console.log("Google Sign In Failed!!!")
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin clientId='509862100979-37d1ca4mf9frm5pj535e40b0shtkt2t8.apps.googleusercontent.com' 
          render = {(renderProps) => (
            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={ renderProps.disabled } startIcon={<Icon />} variant='contained'> Google Sign In </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy='single_host_origin'
           />
          <Grid container justify='flex-end' >
              <Grid item >
                <Button onClick={switchMode} color='primary'> { isSignup ? "Already Have an Account? Log In Now" : "Don't have an Account? Sign Up Now" }   </Button>
              </Grid>
          </Grid>
          
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;