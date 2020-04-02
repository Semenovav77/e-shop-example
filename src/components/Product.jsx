import React from 'react';
import {makeStyles, ThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: green[500],
        padding: '6px 12px',
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    card: {
        margin: 10,
        width: 250

    },
    flexbutton: {
        justifyContent: 'center',
    }

}));

const MediaCard = ({product: {id, imgBook, title, autor, rating, price}, addItem}) => {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={imgBook}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {autor}
                        </Typography><Typography variant="body2" color="textSecondary" component="p">
                        {price.new}
                        {' Р'}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.flexbutton}>
                                <ColorButton onClick={() => {addItem(id, price, imgBook, title)}} size="small" color="primary" >
                                    В корзину
                                </ColorButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default MediaCard;
