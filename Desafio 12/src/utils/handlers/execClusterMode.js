module.exports = (executeApp) => {

    const cpus = require("node:os").cpus().length;
    const pid = require("node:process").pid;
    const cluster = require("cluster");

    if (cluster.isPrimary) {
        console.log(`Primary process ${pid} running ✔`);

        for (let i = 0; i < cpus; i++) {
            cluster.fork();
        }

        cluster.once("exit", (worker) =>
            console.log(`Worker ${worker.process.pid} died`)
        );

        cluster.on("online", (worker) =>
            console.log(`Worker ${worker.process.pid} running ✔`)
        );
    } else {
        executeApp();
    }
};
