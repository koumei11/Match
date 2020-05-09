export default ageScope = [...Array(82).keys()].map((i, key) => ({
  label: (key + 18).toString() + "歳",
  value: i + 18,
}));
