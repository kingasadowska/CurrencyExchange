import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography, CardContent, Input, FormControl, InputLabel, InputAdornment, makeStyles, Theme, createStyles } from '@material-ui/core';
import { ConversionActionTypes } from '../reducers/types';
import { getValueAfterExchange } from '../utils/helpers';
import { RootState, EventType } from '../reducers/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: '2rem',
      background: 'rgb(204, 204, 255)',
  },
    margin: {
      margin: theme.spacing(1),
    },
    typogarphy: {
      margin: theme.spacing(1),
      fontSize: '0.75rem',
      fontWeight: 'bolder',
      color: 'white'
    },
  }),
);

const CurrencyExchanger: React.FC = () => {
    const classes = useStyles();
    const [value, setVaule] = useState('0');
    const [plnValue, setplnValue] = useState('');
    const convertibility = useSelector((state: RootState) => state.exchange.convertibility);
    const dispatch = useDispatch();

    useEffect(() => {
        const valueAfterConversion = getValueAfterExchange(convertibility, value);
        setplnValue(valueAfterConversion);
    }, [convertibility, value])

    const calculateValue = (event: EventType) => {
        const newValue = event.target.value;
        setVaule(newValue);
        const valueAfterConversion = getValueAfterExchange(convertibility, newValue);
        setplnValue(valueAfterConversion);
    };

    const calculateConvertibility = (event: any) => {
        const newConvertibility = event.target.value;
        dispatch({ type: ConversionActionTypes.CONVERSION_RATE, data: newConvertibility });
        const valueAfterConversion = getValueAfterExchange(newConvertibility, value);
        setplnValue(valueAfterConversion);
    };

    return (
        <Card className={classes.container}>
            <CardContent>
            <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">How many euros do you want to exchange?</InputLabel>
            <Input  
                id="standard-adornment-amount"
                value={value} 
                onChange={calculateValue} 
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                type="number" 
            />
           </FormControl>

               <Fragment>
            <FormControl fullWidth className={classes.margin}>
            <InputLabel htmlFor="standard-adornment-amount">Enter the conversion rate</InputLabel>
                <Input 
                    value={convertibility} 
                    onChange={calculateConvertibility} 
                    type="number" 
                    startAdornment={<InputAdornment position="start">zł</InputAdornment>}
                    />
            </FormControl>
            <Typography className={classes.typogarphy}>
           You will receive: {plnValue} PLN
            </Typography> 
            </Fragment>
            </CardContent>
            </Card>
    );
};

export default CurrencyExchanger;
