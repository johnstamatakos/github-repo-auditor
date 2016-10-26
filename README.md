# Github Repo Auditor

### A simple node application to pull a user's or organization's github repositories and organize them into a JSON file using the github API.

## Installation
To install:
* Clone the repository
* Set environment variables for github credentials
```
export GITHUB_UN="your_github_username"
```
```
export GITHUB_PW="your_github_password"
```
* Run the application
```
node index.js
```

All of your github repositories will be populated in the githubRepos.json file.