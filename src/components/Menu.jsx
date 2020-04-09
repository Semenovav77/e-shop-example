import React from 'react';
import {fade, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RubleSVG from './../assets/ruble.svg'
import CardActions from "@material-ui/core/CardActions/CardActions";
import PopupState, {bindTrigger} from 'material-ui-popup-state';
import {Popup} from './../components';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            '& p': {
                marginRight: 5
            },
            '& span': {
                marginRight: 15,
                color: '#fff',
                textTransform: 'uppercase',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
            '& a': {
                textDecoration: 'none'
            }

        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const PrimarySearchAppBar = ({shoppingProd, delItem}) => {
    let countShopping = 0;
    let price = 0;
    shoppingProd.forEach((item) => {
        countShopping += item.count;
        price += item.price * item.count;
    });

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <p>{price}</p>
                <img src={RubleSVG} alt='Ruble Svg'/>
            </MenuItem>
            <MenuItem>
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <>
                            <IconButton aria-label="show 11 new notifications"
                                        color="inherit" {...bindTrigger(popupState)}>
                                <Badge badgeContent={countShopping} color="secondary">
                                    <ShoppingCartIcon/>
                                </Badge>
                                <p>Shopping</p>
                            </IconButton>
                            <Popup popupState={popupState} shoppingProd={shoppingProd} delItem={delItem}/>
                        </>
                    )}
                </PopupState>
            </MenuItem>
            {/* <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>*/}
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        E-Shop
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <Link to='/login'>
                            <span> Войти </span>
                        </Link>
                        <p>{price}</p>
                        <img src={RubleSVG} alt='Ruble Svg'/>
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <>
                                    <IconButton aria-label="show 17 new notifications"
                                                color="inherit" {...bindTrigger(popupState)}>
                                        <Badge badgeContent={countShopping} color="secondary">
                                            <ShoppingCartIcon/>
                                        </Badge>
                                    </IconButton>
                                    <Popup popupState={popupState} shoppingProd={shoppingProd} delItem={delItem}/>
                                </>
                            )}
                        </PopupState>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {/*            {renderMenu}*/}
        </div>
    );
};

export default PrimarySearchAppBar;