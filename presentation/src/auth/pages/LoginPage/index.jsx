import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../../layout';
import { useForm } from '../../../hooks';
import {
  startGoogleSingIn,
  startLoginWithEmailPassword,
} from '../../../store/';

const formData = {
  email: '',
  password: '',
};

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @.'],
  password: [
    (value) => value.length >= 6,
    'El password debe tener más de 6 caracteres.',
  ],
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formSunmitted, setFormSunmitted] = useState(false);
  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSunmitted(true);
    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSingIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSunmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSunmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="end">
          <Link component={RouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
