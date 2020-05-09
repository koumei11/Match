export const SET_INITIAL_STATE = "SET_INITIAL_STATE";
export const SET_CONDITIONS = "SET_CONDITIONS";
export const SET_FILTERS = "SET_FILTERS";

export const setInitialState = (settings) => {
  return { type: SET_INITIAL_STATE, filterSettings: settings };
};

export const setConditions = (condition) => {
  return { type: SET_CONDITIONS, filterCondition: condition };
};

export const setFilters = () => {
  return { type: SET_FILTERS };
};
