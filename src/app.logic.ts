

// import path from 'path';
// import fs from 'fs';
// import { yarg } from './config/plugins/yargs.plugin';


// const number: number = yarg.b;
// const bannerSymbols: string = '===========================';
// const bannerText: string = `       Tabla del ${number}:          `;
// let messageBody: string ='';
// messageBody += `${bannerSymbols}\n`;
// messageBody += `${bannerText}\n`;
// messageBody += `${bannerSymbols}\n`;

// for( let i = 1; i <= yarg.l; i++) {
//   messageBody += `${number} x ${i} = ${number*i}\n`;
// }

// if (yarg.s) {
//   console.log(messageBody);
// }
// const filePath = path.join(__dirname, '../outputs', `tabla-${number}.txt`);

// fs.mkdir(path.dirname(filePath), { recursive: true }, (err) => {
//   if (err) {
//       console.error('Error al crear la carpeta:', err);
//       return;
//   }

//   // Escribir en el archivo
//   fs.writeFile(filePath, messageBody, (err) => {
//       if (err) {
//           console.error('Error al escribir en el archivo:', err);
//           return;
//       }
//       console.log('Archivo escrito correctamente.');
//   });
// });