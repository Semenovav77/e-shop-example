import React from 'react';
import Popover from '@material-ui/core/Popover';
import {bindPopover} from 'material-ui-popup-state';
import Button from "@material-ui/core/Button";
import {makeStyles, withStyles} from "@material-ui/core/styles";

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: '#f44336',
        padding: '6px 12px',
        '&:hover': {
            backgroundColor: '#f44336',
        },
    },
}))(Button);

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

const PopupBasket = ({popupState, shoppingProd, delItem}) => {
    const classes = useStyles();
    return (
        <>
            <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {(shoppingProd.length > 0) && shoppingProd.map((item) => {
                    return (
                        <div key={item.id}>
                            <div className={classes.root}>
                                <div className={classes.image}>
                                    <img src={item.imgBook} alt={`Book ${item.title}`}/>
                                </div>
                                <div>
                                    {item.title}
                                </div>
                                <div>
                                    <span>{`Кол-во: ${item.count}`}</span>
                                </div>
                                <div>
                                    <span>{`${item.price} руб.`}</span>
                                </div>
                                <div>
                                    <ColorButton onClick={() => {delItem(item.id)}} size="small" color="primary">
                                        Удалить
                                    </ColorButton>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Popover>
        </>
    );
};

export default PopupBasket;
