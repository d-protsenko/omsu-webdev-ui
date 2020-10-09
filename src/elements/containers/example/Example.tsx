import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/reducers/root-reducer';
import { BaseAction } from 'src/actions/BaseAction';

import { changeData, fetchData } from 'src/actions/example';
import Button from 'src/elements/components/buttons/button/Button';

interface ExampleProps {
  data: string;
  changeData: (data) => BaseAction;
  fetchData: ({ min, max, count }) => BaseAction;
}

const Example: React.FC<ExampleProps> = props => {
  return (
    <>
      <h2>Template component ({props.data})</h2>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          alignContent: 'center',
        }}
      >
        <Button title='Fetch data' onClick={() => props.fetchData({ min: 0, max: 10, count: 1 })} />
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

export const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(Example);
