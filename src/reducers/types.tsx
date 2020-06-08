import rootReducer from '../reducers';

export enum ConversionActionTypes {
    CONVERSION_RATE = 'CONVERSION_RATE',
    ADD_CONVERSION = 'ADD_CONVERSION',
    REMOVE_CONVERSION = 'REMOVE_CONVERSION',
}

export interface Conversion {
    [key: string]: number | string;
    id: number;
    conversion: string;
    conversionValue: number;
    valueAfterConversion: string;
}

export interface ConversionState {
    convertibility: string;
    conversions: Conversion[];
    allTransactions: number;
    highestConversion: Conversion | null;
    allTransactionsAfterExchange?: number;
}

export interface ConversionAction {
    type: ConversionActionTypes.CONVERSION_RATE;
    data: string;
}

export interface AddCurrencyConversionAction {
    type: ConversionActionTypes.ADD_CONVERSION;
    data: Conversion;
}

export interface RemoveConversionAction {
    type: ConversionActionTypes.REMOVE_CONVERSION;
    id: number;
}

export type Action = ConversionAction | AddCurrencyConversionAction | RemoveConversionAction;

export type AppState = ReturnType<typeof rootReducer>;

export type EventType = React.ChangeEvent<HTMLInputElement>;
export interface RootState {
    exchange: ConversionState;
}