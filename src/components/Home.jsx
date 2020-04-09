import React from 'react';
import {Route, Switch} from 'react-router-dom'

import {PrimarySearchAppBar} from './index';
import {Products} from './index';
import {UsersContainer} from './../containers';
import Container from '@material-ui/core/Container'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    cards: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const Home = ({products: {items, shoppingProd}, addItem, delItem}) => {
    const classes = useStyles();
    return (
        <div className="container">
            <PrimarySearchAppBar shoppingProd={shoppingProd} delItem={delItem}/>
            <Switch>
                <Route exact path='/' render={() => {
                    return (
                        <Container className={classes.cards}>
                            <Products items={items} addItem={addItem}/>
                        </Container>
                    )
                }}>
                </Route>
                <Route exact path='/users' render={() => <UsersContainer/>}/>
                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
        </div>
    );
};

export default Home;
