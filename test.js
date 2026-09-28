const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");


const PORT = 3000;

let serverProcess;

let passed = 0;
let failed = 0;


function printLine() {

    console.log(
        "========================================"
    );

}


function testResult(testName, condition) {

    if (condition) {

        console.log(
            `${testName}: PASS`
        );

        passed++;

    } else {

        console.log(
            `${testName}: FAIL`
        );

        failed++;

    }

}


function request(options, data = null) {

    return new Promise((resolve, reject) => {

        const req = http.request(
            options,
            response => {

                let body = "";


                response.on(
                    "data",
                    chunk => {

                        body += chunk;

                    }
                );


                response.on(
                    "end",
                    () => {

                        resolve({

                            statusCode:
                                response.statusCode,

                            headers:
                                response.headers,

                            body: body

                        });

                    }
                );

            }
        );


        req.on(
            "error",
            reject
        );


        if (data) {

            req.write(data);

        }


        req.end();

    });

}


function startServer() {

    return new Promise((resolve, reject) => {

        serverProcess = spawn(

            process.execPath,

            ["server.js"],

            {

                cwd: __dirname,

                stdio: [
                    "ignore",
                    "pipe",
                    "pipe"
                ]

            }

        );


        serverProcess.stdout.on(
            "data",
            data => {

                console.log(
                    `Server: ${data.toString().trim()}`
                );

            }
        );


        serverProcess.stderr.on(
            "data",
            data => {

                console.error(
                    `Server Error: ${data.toString().trim()}`
                );

            }
        );


        serverProcess.on(
            "error",
            error => {

                reject(error);

            }
        );


        setTimeout(
            resolve,
            1500
        );

    });

}


function stopServer() {

    if (serverProcess) {

        serverProcess.kill();

    }

}


