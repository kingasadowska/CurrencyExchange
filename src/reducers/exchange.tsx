import {
    getGreatestValueConversion,
    getSummary,
    changeCurrency,
    getValueAfterExchange,
} from '../utils/helpers';
import { ConversionState, Action, ConversionActionTypes } from './types';

enum TypeOfConversion {
    valueAfterConversion = "valueAfterConversion",
    conversionValue = "conversionValue"
}

const initialState: ConversionState = {
    convertibility: '0',
    conversions: [],
    allTransactions: 0,
    highestConversion: null,
};

export const exchange = (state = initialState, action: Action): ConversionState => {
    switch (action.type) {
        case ConversionActionTypes.CONVERSION_RATE:

            const conversionsAfterRateChange = changeCurrency(
                state.conversions,
                action.data,
                getValueAfterExchange,
            );
            const allTransactionsAfterRateChange: number = getSummary(
                conversionsAfterRateChange,
               TypeOfConversion.valueAfterConversion,
            );
            const greatestValueAfterRateChange = getGreatestValueConversion(
                conversionsAfterRateChange,
            );
            return {
                ...state,
                convertibility: action.data,
                conversions: conversionsAfterRateChange,
                allTransactionsAfterExchange: allTransactionsAfterRateChange,
                highestConversion: greatestValueAfterRateChange,
            };
        case ConversionActionTypes.ADD_CONVERSION:
            const updatedConversions = [...state.conversions, action.data];
            const updatedSummary = getSummary(updatedConversions, TypeOfConversion.conversionValue);  
            const updatedSummaryAfterExchange = getSummary(
                updatedConversions,
                TypeOfConversion.valueAfterConversion,
            );
            const updatedGreatestValue = getGreatestValueConversion(updatedConversions);
            return {
                ...state,
                allTransactions: updatedSummary,
                allTransactionsAfterExchange: updatedSummaryAfterExchange,
                conversions: updatedConversions,
                highestConversion: updatedGreatestValue,
            };
        case ConversionActionTypes.REMOVE_CONVERSION:
            const filtredConversions = state.conversions.filter(el => el.id !== action.id);
            const newSummary = getSummary(filtredConversions, TypeOfConversion.conversionValue);
            const newSummaryAfterExchange = getSummary(filtredConversions, TypeOfConversion.valueAfterConversion);
            const newGreatestValue = getGreatestValueConversion(filtredConversions);
            return {
                ...state,
                conversions: filtredConversions,
                allTransactions: newSummary,
                allTransactionsAfterExchange: newSummaryAfterExchange,
                highestConversion: newGreatestValue,
            };
        default:
            return state;
    }
};
