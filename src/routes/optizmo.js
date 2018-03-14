const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

const helpers = require('./_helpers');
const BASE_URL = require('../config/constants').BASE_URL;
const AUTH_TOKEN = require('../config/constants').AUTH_TOKEN;
const CAMPAIGN_ACCESS_KEY = require('../config/constants').CAMPAIGN_ACCESS_KEY;

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/downloadlink', (req, res) => {

  try {
    const data = await helpers.fetchDownloadLink();

    if (data.result === "success") {
      res.send(data)
    } else if (data.result === "error") {
      res.status(400).send(data);
    } else {
      res.status(500).send(data);
    }

  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/zipfile', (req, res) => {
  const download_link = null;
  try {
    const data = await helpers.fetchDownloadLink();

    if (data.result === "success") {
      download_link = data.download_link;
    } else if (data.result === "error") {
      return res.status(400).send(data);
    } else {
      return res.status(500).send(data);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }

  if (!download_link) {
    return res.status(400).send({ "error": "Invalid download link"} );
  }

  const file = helpers.downloadFile(download_link);

  res.setHeader('Content-Type', 'application/zip');
  res.write(file, 'binary');
  res.end();
});

module.exports = router;
