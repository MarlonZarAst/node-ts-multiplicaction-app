import {CreateTable} from './create-table.use-case';

describe('CreateTableUseCase', () => {
  const createTable = new CreateTable();
  test('should create table with default values', () => {
    const table = createTable.execute({base: 2});
    const rows = table.split('\n').length;

    console.log(table);

    expect( createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 x 1 = 2');
    expect(table).toContain('2 x 10 = 20');
    expect(rows).toBe(10);
  });

  test('Should create a table with custom values', () => {
    const options = {
      base: 4,
      limit:12,
    }

    const customTable = createTable.execute({base: options.base, limit: options.limit});
    const rows = customTable.split('\n').length;
    console.log(customTable);

    expect(rows).toBe(options.limit);
    expect(customTable).toContain(`${options.base} x ${options.limit} = ${options.base * options.limit}`);
    
  });
});