const DATE_TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export function utc2time(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString, format);
}
export function formatTimeStamp(
  timeStamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.unix(timeStamp).format(format);
}
