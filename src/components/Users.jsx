import React, {useEffect} from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";

import {User} from './../components';

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

const Users = ({users, getUsersThunkCreator}) => {
    const classes = useStyles();
    useEffect(() => {
        getUsersThunkCreator()
    },[]);
    return (
        <>
            <div className={classes.root}>
                <p>{'Users'}</p>
                {console.log(users)}
               {users.length>0 && users.map((item) => <User key={item.id} user={item.login}/>)}
            </div>
        </>
    );
};

export default Users;
