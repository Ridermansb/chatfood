import * as React from 'react';
import NavBar from '@components/NavBar';
import SearchForm from '@components/SearchForm';
import './assets/app.css';
import './assets/style.css';

const App: React.FunctionComponent = () => (
    <React.StrictMode>
        <NavBar />
        <SearchForm />
    </React.StrictMode>
);

export default App;
