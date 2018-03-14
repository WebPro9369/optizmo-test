
fetchDownloadLink = async () => {
    const constants = {};
    if (process.env.NODE_ENV === "test") {
        constants = require('../config/constants').test;
    } else {
        constants = require('../config/constants').dev;
    }
    const response = await fetch(`${constants.BASE_URL}/accesskey/download/${constants.CAMPAIGN_ACCESS_KEY}?token=${constants.AUTH_TOKEN}&format=plain&deltas=0`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
      })
    const json = response.json();
    return json;
}

downloadFile = async (download_link) => {
    const response = await fetch(download_link, {
        method: "GET",
        headers: {
            "Content-Type": "application/zip",
        }
      })

    return response;
}

module.exports = {
    fetchDownloadLink,
    downloadFile,
};