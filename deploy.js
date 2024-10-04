require("dotenv").config();
const { Octokit } = require("@octokit/rest");
const fetch = require("node-fetch");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    fetch: fetch,
  },
});

// Example usage
octokit.repos
  .listForAuthenticatedUser()
  .then(({ data }) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// Add any additional deployment logic here
