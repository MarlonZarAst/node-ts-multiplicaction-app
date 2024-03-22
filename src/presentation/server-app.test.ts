
import {ServerApp} from './server-app';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';


describe('Server App', () => {
  const options = {
      base: 2,
      limit: 10,
      showTable: false,
      destination: 'test-destination',
      fileName: 'test-filename',
    };
  beforeEach(() => {
    jest.clearAllMocks();
  })
  test('should create ServerApp', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  test('Should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    const options = {
      base: 2,
      limit: 10,
      showTable: false,
      destination: 'test-destination',
      fileName: 'test-filename',
    };
    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith('Server running');

    expect(createTableSpy).toHaveBeenCalledTimes(1);

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  });

  test('Should run with custom values mocks', () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 1 = 1');
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock
    console.error = logErrorMock
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;
    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running');
    expect(createMock).toHaveBeenCalledWith({'base': options.base, 'limit': options.limit});
    expect(saveFileMock).toHaveBeenCalledWith({
      'destination': 'test-destination',
      'filename': 'test-filename',
      'fileContent': '1 x 1 = 1'});
    expect(logMock).toHaveBeenCalledWith('El archivo se creo');
  });
});