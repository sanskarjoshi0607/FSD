const http = require("http");
const fs = require("fs");
const path = require("path");


const PORT = 3000;


const server = http.createServer((req, res) => {

    console.log("Request:", req.method, req.url);


    /*
     * Registration HTML
     */

    if (req.url === "/" && req.method === "GET") {

        const filePath =
            path.join(__dirname, "registration.html");


        fs.readFile(filePath, (err, data) => {

            if (err) {

                console.log("HTML ERROR:", err);


                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });


                res.end(
                    "Error loading registration.html"
                );

                return;
            }


            res.writeHead(200, {
                "Content-Type": "text/html"
            });


            res.end(data);

        });


        return;
    }


    /*
     * CSS
     */

    if (req.url === "/style.css" && req.method === "GET") {

        const filePath =
            path.join(__dirname, "style.css");


        fs.readFile(filePath, (err, data) => {

            if (err) {

                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });


                res.end("CSS file not found");

                return;
            }


            res.writeHead(200, {
                "Content-Type": "text/css"
            });


            res.end(data);

        });


        return;
    }


    /*
     * JavaScript
     */

    if (
        req.url === "/registration.js" &&
        req.method === "GET"
    ) {

        const filePath =
            path.join(__dirname, "registration.js");


        fs.readFile(filePath, (err, data) => {

            if (err) {

                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });


                res.end(
                    "JavaScript file not found"
                );

                return;
            }


            res.writeHead(200, {
                "Content-Type":
                    "application/javascript"
            });


            res.end(data);

        });


        return;
    }


    /*
     * Get users
     */

    if (
        req.url === "/users" &&
        req.method === "GET"
    ) {

        const filePath =
            path.join(__dirname, "users.json");


        fs.readFile(
            filePath,
            "utf8",
            (err, data) => {

                if (err) {

                    res.writeHead(500, {
                        "Content-Type":
                            "application/json"
                    });


                    res.end(
                        JSON.stringify({
                            success: false,
                            message:
                                "Could not read users.json"
                        })
                    );

                    return;
                }


                res.writeHead(200, {
                    "Content-Type":
                        "application/json"
                });


                res.end(data);

            }
        );


        return;
    }


    /*
     * Register user
     */

    if (
        req.url === "/register" &&
        req.method === "POST"
    ) {

        let body = "";


        req.on("data", chunk => {

            body += chunk;

        });


        req.on("end", () => {

            try {

                const user =
                    JSON.parse(body);


                const filePath =
                    path.join(
                        __dirname,
                        "users.json"
                    );


                fs.readFile(
                    filePath,
                    "utf8",
                    (err, data) => {

                        let users = [];


                        /*
                         * Read existing users
                         */

                        if (!err && data) {

                            try {

                                const existingData =
                                    JSON.parse(data);


                                users =
                                    existingData.users || [];

                            } catch {

                                users = [];

                            }

                        }


                        /*
                         * Add new user
                         */

                        users.push(user);


                        /*
                         * Save users
                         */

                        fs.writeFile(
                            filePath,

                            JSON.stringify(
                                {
                                    users: users
                                },
                                null,
                                2
                            ),

                            writeError => {

                                if (writeError) {

                                    console.log(
                                        "WRITE ERROR:",
                                        writeError
                                    );


                                    res.writeHead(500, {
                                        "Content-Type":
                                            "application/json"
                                    });


                                    res.end(
                                        JSON.stringify({
                                            success: false,
                                            message:
                                                "Could not save user"
                                        })
                                    );


                                    return;
                                }


                                /*
                                 * Success
                                 */

                                res.writeHead(201, {
                                    "Content-Type":
                                        "application/json"
                                });


                                res.end(
                                    JSON.stringify({

                                        success: true,

                                        message:
                                            "Registration successful",

                                        user: user

                                    })
                                );

                            }
                        );

                    }
                );


            } catch (error) {

                console.log(
                    "JSON ERROR:",
                    error
                );


                res.writeHead(400, {
                    "Content-Type":
                        "application/json"
                });


                res.end(
                    JSON.stringify({

                        success: false,

                        message:
                            "Invalid JSON data"

                    })
                );

            }

        });


        return;
    }


    /*
     * Page not found
     */

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });


    res.end("404 - Page not found");

});


/*
 * Start server
 */

server.listen(PORT, () => {

    console.log("----------------------------------------");

    console.log(
        "Registration server started!"
    );

    console.log(
        `Open: http://localhost:${PORT}`
    );

    console.log("----------------------------------------");

});