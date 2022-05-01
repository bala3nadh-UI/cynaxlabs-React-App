import React from 'react'
import { Paper, Card, Typography, makeStyles } from '@material-ui/core'
import Slider from '@material-ui/core/Slider';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Image from "../assets/molecules.jpg";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        '& .MuiTypography-h6': {
            color: theme.palette.primary.main,
        },
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2),
        height: '110px'
    },
    pageHeader2:{
        '& .MuiTypography-h6': {
            color: theme.palette.primary.main,
        },
        padding:theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(2),
        height: '100%'
    },
    card01:{
        display:'inline-block',
        padding:theme.spacing(0.5),
        color: theme.palette.primary.main,
        boxShadow: "2px 2px 5px #ccc"
    },
    card02:{
        display:'flex',
        width: '17.5rem',
        alignItems: 'center',
        padding:theme.spacing(2),
        color: theme.palette.primary.main,
        boxShadow: "2px 2px 5px #ccc"
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: theme.palette.primary.light,
    },
    items:{
        '& .MuiSlider':{
            marginLeft: '1rem',
            alignSelf: 'end',
            color: theme.palette.primary.main,
        },
        '& .MuiSlider-thumb':{
            display: 'none'
        },
        '& .MuiSlider-track':{
            height: 7,
            borderRadius: 3
        },
        '& .MuiSlider-rail':{
            height: 7,
            borderRadius: 3
        },
        display: 'flex',
    },
    itemsSmall:{
        display: 'flex',
    },
    itemSmall:{
        display: 'flex',
        alignItems: 'end',
        paddingBottom: '2px',
        color: 'green'
    },
    iconSmall:{
        display: 'flex',
        alignItems: 'end',
        color: 'green'
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { icon } = props;
    const text1 = "Adverse effect & contraindications";
    const text2 = "Similarity measures between molecules";
    const desc1 = "546";
    const desc2 = "125%";
    const desc3 = "10%";

    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.card01}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="subtitle2"
                        component="div">
                        {text1}</Typography>
                    <div className={classes.items}>
                        <Typography
                            variant="h6"
                            component="span">
                            {desc1}
                        </Typography>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={100}
                            size="big"
                            style={{
                                marginLeft: '1rem',
                                alignSelf: 'end',
                                color: '#3A53A2',
                            }}
                        />
                        <Slider
                            aria-label="Temperature"
                            defaultValue={30}
                            style={{
                                marginLeft: '1rem',
                                alignSelf: 'end',
                                color: '#FF9FB1',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.pageHeader2}>
                <Card className={classes.card02}>
                    <Box
                        component="img"
                        sx={{
                        height: 50,
                        width: 75,
                        maxHeight: 50,
                        maxWidth: 75,
                        }}
                        alt="Molecules measurement"
                        src={Image}
                    />
                    <div className={classes.pageTitle}>
                        <Typography
                            variant="subtitle2"
                            component="div">
                            {text2}</Typography>
                        <div className={classes.items}>
                            <Typography
                                variant="h6"
                                component="span">
                                {desc2}
                            </Typography>
                            <span className={classes.itemsSmall}>
                                <span className={classes.iconSmall}>
                                    <ArrowDropUp fontSize="small" />
                                </span>
                                <span className={classes.itemSmall}>{desc3}</span>
                            </span>

                        </div>
                    </div>
                </Card>
            </div>
        </Paper>
    )
}
