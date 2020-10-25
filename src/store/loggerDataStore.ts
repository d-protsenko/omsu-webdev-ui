import { action, makeAutoObservable } from 'mobx';
import { DateTime } from 'luxon';
import { getLogsData } from 'src/api/log/get-logs-data';

interface Log {
  id?: string;
  updatedAt: any;
  message: string;
}

const zone = 'Europe/Moscow';
const getCurrentTime = () => DateTime.local().setZone(zone).toISO();

class LoggerDataStore {
  latestLogs: Array<Log> = [];
  counter: number = 0;
  maximumLogs: number = 1500;
  constructor() {
    makeAutoObservable(this);
  }

  addMessageToLogs(message: any) {
    let newLogs = this.latestLogs.map(x => x);
    this.counter++;
    newLogs.push({
      updatedAt: getCurrentTime(),
      message: message,
    });
    if (newLogs.length > 1000) {
      newLogs.shift();
    }
    this.latestLogs = newLogs;
  }

  initLoggingInfo(since) {
    getLogsData({ size: this.maximumLogs, page: 0, since }).then(
      action('fetchSuccess', res => {
        if (res.content?.length === 0) return;
        this.counter = this.maximumLogs;
        this.latestLogs = res.content;
      }),
      action('fetchError', e => {})
    );
  }

  getLoggingInfo(size, page, since) {
    getLogsData({ size, since, page }).then(
      action('fetchSuccess', res => {
        if (res.content?.length === 0) return;
        let newLogs = this.latestLogs.map(x => x);
        this.counter++;
        res.content?.forEach(item => {
          let updatedAt = DateTime.fromISO(item.updatedAt).setZone(zone).toISO();
          // updatedAt = `${updatedAt.toLocaleString(DateTime.DATE_SHORT)} ${updatedAt.toLocaleString(
          //   DateTime.TIME_24_WITH_SECONDS
          // )}`;
          if (newLogs.find(x => x.updatedAt === updatedAt) === undefined) {
            newLogs.push({
              ...item,
              updatedAt,
            });
          }
        });
        if (newLogs.length > this.maximumLogs) {
          newLogs.splice(this.maximumLogs, this.maximumLogs - newLogs.length);
        }
        this.latestLogs = newLogs;
      }),
      action('fetchError', e => {})
    );
  }
}

const LoggerStore = new LoggerDataStore();
export default LoggerStore;
