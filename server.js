const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {

        const filePath = path.join(__dirname, "registration.html");

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error loading registration page");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }

    if (req.url === "/style.css" && req.method === "GET") {

        const filePath = path.join(__dirname, "style.css");

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404);
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

    if (req.url === "/registration.js" && req.method === "GET") {

        const filePath = path.join(__dirname, "registration.js");

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end("JavaScript file not found");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/javascript"
            });

            res.end(data);
        });

        return;
    }

    if (req.url === "/users" && req.method === "GET") {

        const filePath = path.join(__dirname, "users.json");

        fs.readFile(filePath, "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Could not read users.json"
                }));

                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(data);
        });

        return;
    }

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("404 - Page not found");
});


server.listen(PORT, () => {

    console.log("----------------------------------------");
    console.log("Registration server started!");
    console.log(`Open: http://localhost:${PORT}`);
    console.log("----------------------------------------");

});