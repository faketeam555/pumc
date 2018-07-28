import moment from 'moment';

export function getDate(date, format = "LL") {
  return date ? moment(date).format(format) : moment().format(format);
}
