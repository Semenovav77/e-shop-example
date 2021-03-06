import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Container from '@material-ui/core/Container'
import {makeStyles} from "@material-ui/core/styles";

import {PrimarySearchAppBar} from './index';
import {Products} from './index';
import {UsersContainer} from './../containers';
import {PrivateRoute} from './commnon';

const Home = ({products: {items, shoppingProd}, addItem, delItem, isAuth, user, logoutThunkCreator}) => {
    const [itemsFiltred, setFiltredItems] = useState(Array.from(items));
    const [inputValue, setValue] = useState('');
    const onChangeInputSearch = (e) => {
        setFiltredItems(items.filter(el => el.title.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
        setValue(e.target.value);
    };
    return (
        <div className="container">
            <PrimarySearchAppBar shoppingProd={shoppingProd} delItem={delItem} onChangeInputSearch={onChangeInputSearch}
                                 inputValue={inputValue} isAuth={isAuth} user={user} logoutThunkCreator={logoutThunkCreator}/>
            <Switch>
                <Route exact path='/' render={() => {
                    return ( <>
                        <Container>
                            <Products items={itemsFiltred} addItem={addItem}/>
                        </Container>
                        </>
                    )
                }}>
                </Route>
                <PrivateRoute exact path='/users' component={UsersContainer}/>
                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            </Switch>
        </div>
    );
};

export default Home;
