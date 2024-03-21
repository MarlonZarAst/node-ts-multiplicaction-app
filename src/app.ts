import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";


(async() => {
  await main();
})();

async function main() {
  ServerApp.run({base:yarg.b, limit: yarg.l, showTable: yarg.s, destination: yarg.d, fileName: yarg.n});
}