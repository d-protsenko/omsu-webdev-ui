import React from 'react';

import {ExampleContainer as Example} from 'src/elements/containers/example/Example';

import logo from 'src/logo.svg';
import './style.css';

const App: React.FC = () => {
    return (
        <div className='App'>
            <img src={logo} className='App-logo' alt='logo'/>
            <Example/>
        </div>
    );
};

export default App;
