/* eslint-disable no-promise-executor-return */
export default function sleep(ms: any) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve('caca');
    }, ms)
  );
}
