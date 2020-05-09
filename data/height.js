export default heightScope = [...Array(71).keys()].map((i, key) => ({
  label: (key + 130).toString() + "cm",
  value: i + 130,
}));