async function runTests() {

    printLine();

    console.log(
        "REGISTRATION SYSTEM TESTING"
    );

    printLine();


    /*
     * Test 1
     * Registration page
     */

    const pageResponse =
        await request({

            hostname: "localhost",

            port: PORT,

            path: "/",

            method: "GET"

        });


    testResult(

        "Test 1 - Registration page loads",

        pageResponse.statusCode === 200

    );


    /*
     * Test 2
     * HTML content
     */

    testResult(

        "Test 2 - Registration HTML content",

        pageResponse.body.includes(
            "Registration Form"
        )

    );


    /*
     * Test 3
     * CSS
     */

    const cssResponse =
        await request({

            hostname: "localhost",

            port: PORT,

            path: "/style.css",

            method: "GET"

        });


    testResult(

        "Test 3 - CSS file loads",

        cssResponse.statusCode === 200

    );


    /*
     * Test 4
     * JavaScript
     */

    const jsResponse =
        await request({

            hostname: "localhost",

            port: PORT,

            path: "/registration.js",

            method: "GET"

        });


    testResult(

        "Test 4 - JavaScript file loads",

        jsResponse.statusCode === 200

    );


    /*
     * Test 5
     * Users API
     */

    const usersResponse =
        await request({

            hostname: "localhost",

            port: PORT,

            path: "/users",

            method: "GET"

        });


    testResult(

        "Test 5 - Users API loads",

        usersResponse.statusCode === 200

    );


    /*
     * Test 6
     * JSON
     */

    let usersData;


    try {

        usersData =
            JSON.parse(
                usersResponse.body
            );

    } catch {

        usersData = null;

    }


    testResult(

        "Test 6 - Users response is valid JSON",

        usersData !== null

    );


    /*
     * Test 7
     * Users array
     */

    testResult(

        "Test 7 - Users JSON contains users",

        usersData &&
        Array.isArray(
            usersData.users
        )

    );


    /*
     * Test 8
     * Registration API
     */

    const user = {

        name: "Sanskar Joshi",

        email: "sanskar@example.com",

        phone: "9876543210",

        password: "Password123",

        gender: "Male"

    };


    const registrationResponse =
        await request(

            {

                hostname: "localhost",

                port: PORT,

                path: "/register",

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                }

            },

            JSON.stringify(user)

        );


    let registrationData;


    try {

        registrationData =
            JSON.parse(
                registrationResponse.body
            );

    } catch {

        registrationData = {};

    }


    testResult(

        "Test 8 - Registration API",

        registrationResponse.statusCode === 201

    );


    /*
     * Test 9
     * Registration success
     */

    testResult(

        "Test 9 - Registration success response",

        registrationData.success === true

    );


    /*
     * Test 10
     * User name
     */

    testResult(

        "Test 10 - User name stored",

        registrationData.user &&
        registrationData.user.name ===
            "Sanskar Joshi"

    );


    /*
     * Test 11
     * Email
     */

    testResult(

        "Test 11 - Email stored",

        registrationData.user &&
        registrationData.user.email ===
            "sanskar@example.com"

    );


    /*
     * Test 12
     * Phone
     */

    testResult(

        "Test 12 - Phone number stored",

        registrationData.user &&
        registrationData.user.phone ===
            "9876543210"

    );


    /*
     * Test 13
     * Gender
     */

    testResult(

        "Test 13 - Gender stored",

        registrationData.user &&
        registrationData.user.gender ===
            "Male"

    );


    /*
     * Test 14
     * users.json
     */

    const usersFile =
        path.join(
            __dirname,
            "users.json"
        );


    testResult(

        "Test 14 - users.json exists",

        fs.existsSync(usersFile)

    );


    /*
     * Test 15
     * Retrieve users after registration
     */

    const updatedUsersResponse =
        await request({

            hostname: "localhost",

            port: PORT,

            path: "/users",

            method: "GET"

        });


    let updatedUsersData;


    try {

        updatedUsersData =
            JSON.parse(
                updatedUsersResponse.body
            );

    } catch {

        updatedUsersData = {};

    }


    testResult(

        "Test 15 - User saved in users.json",

        Array.isArray(
            updatedUsersData.users
        ) &&
        updatedUsersData.users.length > 0

    );


    /*
     * Test 16
     * Verify saved user
     */

    const storedUser =
        updatedUsersData.users[
            updatedUsersData.users.length - 1
        ];


    testResult(

        "Test 16 - Saved user verified",

        storedUser &&
        storedUser.name ===
            "Sanskar Joshi"

    );


    /*
     * Test 17
     * 404
     */

    const notFoundResponse =
        await request({

            hostname: "localhost",

            port: PORT,

            path: "/invalid-page",

            method: "GET"

        });


    testResult(

        "Test 17 - 404 handling works",

        notFoundResponse.statusCode === 404

    );


    /*
     * Display JSON
     */

    printLine();

    console.log(
        "RETRIEVED JSON DATA"
    );

    printLine();

    console.log(
        JSON.stringify(
            updatedUsersData,
            null,
            2
        )
    );


    /*
     * Final result
     */

    printLine();

    console.log(
        "TEST SUMMARY"
    );

    printLine();

    console.log(
        `TOTAL TESTS : ${passed + failed}`
    );

    console.log(
        `PASSED      : ${passed}`
    );

    console.log(
        `FAILED      : ${failed}`
    );

    printLine();


    if (failed === 0) {

        console.log(
            "RESULT: ALL TEST CASES PASSED"
        );

    } else {

        console.log(
            "RESULT: SOME TEST CASES FAILED"
        );

    }


    printLine();


    stopServer();


    /*
     * Jenkins result
     */

    if (failed > 0) {

        process.exitCode = 1;

    } else {

        process.exitCode = 0;

    }

}


async function main() {

    try {

        await startServer();

        await runTests();

    } catch (error) {

        console.error(
            "TEST ERROR:"
        );

        console.error(error);

        stopServer();

        process.exitCode = 1;

    }

}


main();