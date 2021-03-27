const self = this;

self.getClientsQuery = (key, value) => {
  switch (key) {
    case 'fullname':
      return { k: key, v: new RegExp(`${value}`, 'i') };
    case 'name_initial':
      return { k: 'fullname', v: new RegExp(`^${value}`, 'i') };
    default:
      return { k: key, v: value };
  }
};

self.buildClientsQuerySearch = (q) => {
  let queries = {};
  Object.keys(q).forEach((key) => {
    const { k: newKey, v: newValue } = self.getClientsQuery(key, q[key]);
    queries[newKey] = newValue;
  });
  return queries;
};

self.getLimitClientsRequest = (q) => {
  const queries = JSON.parse(JSON.stringify(q));
  return (queries.hasOwnProperty('fullname') || queries.hasOwnProperty('name_initial') ? 300 : 50);
};