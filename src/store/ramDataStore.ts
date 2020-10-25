import { action, makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';
import { getRAMData } from 'src/api/ram/get-ram-data';
import { createRAMData } from 'src/api/ram/create-ram-data';
import { createCPUData } from 'src/api/cpu/create-cpu-data';

const zone = 'Europe/Moscow';

interface RAMFrame {
  x?: string;
  y?: number;
}

interface RAMData {
  title: string;
  latestUsage: number;
  ramData: Array<RAMFrame>;
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

  addRamDataManually(usage: number) {
    createRAMData({
      used: usage,
      updatedAt: DateTime.local().toUTC().toISO(),
    }).then(
      action('fetchSuccess', res => {
        let newRamData = this.lines.ramData.map(x => x);
        let updatedAt = DateTime.fromISO(res.updatedAt).setZone(zone);
        updatedAt = `${updatedAt.toLocaleString(DateTime.DATE_SHORT)} ${updatedAt.toLocaleString(
          DateTime.TIME_24_WITH_SECONDS
        )}`;
        newRamData.push({
          x: updatedAt,
          y: res.used,
        });
        if (newRamData.length > 40) {
          newRamData.shift();
        }
        this.lines.ramData = newRamData;
        this.lines.latestUsage = usage;
      }),
      action('fetchError', e => (this.lines.title = 'error'))
    );
  }

  getRamInfo() {
    this.isLoading = true;
    getRAMData().then(
      action('fetchSuccess', res => {
        if (res.content?.length === 0) return;
        let latestUsage = res.content[res.content?.length - 1].used?.toPrecision(2);
        this.lines.latestUsage = latestUsage;
        this.lines.title = latestUsage?.toString() as string;
        // LoggerStore.addMessageToLogs(
        //   `Fetched latest RAM usage info: ${latestUsage}, total fetched size ${res.content.length}`
        // );
        let newRamData = this.lines.ramData.map(x => x);
        this.counter++;
        res.content?.forEach(item => {
          let updatedAt = DateTime.fromISO(item.updatedAt).setZone(zone);
          updatedAt = `${updatedAt.toLocaleString(DateTime.DATE_SHORT)} ${updatedAt.toLocaleString(
            DateTime.TIME_24_WITH_SECONDS
          )}`;
          if (newRamData.find(x => x.x === updatedAt) === undefined) {
            newRamData.push({
              x: updatedAt,
              y: item.used?.toPrecision(2),
            });
          }
        });
        if (newRamData.length > 40) {
          newRamData.shift();
        }
        //@ts-ignore
        newRamData.sort((x, y) => x.x?.localeCompare(y.x));
        this.lines.ramData = newRamData;
      }),
      action('fetchError', e => (this.lines.title = 'error'))
    );
    this.isLoading = false;
  }
}

const RamStore = new RamDataStore();
export default RamStore;
