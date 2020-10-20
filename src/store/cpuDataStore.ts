import { action, makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';

import { getCPUData } from 'src/api/get-cpu-data';
import LoggerStore from 'src/store/loggerDataStore';

const zone = 'Europe/Moscow';

interface CPUFrame {
  x?: number;
  y?: number;
}

interface CPUData {
  title: string;
  latestUsage: number;
  cpuData: Array<CPUFrame>;
}

class CpuDataStore {
  isLoading: boolean = false;
  counter: number = 0;
  lines: CPUData = {
    title: '',
    latestUsage: 0,
    cpuData: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  addCpuDataManually(usage: number) {
    let newCpuData = this.lines.cpuData.map(x => x);
    this.counter++;
    LoggerStore.addMessageToLogs(`Manually added CPU usage info: ${usage}`);
    newCpuData.push({
      x: this.counter,
      y: usage,
    });
    if (newCpuData.length > 40) {
      newCpuData.shift();
    }
    this.lines.cpuData = newCpuData;
    this.lines.latestUsage = usage;
  }

  getCpuInfo() {
    this.isLoading = true;
    getCPUData().then(
      action('fetchSuccess', res => {
        if (res.content?.length === 0) return;
        let latestUsage = res.content[res.content?.length - 1].cpuUsage?.toPrecision(2);
        this.lines.latestUsage = latestUsage;
        this.lines.title = latestUsage?.toString() as string;
        LoggerStore.addMessageToLogs(
          `Fetched latest CPU usage info: ${latestUsage}, total fetched size ${res.content.length}`
        );
        let newCpuData = this.lines.cpuData.map(x => x);
        this.counter++;
        res.content?.forEach(item => {
          let updatedAt = DateTime.fromISO(item.updatedAt).setZone(zone);
          updatedAt = `${updatedAt.toLocaleString(DateTime.DATE_SHORT)} ${updatedAt.toLocaleString(
            DateTime.TIME_24_WITH_SECONDS
          )}`;
          if (newCpuData.find(x => x.x === updatedAt) === undefined) {
            newCpuData.push({
              x: updatedAt,
              y: item.cpuUsage?.toPrecision(2),
            });
          }
        });
        if (newCpuData.length > 40) {
          newCpuData.shift();
        }
        //@ts-ignore
        newCpuData.sort((x, y) => x.x?.localeCompare(y.x));
        this.lines.cpuData = newCpuData;
      }),
      action('fetchError', e => (this.lines.title = 'error'))
    );
    this.isLoading = false;
  }
}

const CpuStore = new CpuDataStore();
export default CpuStore;
