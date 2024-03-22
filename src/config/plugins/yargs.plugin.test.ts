// import {yarg} from './yargs.plugin';


const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const {yarg} = await import('./yargs.plugin');
  return yarg;
};
describe('test yargs.plugin.ts', () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  })
  test('Should return default values', async () => {
    const argv = await runCommand(['-b', '5']);
    expect(argv).toEqual(expect.objectContaining({
      b:5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d:'outputs'
    }));
  });
  test('Should return configuration with custom values', async () => {
    const argv = await runCommand([
      '-b',
      '6',
      '-l',
      '15',
      '-s',
      '-n',
      'test-custom',
      '-d',
      'outputs-custom']);
    expect(argv).toEqual(expect.objectContaining({
      b:6,
      l: 15,
      s: true,
      n: 'test-custom',
      d:'outputs-custom',
    }));
  })
});