const https = require("https");

exports.getSearchSummary = (searchTerm) => {
  return new Promise((resolve, reject) => {
    const summaryOnly = "true";
    const format = "json";

    const options = {
      hostname: "en.wikipedia.org",
      path: `/w/api.php?action=query&format=${format}&prop=extracts&exintro=&explaintext=&titles=${searchTerm}`,
      headers: {
        "User-Agent": "MyBot/1.0"
      }
    };

    https.get(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        const pageId = Object.keys(response.query.pages)[0];
        const summary = response.query.pages[pageId].extract;
        resolve(summary);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
};
