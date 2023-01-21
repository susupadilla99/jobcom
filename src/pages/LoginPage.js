import React from 'react'
import { Tabs, Tab, Button } from '@mui/material';
import { Container, Box } from '@mui/system'
import { makeStyles } from 'tss-react/mui';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import LoginTab from '../components/LoginTab';
import SignUpTab from '../components/SignUpTab';
import { FcGoogle } from 'react-icons/fc';
import { GrLinkedin } from 'react-icons/gr';
import {GoMarkGithub} from 'react-icons/go'

const LoginPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }


  const useStyle = makeStyles()((theme) => ({
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    boxLeft: {
      width: "70vw",
      backgroundColor: "black",
      height: "100%"
    },
    boxRight: {
      width: "30vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    tab: {
      width: "350px",
      padding: "5px",
      borderRadius: "10px",
      border: "1px solid gray",
      textAlign: "center"
    },
    btnGthb: {
      display: "flex",
      gap: 10, 
      backgroundColor: "black",
      color: "white",
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
      color: "grey",
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
    logoCircle: {
      width: "43px",
      height: "43px",
      background: "#6941C6",
      borderRadius: "50%"
    },
    logoName: {
      fontSize: "35px",
      lineHeight: "53.16px",
      weight: 600
    }
  }))

  const { classes } = useStyle();

  return (
    <div className={classes.container}>
      <div className={classes.boxLeft}>
      </div>
      <div className={classes.boxRight}>
        <Box className={classes.logo}><Box className={classes.logoCircle}></Box><span className={classes.logoName}>JOBCOM</span></Box>
        <Box className={classes.tab}>
          <TabContext value={value}>
            <Box>
              <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor='secondary' centered>
                <Tab label="login" value="1" />
                <Tab label="sign up" value="2"/>
              </Tabs>
            </Box>
            <TabPanel value="1"><LoginTab/></TabPanel>
            <TabPanel value="2"><SignUpTab /></TabPanel>
            <p>OR</p>
            <Box className={classes.btngrp}>
              <Button className={classes.btnggle} size="large" fullWidth><FcGoogle/> Continue with Google</Button>
              <Button className={classes.btnLnkd} size="large" fullWidth><GrLinkedin/> Continue with LinkedIn</Button>
              <Button className={classes.btnGthb} size="large" fullWidth><GoMarkGithub/> Continue with GitHub</Button>
            </Box>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}

export default LoginPage