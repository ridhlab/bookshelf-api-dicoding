const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
    const port = 9000;
    const server = Hapi.server({
        port,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server runinng on port ${port}`);
};

init();
