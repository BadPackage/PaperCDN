// app.js
// Initialize Express server and define routes for downloading Minecraft Paper versions

const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const app = express();
const port = 3000;

// Cache setup: Cache TTL (time-to-live) is set to 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

// Function to fetch the latest Paper version
async function fetchLatestPaperVersion() {
  try {
    const response = await axios.get('https://papermc.io/api/v2/projects/paper');
    const versions = response.data.versions;
    return versions[versions.length - 1];
  } catch (error) {
    console.error('Error fetching the latest Paper version:', error);
    throw error;
  }
}

// Function to fetch specific Paper version
async function fetchPaperVersion(version) {
  try {
    const response = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}`);
    const builds = response.data.builds;
    return builds[builds.length - 1];
  } catch (error) {
    console.error(`Error fetching Paper version ${version}:`, error);
    throw error;
  }
}

// Route to get the latest Paper version
app.get('/download/paper/latest', async (req, res) => {
  const cacheKey = 'latestPaper';
  let latestVersion = cache.get(cacheKey);

  if (!latestVersion) {
    try {
      latestVersion = await fetchLatestPaperVersion();
      cache.set(cacheKey, latestVersion);
    } catch (error) {
      return res.status(500).send('Error fetching the latest Paper version');
    }
  }

  res.redirect(`/download/paper/${latestVersion}`);
});

// Route to get a specific Paper version
app.get('/download/paper/:version', async (req, res) => {
  const version = req.params.version;
  const cacheKey = `paper_${version}`;
  let latestBuild = cache.get(cacheKey);

  if (!latestBuild) {
    try {
      latestBuild = await fetchPaperVersion(version);
      cache.set(cacheKey, latestBuild);
    } catch (error) {
      return res.status(500).send(`Error fetching Paper version ${version}`);
    }
  }

  res.redirect(`https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${latestBuild}/downloads/paper-${version}-${latestBuild}.jar`);
});

// 404 route
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Minecraft Paper download server running at http://localhost:${port}`);
});
