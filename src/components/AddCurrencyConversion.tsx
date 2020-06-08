import React, { useState } from 'react';
import { Card, CardContent,Typography, Button, TextField, Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ConversionActionTypes, RootState } from '../reducers/types';
import { useDispatch, useSelector } from 'react-redux';
import { getValueAfterExchange } from '../utils/helpers';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    container: {
        marginBottom: '1rem',
        background: 'rgb(204, 204, 255)',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
    },
    error: {
        color: 'red',
    },
    button: {
        display: 'inline-block',
        padding: '1 rem',
        color: 'white',
        marginTop: '1rem',
        borderColor: 'blue',
        backgroundColor: 'blue',
        textTransform: 'none'
    },
    typogarphy: {
        margin: theme.spacing(1),
        fontSize: '0.75rem',
        fontWeight: 'bolder',
        color: 'white'
      },
}),
);

const AddCurrencyConversion: React.FC = () => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [conversionValue, setConversionValue] = useState('');
    const [message, setMessage] = useState('');
    const convertibility: string = useSelector((state: RootState) => state.exchange.convertibility);
    const dispatch = useDispatch();
    const verifyForm = () => {
        if (!title || !conversionValue) {
            setMessage('Please fill all inputs.');
            return false;
        }
        if(title.length < 5 ) {
            setMessage('Title should contain more than 5 letters.');
            return false;
        }
        return true;
    }
    const handleClick = () => {
        if(verifyForm()) {
            dispatch({
                type: ConversionActionTypes.ADD_CONVERSION,
                data: {
                    title,
                    conversionValue,
                    id: Date.now(),
                    valueAfterConversion: getValueAfterExchange(convertibility, conversionValue),
                },
            });
            setMessage('');
            setTitle('');
            setConversionValue('');
        }
    };
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
        setMessage('');
    };
    const handleConversionChange = (event: any) => {
        const digitOnlyRegex = /^[0-9]*$/;
        let newValue = event.target.value;
        if(newValue.match(digitOnlyRegex)) {
            setConversionValue(newValue);
            setMessage('');
        }
    }
    return (
        <Card className={classes.container}>
            <CardContent>
      
                <Typography className={classes.typogarphy}>
          Add new transaction:
            </Typography> 
                <TextField 
                   id="standard-secondary"
                    label="Title" 
                    variant="filled"
                    value={title}
                    onChange={handleTitleChange}
                    type="text"
                    margin="dense" 
                />
                
                <Grid item>
                <TextField  
                    id="standard-secondary"
                    label="Amount in Euro"
                    variant="filled"
                    value={conversionValue} 
                    onChange={handleConversionChange} 
                    margin="dense"
                   
                    />
                    
                </Grid>
                {message ? <Typography className={classes.error}>{message}</Typography> : null}
                <Button variant="outlined" className={classes.button} onClick={handleClick}>
                    Add
                </Button>
          
        </CardContent>
            </Card>
    );
};

export default AddCurrencyConversion;
