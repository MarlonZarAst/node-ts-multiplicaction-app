
import {ServerApp} from './presentation/server-app';

describe('Test App', () => {
  test('should call server.run with values', async() => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n','test-file', '-d', 'test-path'];

    await import('./app');
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10, limit: 5, showTable: true, destination: 'test-path', fileName: 'test-file'
    });
  });
});