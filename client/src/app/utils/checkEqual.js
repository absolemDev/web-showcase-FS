export function checkEqual(data, state) {
  return Object.keys(data).reduce((acc, key) => {
    return acc && data[key] === state[key];
  }, true);
}
