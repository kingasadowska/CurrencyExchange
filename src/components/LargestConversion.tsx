import React, { Fragment } from 'react';
import { Card, Typography, CardContent, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/types';

const useStyles = makeStyles((theme: Theme) =>
createStyles({ 
    container: {
        marginBottom: '2rem',
        background: 'rgb(204, 204, 255)',
    },
    typogarphy: {
        
        fontSize: '1rem',
        fontWeight: 'bolder',
        color: 'blue'
    },
}),
);

const MaxValueCard: React.FC = () => {
    const classes = useStyles();
    const highestConversion = useSelector(
        (state: RootState) => state.exchange.highestConversion,
    );
    return (
        <Card className={classes.container}  >
             { highestConversion ? 
            <CardContent>
                <Typography className={classes.typogarphy}>The largest cash conversion</Typography>
                <Typography>
                    Conversion: {highestConversion.title}
                </Typography>
                <Typography>
                    Amount: {highestConversion.conversionValue} 
                </Typography>
                <Typography>
                Amount after currency change:{' '}
                    {highestConversion.valueAfterConversion}
                </Typography>
            </CardContent> : 
            <Fragment>
                Problem with maxValueConversion
            </Fragment> }
        </Card> 
    );
};

export default MaxValueCard;
