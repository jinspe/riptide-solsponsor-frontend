export function timeSince(date: number): string {
  const seconds = Math.floor((new Date().getTime() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(interval)} seconds`;
}

export function fullDate(timestamp: number): string {
  const date = new Date(timestamp);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dd = date.getDate();
  const mm = months[date.getMonth()];
  const yyyy = date.getFullYear();
  const hm = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${mm} ${dd} ${yyyy} at ${hm}`;
}

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

export function timeGreeting(): string {
  const hh = new Date().getHours();
  if (hh > 2 && hh < 12) return 'Good Morning';
  if (hh >= 12 && hh <= 17) return 'Good Afternoon';
  return 'Good Evening';
}
