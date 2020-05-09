import {
  SET_INITIAL_STATE,
  SET_CONDITIONS,
  SET_FILTERS,
} from "../actions/filters";

// データベースから取ってくる
const initialState = {
  temporarySettings: {},
  filterSettings: {
    name: "まき",
    minAge: 20,
    maxAge: 30,
    minHeight: 150,
    maxHeight: 170,
    minSalary: 500,
    maxSalary: 3000,
    shape: {},
    background: {},
    address: {},
    job: {},
    holiday: {},
    drink: {},
    tabacco: {},
    hope: {},
    loginDate: {},
    sort: 0,
    isNotCareShape: true,
    isNotCareBackground: true,
    isNotCareAddress: true,
    isNotCareJob: true,
    isNotCareHoliday: true,
    isNotCareDrink: true,
    isNotCareTabacco: true,
    isNotCareHope: true,
    isNotCareLoginDate: true,
  },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return { ...state, temporarySettings: action.filterSettings };
    case SET_CONDITIONS:
      const newFilterSettings = {
        ...state.temporarySettings,
        ...action.filterCondition,
      };
      return { ...state, temporarySettings: newFilterSettings };
    case SET_FILTERS:
      return { ...state, filterSettings: state.temporarySettings };
    default:
      return state;
  }
};

export default filterReducer;
