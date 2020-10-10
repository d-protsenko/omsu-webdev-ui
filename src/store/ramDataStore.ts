import { action, makeAutoObservable } from 'mobx';

import { getRAMData } from 'src/api/get-ram-data';

interface RAMFrame {
  x?: number;
  y?: number;
}

interface RAMData {
  title: string;
  latestUsage: number;
  ramData: Array<RAMFrame>;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1)) + min;
}
class RamDataStore {
  isLoading: boolean = false;
  counter: number = 0;
  lines: RAMData = {
    title: '',
    latestUsage: 0,
    ramData: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  getRamInfo() {
    this.isLoading = true;
    getRAMData().then(
      action('fetchSuccess', res => {
        this.lines.title = res.data?.usage.toString() as string;
        let tempUsage = getRandomInt(0, 100);
        this.lines.latestUsage = tempUsage;
        let newRamData = this.lines.ramData.map(x => x);
        this.counter++;
        newRamData.push({
          x: this.counter,
          // y: res.data?.usage,
          y: tempUsage,
        });
        if (newRamData.length > 40) {
          newRamData.shift();
        }
        this.lines.ramData = newRamData;
      }),
      action('fetchError', e => (this.lines.title = 'error'))
    );
    this.isLoading = false;
  }
}

const RamStore = new RamDataStore();
export default RamStore;
