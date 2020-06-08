import { Conversion } from '../reducers/types';

const getValueAfterExchange = (
    convertibility: string | number,
    conversionValue: string | number,
): string => {
    const value = Number(convertibility) * Number(conversionValue);
    const pointIndex = String(value).indexOf('.');
    const isFloatNumber = pointIndex !== -1 ? true : false;
    if (isFloatNumber) {
        const updatedValue = String(value).slice(0, pointIndex + 3);
        if (updatedValue.slice(pointIndex).length === 2) {
            return `${updatedValue}0`;
        }
        return updatedValue;
    }
    return `${value}.00`;
};

const getGreatestValueConversion = (values: Conversion[]): Conversion => {
    const allValues = values.sort((a, b) => b.conversionValue - a.conversionValue);
    return allValues[0];
};

const getSummary = (conversions: Conversion[], key: string): number =>
    conversions.reduce((accu, el: Conversion) => {
        return accu + Number(el[key]);
    }, 0);

const changeCurrency = (
    conversions: Conversion[],
    convertibility: string,
    getValueAfterExchangeFunc: (convertibility: string, conversionValue: number) => string,
): Conversion[] =>
    conversions.map(el => ({
        ...el,
        valueAfterConversion: getValueAfterExchangeFunc(convertibility, el.conversionValue),
    }));

export { getValueAfterExchange, getGreatestValueConversion, getSummary, changeCurrency };
