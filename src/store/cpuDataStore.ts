import { action, makeAutoObservable } from 'mobx';

import { getCPUData } from 'src/api/get-cpu-data';
import LoggerStore from 'src/store/loggerDataStore';

interface CPUFrame {
  x?: number;
  y?: number;
}

interface CPUData {
  title: string;
  latestUsage: number;
  cpuData: Array<CPUFrame>;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1)) + min;
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
        this.lines.title = res.data?.usage.toString() as string;
        let tempUsage = getRandomInt(0, 100);
        this.lines.latestUsage = tempUsage;
        LoggerStore.addMessageToLogs(`Fetched latest CPU usage info: ${tempUsage}`);
        let newCpuData = this.lines.cpuData.map(x => x);
        this.counter++;
        newCpuData.push({
          x: this.counter,
          // y: res.data?.temperature,
          y: tempUsage,
        });
        if (newCpuData.length > 40) {
          newCpuData.shift();
        }
        this.lines.cpuData = newCpuData;
      }),
      action('fetchError', e => (this.lines.title = 'error'))
    );
    this.isLoading = false;
  }
}

const CpuStore = new CpuDataStore();
export default CpuStore;
