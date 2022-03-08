export const DAYTIMESTAMP = 86400000;

export function TimestampToExpiration(
  time: number | string | undefined
): string {
  if (time === undefined) {
    return 'XX/XX/XXXX';
  }
  const a = new Date(parseFloat(String(time)));
  const year = a.getFullYear();
  let month = String(a.getMonth() + 1);
  if (month.length < 2) {
    month = `0${month}`;
  }
  let date = String(a.getDate());
  if (date.length < 2) {
    date = `0${date}`;
  }
  return `${date}/${month}/${year}`;
}
