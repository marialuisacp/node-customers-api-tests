const fs = require('fs');

const coverageResults = require('../coverage/coverage-summary.json');
const coverage = coverageResults.total;
const badgesTypes = ['statements', 'lines', 'functions', 'branches'];

const badgesValues = {
  statements: { width: 143 },
  lines: { width: 143 },
  functions: { width: 143 },
  branches: { width: 143 },
};

const colors = { green: '#4c1', red: '#e74c3c', yellow: '#f1c40f' };

const getColor = (value) =>
  value > 80 ? colors.green : value >= 50 ? colors.yellow : colors.red;

const generateBadge = async ({ data, label, value }) => {
  let newData = data
    .replace(/_WIDTH_/gim, badgesValues[label].width)
    .replace(/_LABEL_/gim, label.toUpperCase())
    .replace(/_VALUE_/gim, value)
    .replace(/_COLOR_/gim, getColor(value));

  fs.writeFileSync(`./dev_scripts/output/${label}.svg`, newData, 'utf-8');
};

const getCoverage = (total, covered) => (covered / total) * 100;

const getFormattedCoverage = (type) =>
  Math.trunc(getCoverage(coverage[type].total, coverage[type].covered));

const readWriteSync = () => {
  const fileName = './dev_scripts/badge-test.svg';
  var data = fs.readFileSync(fileName, 'utf-8');

  badgesTypes.forEach((badge) => {
    const coverageValue = getFormattedCoverage(badge);
    generateBadge({ data, label: badge, value: coverageValue });
  });

  console.log('Badges generated');
};

readWriteSync();
