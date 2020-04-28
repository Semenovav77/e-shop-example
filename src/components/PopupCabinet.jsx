import React from 'react';
import Popover from '@material-ui/core/Popover';
import {bindPopover} from 'material-ui-popup-state';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 250,
        padding: '2px 5px 2px 5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'

    }
}));

const PopupCabinet = ({popupStateCabinet, logout}) => {
    const classes = useStyles();
    return (
        <>
            <Popover
                {...bindPopover(popupStateCabinet)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className={classes.root}>
                    <Link to='/users'>
                        <span> Пользователи</span>

                    </Link>
                    <span onClick={logout}> Выйти </span>
                </div>
            </Popover>
        </>
    );
};

export default PopupCabinet;
