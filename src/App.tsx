import React from 'react';
import MainView from './views/MainView';
import { Provider } from 'react-redux';
import Store from './store/createStore';

const store = Store();

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <MainView />
        </Provider>
    );
};

export default App;
