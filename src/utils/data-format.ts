const DATE_TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
// utc时间转为1998-11-02
export function utc2time(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).format(format);
}
// 时间戳转为1998-11-02，时间戳包括毫秒13位 ，因为elemen-plus的时间选择的是13位时间戳
export function formatTimeStamp(
  timeStamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs(timeStamp).format(format);
}
