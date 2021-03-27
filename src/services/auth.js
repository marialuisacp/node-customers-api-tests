const auth = require('basic-auth')
const admin = {
  name: process.env.USER_API_AUTH,
  password: process.env.PASS_API_AUTH
}

module.exports = (req, res, next) => {
  const isAppRequest = req.url.includes('intervaloOpen');
  const user = auth(req);
  if ((!user || !admin.name || admin.password !== user.pass) && req.method !== 'OPTIONS' && !isAppRequest) {
    res.set('WWW-Authenticate', 'Basic realm="example"')
    return res.status(401).send()
  }
  return next()
};