# DevOps Test Project

This is a simple demo project created to demonstrate **Jenkins CI/CD** with automated testing.

## Project Files

- `index.html` - Main HTML webpage
- `test.js` - Contains 10 automated test cases
- `Jenkinsfile` - Defines the Jenkins CI/CD pipeline
- `Readme.md` - Project documentation

## Jenkins Pipeline

The Jenkins pipeline contains four stages:

1. **Checkout** - Gets the project from GitHub.
2. **Test** - Runs the 10 test cases using Node.js.
3. **Build** - Performs the build step.
4. **Deploy** - Simulates deployment after successful testing.

## Testing

The tests are executed using:

```bash
node test.js