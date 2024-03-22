import fs from 'fs';

import {SaveFile} from './save-file.use-case';


describe('SaveFileUseCase', () => {

  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs');
    if (outputFolderExists) {
      fs.rmSync('outputs',{ recursive: true});
    }

    const customOutputFolderExists = fs.existsSync('custom-outputs');
    if (customOutputFolderExists) {
      fs.rmSync('custom-outputs',{ recursive: true});
    }
  });
  
  test('Should save file with default values', () => {
    const saveFile = new SaveFile();
    const filePath = 'outputs/tabla-table.txt';
    const options = {
      fileContent: 'test content',
    };

    const result = saveFile.execute(options);
    
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding:'utf8'});

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('Should save file with custom values', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'custom content',
      destination: 'custom-outputs',
      filename: 'custom-table-name',
    }

    const filePath = `${options.destination}/tabla-${options.filename}.txt`;

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test('Should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => {throw new Error('This is a custom error message from testing');});
    
    const options = {
      fileContent: 'custom content',
      destination: 'custom-outputs',
      filename: 'custom-table-name',
    };

    const result = saveFile.execute(options);
    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  test('Shoudl return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => {throw new Error('This is a custom error from testing');});
    const result = saveFile.execute({fileContent:'Hola'});
    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});