import React from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        padding: '2px 5px 2px 5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        '& img': {
            width: 30,
            height: 30,
            borderRadius: 30
        }
    }
}));

const User = ({user}) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                {user}
            </div>
        </>
    );
};

export default User;
