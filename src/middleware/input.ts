
export default () => (next: Function) => (action: any) => {
  console.log('middleware', action);
  next(action);
}
