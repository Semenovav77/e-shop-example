import React from 'react';

import './App.css';
import {PrimarySearchAppBar} from './components';
import {Products} from './components';
import Container from '@material-ui/core/Container'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    cards: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const App = ({products:{items, shoppingProd}, addItem}) => {
    const classes = useStyles();
    return (
        <div className="container">
            <PrimarySearchAppBar shoppingProd={shoppingProd} items={items}/>
            <Container className={classes.cards}>
                <Products items={items} addItem={addItem}/>
            </Container>
        </div>
    );
};

export default App;
