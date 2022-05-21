import { configureStore } from '@reduxjs/toolkit'

import weatherDataSlice from './weatherDataSlice';

export const store = configureStore({
    reducer: {
        weatherData: weatherDataSlice,
    },
});
