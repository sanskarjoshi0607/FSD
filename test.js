const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");


const PORT = 3000;

let serverProcess;

let passed = 0;
let failed = 0;


function printLine() {
    console.log("========================================");
}


function testResult(testName, condition) {

    if (condition) {

        console.log(`${testName}: PASS`);

        passed++;

    } else {

        console.log(`${testName}: FAIL`);

        failed++;
    }
}


function request(options, data = null) {

    return new Promise((resolve, reject) => {

        const request = http.request(
            options,
            response => {

                let body = "";

                response.on("data", chunk => {
                    body += chunk;
                });

                response.on("end", () => {

                    resolve({
                        statusCode: response.statusCode,
                        body: body
                    });

                });

            }
        );


        request.on("error", reject);


        if (data) {
            request.write(data);
        }


        request.end();

    });
}


function startServer() {

    return new Promise((resolve, reject) => {

        serverProcess = spawn(
            process.execPath,
            ["server.js"],
            {
                cwd: __dirname,
                stdio: ["ignore", "pipe", "pipe"]
            }
        );


        serverProcess.stdout.on("data", data => {

            console.log(
                `Server: ${data.toString().trim()}`
            );

        });


        serverProcess.stderr.on("data", data => {

            console.error(
                `Server Error: ${data.toString().trim()}`
            );

        });


        setTimeout(() => {

            resolve();

        }, 1500);

    });

}


function stopServer() {

    if (serverProcess) {

        serverProcess.kill();

    }

}


async function runTests() {

    printLine();

    console.log("REGISTRATION SYSTEM TESTING");

    printLine();


    /*
     * Test 1
     */

    const pageResponse = await request({

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
     */

    const user = {

        name: "Sanskar Joshi",

        email: "sanskar@example.com",

        phone: "9876543210",

        password: "Password123"

    };


    const registrationResponse = await request(

        {
            hostname: "localhost",

            port: PORT,

            path: "/register",

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            }

        },

        JSON.stringify(user)

    );


    let registrationData;

    try {

        registrationData =
            JSON.parse(registrationResponse.body);

    } catch {

        registrationData = {};

    }


    testResult(
        "Test 2 - Registration API",
        registrationResponse.statusCode === 201
    );


    /*
     * Test 3
     */

    testResult(
        "Test 3 - Registration success response",
        registrationData.success === true
    );


    /*
     * Test 4
     */

    testResult(
        "Test 4 - User name stored",
        registrationData.user &&
        registrationData.user.name === "Sanskar Joshi"
    );


    /*
     * Test 5
     */

    testResult(
        "Test 5 - Email stored",
        registrationData.user &&
        registrationData.user.email === "sanskar@example.com"
    );


    /*
     * Test 6
     */

    testResult(
        "Test 6 - Phone number stored",
        registrationData.user &&
        registrationData.user.phone === "9876543210"
    );


    /*
     * Test 7
     */

    const usersResponse = await request({

        hostname: "localhost",

        port: PORT,

        path: "/users",

        method: "GET"

    });


    let usersData;

    try {

        usersData =
            JSON.parse(usersResponse.body);

    } catch {

        usersData = {};

    }


    testResult(
        "Test 7 - Retrieve users JSON",
        usersResponse.statusCode === 200
    );


    /*
     * Test 8
     */

    testResult(
        "Test 8 - JSON contains users",
        Array.isArray(usersData.users) &&
        usersData.users.length > 0
    );


    /*
     * Test 9
     */

    const storedUser =
        usersData.users[usersData.users.length - 1];


    testResult(
        "Test 9 - Retrieved user name",
        storedUser &&
        storedUser.name === "Sanskar Joshi"
    );


    /*
     * Test 10
     */

    const usersFile =
        path.join(__dirname, "users.json");


    testResult(
        "Test 10 - users.json exists",
        fs.existsSync(usersFile)
    );


    /*
     * Display JSON
     */

    printLine();

    console.log("RETRIEVED JSON DATA");

    printLine();

    console.log(
        JSON.stringify(usersData, null, 2)
    );


    /*
     * Final result
     */

    printLine();

    console.log(`TOTAL TESTS : ${passed + failed}`);

    console.log(`PASSED      : ${passed}`);

    console.log(`FAILED      : ${failed}`);

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

        console.error("TEST ERROR:");

        console.error(error);

        stopServer();

        process.exitCode = 1;

    }

}


main();