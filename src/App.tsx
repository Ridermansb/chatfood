import * as React from 'react';
import './assets/style.css';
import NavBar from './components/NavBar';

const App: React.FunctionComponent = () => (
    <React.StrictMode>
        <NavBar />
        <h1 className="text-2xl text-center text-blue-900">chatfood</h1>
    </React.StrictMode>
);

export default App;
