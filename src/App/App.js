import React, { useState } from 'react'
import './App.css';
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Header from "../components/Header";
import * as productService from "../services/productService";

import Products from "../pages/Products/Products";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3A53A2",
      light: '#5E7BFD'
    },
    secondary: {
      main: "#EBD4F7",
      light: '#FF9FB1'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  const [items, setItems] = useState(productService.getAllProducts());

  React.useEffect(() => setItems(productService.getfromApi()));

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <Header />
        <Products items={items}/>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
