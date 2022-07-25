const { app: { mode } } = require("./src/config/options");

const execClusterMode = require("./src/utils/handlers/execClusterMode");
const executeApp = require("./src/app");

if (mode == "cluster") execClusterMode(executeApp);
else executeApp()

