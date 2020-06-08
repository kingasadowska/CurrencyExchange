import React, { CSSProperties, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Card, Grid, Fab, Typography, CardContent, Theme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ConversionActionTypes } from '../reducers/types';
import { Conversion } from '../reducers/types';
import { RootState } from '../reducers/types';

const useStyles = makeStyles((theme: Theme) => ({
    fab: {
        width: 100,
        height: 50,
        backgroundColor: "blue",
        textTransform: "none" 
    },
    container: {
        marginBottom: '2rem',
    },
    item: {
        padding: '2rem',
        margin: '2rem 0',
    },
}),
);

const styles: Record<string, CSSProperties> = {
    item: {
        padding: '2rem',
        margin: '2rem 0',
        backgroundColor: 'rgb(204, 204, 255)'
    },
  };

interface ConversionListProps {
    conversions: Conversion[];
}

const ConversionList: React.FC<ConversionListProps> = ({ conversions }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const allTransactions = useSelector((state: RootState) => state.exchange.allTransactions);
    const allTransactionsAfterExchange = useSelector(
        (state: RootState) => state.exchange.allTransactionsAfterExchange,
    );
  
    const handleClickAdd = (event: SyntheticEvent, id: number) =>
        dispatch({ type: ConversionActionTypes.REMOVE_CONVERSION, id });
        
    return (
        <Card className={classes.container}>
            <CardContent>
                {conversions.map(
                    (
                        { title, conversionValue, id, valueAfterConversion }: Conversion,
                        index: number,
                    ) => (
                        <Grid
                            container
                            key={index}
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            style={index ? { ...styles.item } : styles.item}
                        >
                            <Typography>
                                Title of transaction: {title}
                            </Typography> 
                            <Typography>
                                €: {conversionValue}
                            </Typography>
                            <Typography>
                                PLN: {valueAfterConversion}
                            </Typography>
                            <Fab
                                color="primary"
                                className={classes.fab}
                                onClick={(event: SyntheticEvent) => handleClickAdd(event, id)}
                            >
                               Delete
                            </Fab>
                            
                        </Grid>
                    ),
                )}
            </CardContent>
            <CardContent>
                <Typography> The sum of converted EUR: {allTransactions}</Typography>
                <Typography>
                The sum of PLN spent: {allTransactionsAfterExchange}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ConversionList;
