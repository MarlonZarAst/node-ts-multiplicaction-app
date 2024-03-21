import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";


interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  destination: string;
  fileName: string;
}

export class ServerApp {

  static run(options: RunOptions) {
    console.log('Server running');
    console.log(options);

    const table = new CreateTable().execute({base: options.base, limit: options.limit});
    const wasCreated = new SaveFile().execute({
      fileContent: table, destination: options.destination, filename: options.fileName});
    if(options.showTable) {
      console.log(table);
    }
    if (wasCreated) {
      console.log('El archivo se creo');
    } else {
      console.log('El archivo no se creo');
    }
  };
}