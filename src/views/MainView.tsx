import React, { CSSProperties } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CurrencyExchanger from '../components/CurrencyExchanger';
import AddCurrencyConversion from '../components/AddCurrencyConversion';
import ConversionList from '../components/AllConversions';
import MaxValueCard from '../components/LargestConversion';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/types';
import Toolbar from '@material-ui/core/Toolbar';
import logoImage from '../images/euro.png';

const useStyles = makeStyles((theme: Theme) =>
createStyles({ 
    container: {
        padding: '2rem',
        backgroundColor: 'white',
        minHeight: '100vh'
    },
    toolbar: {
        color: 'white',
        backgroundColor: '#1e58ff',
        textAlign: 'center',
        opacity: 0.9,
        fontWeight: 'bold',
        
        padding: '0 0 0 1.5rem'
    },
    logo: {
        width: '5%',
        marginRight: '1rem'
    },
}),
);

const MainView: React.FC = () => {
    const classes = useStyles();
    const conversions = useSelector((state: RootState) => state.exchange.conversions);
    return (
        <>
        <Toolbar className={classes.toolbar}> 
        <img className={classes.logo} src={logoImage} alt="Logo" />
        <Typography variant="h5" >
          Converter
        </Typography>
      </Toolbar>
        <Grid container className={classes.container} direction="column" justify="flex-start">
            <Grid item xs={12} md={5}>
                <CurrencyExchanger />
                <AddCurrencyConversion />
            </Grid>
            {conversions.length ? (
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={12} md={7}>
                        <ConversionList conversions={conversions} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <MaxValueCard />
                    </Grid>
                </Grid>
            ) : null}
        </Grid>
        </>
    );
};


export default MainView;
