import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import UsageWidget from 'src/elements/components/usageWidget/usageWidget';
import ResponsiveLineChart from 'src/elements/components/lineChart/ResponsiveLineChart';
import Aside from 'src/elements/containers/aside/Aside';

import CpuStore from 'src/store/cpuDataStore';
import RamStore from 'src/store/ramDataStore';

import './style.css';

const Main = observer(props => {
  useEffect(() => {
    const interval = setInterval(() => {
      CpuStore.getCpuInfo();
      RamStore.getRamInfo();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { lines: cpuLines } = CpuStore;
  const { lines: ramLines } = RamStore;
  const getCPULinesData = () => {
    return [
      {
        id: 'CPU Usage',
        color: 'hsl(265,70%,50%)',
        data: cpuLines.cpuData,
      },
    ];
  };
  const getRamLinesData = () => {
    return [
      {
        id: 'RAM Usage',
        color: 'hsl(334,83%,36%)',
        data: ramLines.ramData,
      },
    ];
  };

  return (
    <div className='main'>
      <Aside className='main__aside' title={'Aside menu'}>
        {}
      </Aside>
      <div className={'charts-wrapper'}>
        <div className={'chart-usage-wrapper'}>
          <ResponsiveLineChart data={getCPULinesData()} />
          <UsageWidget usage={cpuLines.latestUsage} title={'CPU'} />
        </div>
        <div className={'chart-usage-wrapper'}>
          <ResponsiveLineChart data={getRamLinesData()} />
          <UsageWidget usage={ramLines.latestUsage} title={'RAM'} />
        </div>
      </div>
    </div>
  );
});

export default Main;
