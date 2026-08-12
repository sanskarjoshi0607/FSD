const fs = require("fs");
const assert = require("assert");

console.log("=================================");
console.log("       RUNNING 10 TEST CASES");
console.log("=================================\n");

let passed = 0;
let failed = 0;

// Function to run each test
function test(number, description, testFunction) {
    try {
        testFunction();

        console.log(`✅ Test ${number}: PASS - ${description}`);
        passed++;

    } catch (error) {

        console.log(`❌ Test ${number}: FAIL - ${description}`);
        console.log(`   Reason: ${error.message}`);
        failed++;
    }
}

// ---------------------------------
// Read project files
// ---------------------------------

let html = "";
let readme = "";

if (fs.existsSync("index.html")) {
    html = fs.readFileSync("index.html", "utf8");
}

if (fs.existsSync("Readme.md")) {
    readme = fs.readFileSync("Readme.md", "utf8");
}

// ---------------------------------
// TEST CASE 1
// ---------------------------------

test(1, "index.html file exists", () => {
    assert(
        fs.existsSync("index.html"),
        "index.html does not exist"
    );
});

// ---------------------------------
// TEST CASE 2
// ---------------------------------

test(2, "Readme.md file exists", () => {
    assert(
        fs.existsSync("Readme.md"),
        "Readme.md does not exist"
    );
});

// ---------------------------------
// TEST CASE 3
// ---------------------------------

test(3, "HTML document contains <html> tag", () => {
    assert(
        html.toLowerCase().includes("<html"),
        "Missing <html> tag"
    );
});

// ---------------------------------
// TEST CASE 4
// ---------------------------------

test(4, "HTML document contains <head> tag", () => {
    assert(
        html.toLowerCase().includes("<head"),
        "Missing <head> tag"
    );
});

// ---------------------------------
// TEST CASE 5
// ---------------------------------

test(5, "HTML document contains <body> tag", () => {
    assert(
        html.toLowerCase().includes("<body"),
        "Missing <body> tag"
    );
});

// ---------------------------------
// TEST CASE 6
// ---------------------------------

test(6, "HTML document contains closing </html> tag", () => {
    assert(
        html.toLowerCase().includes("</html>"),
        "Missing </html> tag"
    );
});

// ---------------------------------
// TEST CASE 7
// ---------------------------------

test(7, "HTML document contains <title> tag", () => {
    assert(
        html.toLowerCase().includes("<title>"),
        "Missing <title> tag"
    );
});

// ---------------------------------
// TEST CASE 8
// ---------------------------------

test(8, "HTML document is not empty", () => {
    assert(
        html.trim().length > 0,
        "index.html is empty"
    );
});

// ---------------------------------
// TEST CASE 9
// ---------------------------------

test(9, "Readme.md is not empty", () => {
    assert(
        readme.trim().length > 0,
        "Readme.md is empty"
    );
});

// ---------------------------------
// TEST CASE 10
// ---------------------------------

test(10, "HTML document contains valid closing body tag", () => {
    assert(
        html.toLowerCase().includes("</body>"),
        "Missing </body> tag"
    );
});

// ---------------------------------
// FINAL TEST SUMMARY
// ---------------------------------

console.log("\n=================================");
console.log("           TEST SUMMARY");
console.log("=================================");

console.log(`Total Tests : 10`);
console.log(`Tests Passed: ${passed}`);
console.log(`Tests Failed: ${failed}`);

console.log("=================================");

if (failed > 0) {

    console.log("❌ SOME TEST CASES FAILED!");
    console.log("Please check the failed test cases above.");

    process.exit(1);

} else {

    console.log("✅ ALL 10 TEST CASES PASSED!");

    process.exit(0);
}