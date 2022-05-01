import React from 'react'
import { AppBar, Toolbar, Grid, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
    },
    appTitle: {
        color: theme.palette.primary.main,
        fontSize: '24px',
        fontWeight: '900'
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item>
                        <div className={classes.appTitle}>Bala3nadh-CynaxLabs App</div>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
