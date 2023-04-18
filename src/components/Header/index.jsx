import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
    dispatch(logout());
    window.localStorage.removeItem('token');
  }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>NadOt</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Contribute</Button>
                </Link>
                <Link to="/add-post">
                  <Button variant="contained">Seek Support</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
