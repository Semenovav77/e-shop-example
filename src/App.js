import React from 'react';

import './App.css';
import {PrimarySearchAppBar} from './components';
import {Products} from './components';
import Container from '@material-ui/core/Container'
import {makeStyles} from "@material-ui/core/styles";

const products = Array(40).fill(null).map(() => ({
    id: new Date(),
    imgBook: 'https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_415/128391-dmitriy-gluhovskiy-metro-2033.jpg',
    title: 'Метро ' + (Math.random()*2033+10).toFixed(),
    autor: 'Дмитрий глуховский',
    rating: (Math.random()*5+1).toFixed(1),
    price: {
        new: (Math.random()*700+1).toFixed(),
        old: (Math.random()*700+1).toFixed(),
    }
}));

const useStyles = makeStyles({
    cards: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const App = () => {
  const classes = useStyles();
  return (
    <div className="container">
        <PrimarySearchAppBar />
        <Container className={classes.cards}>
        <Products products={products}/>
        </Container>
    </div>
  );
}

export default App;
