module.exports = () => {

    const { app: { inputs, cpus } } = require("../../config/options");

    return {
        cores: cpus,
        inputArguments: JSON.stringify(inputs),
        operativeSystem: process.platform,
        nodeVersion: process.version,
        reserverMemory: process.memoryUsage().rss,
        execPath: process.execPath,
        processId: process.pid,
        workingDirectory: process.cwd(),
    };

};
