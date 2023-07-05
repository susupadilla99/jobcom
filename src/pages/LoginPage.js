import React, { useEffect } from 'react'
import { Tabs, Tab, Button } from '@mui/material';
import { Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import LoginTab from '../components/LoginTab';
import SignUpTab from '../components/SignUpTab';
import { FcGoogle } from 'react-icons/fc';
import { GrLinkedin } from 'react-icons/gr';
import { GoMarkGithub } from 'react-icons/go';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseEngine from '../initFirebase/configureFirebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataStoreState } from '../store/ContexApi';
import coverImage from '../images/coverImage.png';
import logo from '../images/logo.png'

const LoginPage = () => {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();
  const { auth } = firebaseEngine;
  const { setAlert } = DataStoreState();
  const userId = JSON.parse(localStorage.getItem('user'))?.uid
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && userId) {
      navigate("/profilepage")
      setAlert({
        open: true,
        message: `Welcome back`,
        type: "success"
      })
    } else return
    // eslint-disable-next-line
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCred) => {
        const user = userCred.user
        navigate('/profilepage')
        setAlert({
          open: true,
          message: `You have successfully logged in as ${user.displayName}`,
          type: "success"
        })
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: `${error.message}`,
          type: "error"
        })
      })
  }

  const useStyle = makeStyles()((theme) => ({
    tab: {
      width: "350px",
      padding: "5px",
      borderRadius: "10px",
      border: "1px solid grey",
      textAlign: "center"
    },
    btnGthb: {
      display: "flex",
      gap: 10,
      backgroundColor: "grey",
      color: "black",
      fontFamily: "Work sans",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "black",
        color: "white",
      }
    },
    btnggle: {
      display: "flex",
      gap: 10,
      backgroundColor: "white",
      border: "1px solid grey",
      color: "black",
      fontFamily: "Work sans",
      textTransform: "capitalize"
    },
    btngrp: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      width: "100%",
      padding: "20px",
    },
    btnLnkd: {
      display: "flex",
      gap: 10,
      backgroundColor: "#1976d2",
      color: "white",
      fontFamily: "Work sans",
      textTransform: "capitalize",
      "&:hover": {
        backgroundColor: "#1976d2",
        color: "white",
      },
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "20px"
    },
  }))

  const { classes } = useStyle();

  return (
    <div className='h-screen w-screen flex'>

      <div className='w-[70%] h-[100%] p-14'>
        {/* Hero Image */}
        <div className='w-[100%] h-[100%] bg-[url("./images/coverImage.png")] bg-no-repeat bg-cover bg-center rounded-[50px] pt-20 px-12'>
          <h1 className='font-bold text-4xl mb-16'>Jumpstart Your Dream Career.</h1>
          <p className='font-medium text-xl'>JobCom is a platform that help Tech International Students in Australia to showcase their talents through stand out portfolio</p>
          <br />
          <br />
          <p className='font-medium text-xl'>Share your Portfolio Link with the Recruiters!</p>
        </div>
      </div>

      <div className='w-[30%] h-[100%] flex flex-col items-center'>
        {/* Logo */}
        <img className='my-20' src={logo} alt="company logo" />
        <div className='mt-8'>
          <TabContext className='border-2 border-black' value={value}>
            <Box>
              <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor='secondary' centered>
                <Tab label="login" value="1" />
                <Tab label="sign up" value="2" />
              </Tabs>
            </Box>
            <TabPanel value="1"><LoginTab /></TabPanel>
            <TabPanel value="2"><SignUpTab /></TabPanel>
            <p>OR</p>
            <Box className={classes.btngrp}>
              <Button className={classes.btnggle} size="large" onClick={() => signInWithGoogle()} fullWidth><FcGoogle /> Continue with Google</Button>
              <Button className={classes.btnLnkd} size="large" fullWidth disabled><GrLinkedin /> Continue with LinkedIn</Button>
              <Button className={classes.btnGthb} size="large" fullWidth disabled><GoMarkGithub /> Continue with GitHub</Button>
            </Box>
          </TabContext>
        </div>
      </div>
    </div>
  )
}

export default LoginPage