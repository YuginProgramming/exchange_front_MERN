import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { 
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Mykola Berezen',
      email: '8his@gmail.com',
      password: '09870',
    },
    mode: 'onChange',
  }); 

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert ('Faild to Register')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sign Up
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
     <TextField
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'write your Full Name' })}
        className={styles.field}
        label="Full Name"
        fullWidth 
        />
      <TextField
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email', { required: 'write your email' })}
        className={styles.field}
        label="E-mail"
        fullWidth 
        />
       <TextField
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        {...register('password', { required: 'write your password' })}
        className={styles.field}
        label="Password"
        fullWidth 
        />
      <Button disabled={!isValid} type ="submit" size="large" variant="contained" fullWidth>
        Sign Up
      </Button>
     </form>
    </Paper>
  );
};
