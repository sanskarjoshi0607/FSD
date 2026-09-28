
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    // Home page
    if (req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, "registration.html");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading registration page");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    // CSS file
    else if (req.method === "GET" && req.url === "/style.css") {
        const filePath = path.join(__dirname, "style.css");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("CSS file not found");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
    }

    // JavaScript file
    else if (req.method === "GET" && req.url === "/registration.js") {
        const filePath = path.join(__dirname, "registration.js");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("JavaScript file not found");
                return;
            }

            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(data);
        });
    }

    // Get users
    else if (req.method === "GET" && req.url === "/users") {
        const filePath = path.join(__dirname, "users.json");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Unable to read users" }));
                return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    // Register user
    else if (req.method === "POST" && req.url === "/register") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {
                const user = JSON.parse(body);

                const filePath = path.join(__dirname, "users.json");

                fs.readFile(filePath, "utf8", (err, data) => {

                    let usersData = { users: [] };

                    if (!err && data) {
                        try {
                            usersData = JSON.parse(data);
                        } catch (error) {
                            usersData = { users: [] };
                        }
                    }

                    usersData.users.push(user);

                    fs.writeFile(
                        filePath,
                        JSON.stringify(usersData, null, 2),
                        err => {

                            if (err) {
                                res.writeHead(500, {
                                    "Content-Type": "application/json"
                                });

                                res.end(JSON.stringify({
                                    success: false,
                                    message: "Failed to save user"
                                }));

                                return;
                            }

                            res.writeHead(201, {
                                "Content-Type": "application/json"
                            });

                            res.end(JSON.stringify({
                                success: true,
                                message: "Registration successful",
                                user: user
                            }));
                        }
                    );
                });

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: "Invalid data"
                }));
            }
        });
    }

    // 404
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


