import React from 'react';
import {connect} from 'react-redux';

import {AppState} from 'src/reducers/root-reducer';
import {BaseAction} from 'src/actions/BaseAction';

import {changeData, fetchData} from 'src/actions/example';
import Button from "src/elements/components/buttons/button/Button";

interface ExampleProps {
    data: string;
    changeData: (name: string) => BaseAction;
    fetchData: () => BaseAction;
}

const Example: React.FC<ExampleProps> = props => {
    const changeData = (e: React.ChangeEvent<HTMLInputElement>) =>
        props.changeData(e.target.value);
    return (
        <>
            <h2>Template component ({props.data})</h2>
            <div style={{
                display: 'flex',
                width: 'max-content',
                alignContent: 'center'
            }}>
                <input onChange={changeData} value={props.data}/>
                <Button title='Fetch data' onClick={props.fetchData}/>
            </div>
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    data: state.exampleReducer.data,
});

const mapDispatchToProps = {
    changeData,
    fetchData,
};

export const ExampleContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Example);
