import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { GoogleLogin } from 'react-google-login';
import Divider from '@mui/material/Divider';
import { useObserver } from 'mobx-react';
import { getUserDataFromLocalStorage } from '../../utils/localStorageUtils';
import { useNavigate } from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

function SignUp() {
    const [email, setEmail] = React.useState('');
    const [confirmEmail, setConfirmEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const navigate = useNavigate();

const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError(
        'Password must be at least 12 characters long and contain a combination of alphabets, numerics, and special characters.'
      );
    } else {
      setPasswordError('');
    }
  };

const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setPasswordError("Passwords don't match");
    } else {
      setPasswordError('');
    }
  };

const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
    return passwordRegex.test(password);
  };

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email !== confirmEmail || password !== confirmPassword || passwordError) {
      console.error("Form validation failed");
      return;
    }

      // Create user object
  const user = {
    firstName: event.currentTarget.firstName.value,
    lastName: event.currentTarget.lastName.value,
    email: event.currentTarget.email.value,
    // Add other user data as needed
  };

  // Store user data in localStorage
  localStorage.setItem('userData', JSON.stringify(user));

  console.log('User data stored locally:', user);

    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate('/login');
  };

/* const responseGoogle = (response: any) => {
    // Handle the response from Google Sign-In
    console.log(response);

    // Extract user information from the response and send it to your backend for signup/authentication
    const { profileObj, tokenId } = response;
    console.log('User ID:', profileObj.googleId);
    console.log('User Name:', profileObj.name);
    console.log('User Email:', profileObj.email);
    console.log('User Token ID:', tokenId);
  };
 */

  return useObserver(() => (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5" align="center">
        Optimize Your Professional Life for Maximum Impact
        </Typography>
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="confirmEmail"
            label="Confirm Email Address"
            name="confirmEmail"
            autoComplete="email"
          />
        </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Divider variant="middle" sx={{ my: 2 }} />
{/*             <div style={{ marginTop: '2rem' }}>
  <GoogleLogin
    clientId="YOUR_GOOGLE_CLIENT_ID"
    buttonText="Login with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />
</div> */}
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
  );
};

export default SignUp;