const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const glob = require('glob');
const path = require('path');

const R = require('ramda');

R.map(pathName => app.use(require(path.resolve(pathName))), glob.sync( './routes/**/*.js' ));

app.listen(6663);
