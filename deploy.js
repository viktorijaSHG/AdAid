const { Octokit } = require("@octokit/rest");
const fetch = require("node-fetch");

const octokit = new Octokit({
  auth: "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",
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
