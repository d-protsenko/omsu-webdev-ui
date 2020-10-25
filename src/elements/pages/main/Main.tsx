import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { DateTime } from 'luxon';

import UsageWidget from 'src/elements/components/usageWidget/usageWidget';
import ResponsiveLineChart from 'src/elements/components/lineChart/ResponsiveLineChart';
import Aside from 'src/elements/containers/aside/Aside';

import CpuStore from 'src/store/cpuDataStore';
import RamStore from 'src/store/ramDataStore';

import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import LogsTable from 'src/elements/components/LogsTable/LogsTable';
import LoggerStore from 'src/store/loggerDataStore';
import { FormControl } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Main = observer(props => {
  useEffect(() => {
    let sinceDayAgo = DateTime.local().minus({ days: 5 });
    LoggerStore.initLoggingInfo(sinceDayAgo.toUTC().toISO());
    let since = DateTime.local();
    const interval = setInterval(() => {
      LoggerStore.getLoggingInfo(100, 0, since.toUTC().toISO());
      since = DateTime.local();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    CpuStore.getCpuInfo();
    RamStore.getRamInfo();
    const interval = setInterval(() => {
      CpuStore.getCpuInfo();
      RamStore.getRamInfo();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const { lines: cpuLines } = CpuStore;
  const { lines: ramLines } = RamStore;
  const { latestLogs } = LoggerStore;
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
  const [usage, setUsage] = useState('');
  const [usageType, setUsageType] = useState('');
  const [open, setOpen] = React.useState(false);
  const submitSideMenuForm = () => {
    if (usageType === 'cpu') {
      CpuStore.addCpuDataManually(Number(usage));
    } else {
      RamStore.addRamDataManually(Number(usage));
    }
  };
  const classes = useStyles();
  return (
    <div className='main'>
      <Aside className='main__aside' title={'Manual add'}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='open-select'>Select type of usage</InputLabel>
          <Select
            labelId='open-select-label'
            id='open-select'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={usageType}
            onChange={event => setUsageType(event.target.value as string)}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'cpu'}>CPU</MenuItem>
            <MenuItem value={'ram'}>RAM</MenuItem>
          </Select>
          <FormHelperText id='type-helper-text'>Select type of usage to add.</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='usage-input'>Type usage</InputLabel>
          <Input
            id='usage-input'
            aria-describedby='data-helper-text'
            value={usage}
            onChange={event => setUsage(event.target.value as string)}
          />
          <FormHelperText id='data-helper-text'>Input value for usage to add.</FormHelperText>
          <Button variant='contained' className={classes.button} onClick={submitSideMenuForm}>
            Submit
          </Button>
        </FormControl>
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
      <LogsTable classes={classes} rows={latestLogs} />
    </div>
  );
});

export default Main;
