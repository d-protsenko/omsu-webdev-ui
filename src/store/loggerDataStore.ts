import { makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';

interface Log {
  number: any;
  timepoint: any;
  message: string;
}

const zone = 'Europe/Moscow';
const getCurrentTime = () => DateTime.local().setZone(zone).toISO();

class LoggerDataStore {
  latestLogs: Array<Log> = [];
  counter: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addMessageToLogs(message: any) {
    let newLogs = this.latestLogs.map(x => x);
    this.counter++;
    newLogs.push({
      number: this.counter,
      timepoint: getCurrentTime(),
      message: message,
    });
    if (newLogs.length > 1000) {
      newLogs.shift();
    }
    this.latestLogs = newLogs;
  }
}

const LoggerStore = new LoggerDataStore();
export default LoggerStore;
