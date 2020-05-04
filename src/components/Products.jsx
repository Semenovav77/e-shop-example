import React, {useCallback, useEffect, useState} from 'react';
import throttle from 'lodash/throttle';
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import orderBy from 'lodash/orderBy';

import {Product} from './../components';
import upSVG from './../assets/up.svg';
import downSVG from './../assets/down.svg';

const useStyles = makeStyles((theme) => ({
    cards: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    option: {
        '& img': {
            width: 14,
            height: 14,
            marginRight: 5
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Products = ({items, addItem}) => {
    const classes = useStyles();
    const handleScroll = throttle(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log(windowHeight + ' ' + documentHeight + ' ' + scrollTop);
        if (windowHeight + scrollTop + 1 >= documentHeight) {
            setCountItem(countItem + 4)
        }
    }, 600);

    const [countItem, setCountItem] = useState(12);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (countItem === items.length) window.removeEventListener('scroll', handleScroll);
    }, [countItem]);

    const [sortId, setSortId] = React.useState('');
    const [sortBy, setSort] = React.useState('');
    const [sortingSide, setSortingSide] = React.useState('');

    const handleChange = (event) => {
        setSortId(event.target.value);
        if (event.target.value === 1 || event.target.value === 2) {
            setSort('price.new');
            if (event.target.value === 1) {
                setSortingSide('asc')
            } else {
                setSortingSide('desc')
            }
        }
        if (event.target.value === 3 || event.target.value === 4) {
            setSort('title');
            if (event.target.value === 3) {
                setSortingSide('asc')
            } else {
                setSortingSide('desc')
            }
        }
    };

    return (
        <>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Сортировать</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={sortId}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}><div className={classes.option}> <img src={upSVG} alt='UP svg'/> <span>по цене</span> </div></MenuItem>
                        <MenuItem value={2}><div className={classes.option}> <img src={downSVG} alt='DOWN svg'/> <span>по цене</span> </div></MenuItem>
                        <MenuItem value={3}><div className={classes.option}> <img src={upSVG} alt='UP svg'/> <span>по названию</span> </div></MenuItem>
                        <MenuItem value={4}><div className={classes.option}> <img src={downSVG} alt='DOWN svg'/> <span>по названию</span></div></MenuItem>

                    </Select>
                </FormControl>

            </div>
            <div className={classes.cards}>
                {orderBy(items.slice(0, countItem), [sortBy], [sortingSide]).map((product) => <Product key={product.id} product={product}
                                                                                                                     addItem={addItem}/>)}
            </div>
        </>
    );
};

export default Products;