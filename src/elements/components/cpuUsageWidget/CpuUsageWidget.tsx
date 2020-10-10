import React from 'react';
import classNames from 'classnames';
import CpuStore from 'src/store/cpuDataStore';
import { observer } from 'mobx-react';

import './style.css';

const CpuUsageWidget = observer(props => {
  const {
    lines: { latestUsage },
  } = CpuStore;
  return (
    <div className={classNames('cpu-usage-widget', latestUsage > 80 ? 'cpu-bg-red' : 'cpu-bg-light')}>
      <h1 className={'cpu-usage-current'}>{latestUsage}</h1>
      <h2 className={'cpu-usage-title'}>CPU Usage</h2>
    </div>
  );
});

export default CpuUsageWidget;
