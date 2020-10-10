import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import CpuUsageWidget from 'src/elements/components/cpuUsageWidget/CpuUsageWidget';
import { ResponsiveLine } from '@nivo/line';
import CpuStore from 'src/store/cpuDataStore';

import './style.css';

const MyResponsiveLine = ({ data }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'time point',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'percentage',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel='y'
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

const Main = observer(props => {
  useEffect(() => {
    const interval = setInterval(() => {
      CpuStore.getCpuInfo();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { lines } = CpuStore;
  const getLinesData = () => {
    return [
      {
        id: 'CPU Usage',
        color: 'hsl(265,70%,50%)',
        data: lines.cpuData,
      },
    ];
  };
  return (
    <div className='main'>
      <div className={'responsive-bump'}>
        <MyResponsiveLine data={getLinesData()} />
      </div>
      <CpuUsageWidget />
    </div>
  );
});

export default Main;
