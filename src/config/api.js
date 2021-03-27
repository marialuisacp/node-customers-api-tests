const originsArray = [];

const insertOrigin = (environmentKey, objArray) => {
  process.env[environmentKey] && objArray.push(process.env[environmentKey]);
  return objArray;
}
insertOrigin('UI_URL_APP', originsArray);

exports.origin = process.env.UI_URL_APP;
exports.allOrigins = originsArray;