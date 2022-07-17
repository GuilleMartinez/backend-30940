module.exports = () => {
    const { inputs } = require("../../config/options");

    return {
        inputArguments: JSON.stringify(inputs),
        operativeSystem: process.platform,
        nodeVersion: process.version,
        reserverMemory: process.memoryUsage().rss,
        execPath: process.execPath,
        processId: process.pid,
        workingDirectory: process.cwd(),
    };
};
