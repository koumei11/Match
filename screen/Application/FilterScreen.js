import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import FilterButtons from "../../components/buttons/FilterButtons";
import ShapeComponent from "../../components/filter/ShapeComponent";
import BackgroundComponent from "../../components/filter/BackgroundComponent";
import AddressComponent from "../../components/filter/AddressComponent";
import AgeComponent from "../../components/filter/AgeComponent";
import JobComponent from "../../components/filter/JobComponent";
import NameComponent from "../../components/filter/NameComponent";
import HeightComponent from "../../components/filter/HeightComponent";
import SalaryComponent from "../../components/filter/SalaryComponent";
import HolidayComponent from "../../components/filter/HolidayComponent";
import DrinkComponent from "../../components/filter/DrinkComponent";
import TabaccoComponent from "../../components/filter/TabaccoComponent";
import HopeComponent from "../../components/filter/HopeComponent";
import LoginDateComponent from "../../components/filter/LoginDateComponent";
import SortComponet from "../../components/filter/SortComponent";
import { setInitialState, setFilters } from "../../store/actions/filters";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const FilterScreen = ({ navigation }) => {
  const filterSettings = useSelector((state) => state.filters.filterSettings);
  const dispatch = useDispatch();

  // リセット
  const [isReset, setIsReset] = useState(false);

  // モーダルを閉じるか
  const [isModalVisible, setIsModalVisible] = useState(0);

  // 読み込み時にstateセット
  useEffect(() => {
    dispatch(setInitialState(filterSettings));
  }, []);

  useEffect(() => {
    setIsReset(false);
  }, [isReset]);

  // 最小が最大よりも大きければ入れ替え
  const swapValue = (minState, maxState, setMinState, setMaxState) => {
    if (minState && maxState) {
      if (minState > maxState) {
        setMinState(maxState);
        setMaxState(minState);
      }
    }
  };

  // ピッカーのモーダルを開いたり閉じたり
  const togglePickerModal = (
    index,
    minValue,
    maxValue,
    setModalMinState,
    setModalMaxState
  ) => {
    setModalMinState(minValue);
    setModalMaxState(maxValue);
    setIsModalVisible(index);
  };

  // ピッカーのフィルターを設定
  const setPicker = (minValue, maxValue, setMinState, setMaxState) => {
    setMinState(minValue);
    setMaxState(maxValue);
    setIsModalVisible(0);
  };

  // セレクトボックスのモーダルを開いたり閉じたり
  const toggleSelectModal = (index, value, setModalState) => {
    setModalState(value);
    setIsModalVisible(index);
  };

  // セレクトボックスのフィルターを設定
  const setSelect = (value, setState) => {
    setState(value);
    setIsModalVisible(0);
  };

  // セレクトボックスの選択
  const selectChoice = (obj, state, setState) => {
    const newObj = Object.assign({}, state);
    if (!(Object.keys(obj) in state)) {
      setState({ ...newObj, ...obj });
    } else {
      delete newObj[Object.keys(obj)[0]];
      setState(newObj);
    }
  };

  // 全てリセット
  const onReset = () => {
    setIsReset(true);
  };

  // 絞り込み開始
  const onComplete = () => {
    dispatch(setFilters());
    navigation.navigate("PersonList");
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <NameComponent
            styles={styles}
            filterSettings={filterSettings}
            isReset={isReset}
          />
          <View style={styles.profileWrapper}>
            <Text style={styles.profile}>プロフィール</Text>
            <View>
              <AddressComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 1}
                filterSettings={filterSettings}
                styles={styles}
              />
              <AgeComponent
                swapValue={swapValue}
                togglePickerModal={togglePickerModal}
                setPicker={setPicker}
                isVisible={isModalVisible === 2}
                isReset={isReset}
                filterSettings={filterSettings}
                styles={styles}
              />
              <HeightComponent
                swapValue={swapValue}
                togglePickerModal={togglePickerModal}
                setPicker={setPicker}
                isVisible={isModalVisible === 3}
                isReset={isReset}
                filterSettings={filterSettings}
                styles={styles}
              />
              <ShapeComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 4}
                filterSettings={filterSettings}
                styles={styles}
              />
              <SalaryComponent
                swapValue={swapValue}
                togglePickerModal={togglePickerModal}
                setPicker={setPicker}
                isReset={isReset}
                isVisible={isModalVisible === 5}
                filterSettings={filterSettings}
                styles={styles}
              />
              <BackgroundComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 6}
                filterSettings={filterSettings}
                styles={styles}
              />
              <JobComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 7}
                filterSettings={filterSettings}
                styles={styles}
              />
              <HolidayComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 8}
                filterSettings={filterSettings}
                styles={styles}
              />
              <DrinkComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 9}
                filterSettings={filterSettings}
                styles={styles}
              />
              <TabaccoComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 10}
                filterSettings={filterSettings}
                styles={styles}
              />
              <HopeComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 11}
                filterSettings={filterSettings}
                styles={styles}
              />
              <LoginDateComponent
                toggleModal={toggleSelectModal}
                selectChoice={selectChoice}
                setSelect={setSelect}
                isReset={isReset}
                isVisible={isModalVisible === 12}
                filterSettings={filterSettings}
                styles={styles}
              />
            </View>
          </View>
          <View style={styles.sort}>
            <Text style={styles.profile}>並べ替え</Text>
            <SortComponet
              styles={styles}
              filterSettings={filterSettings}
              isReset={isReset}
            />
          </View>
        </View>
      </ScrollView>
      <FilterButtons onReset={onReset} onComplete={onComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  screen: {
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    width: "80%",
  },
  resetButton: {
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.25,
    padding: 10,
    paddingVertical: SCREEN_WIDTH * 0.04,
    borderColor: Colors.buttonColor2,
    borderRadius: 30,
    alignSelf: "flex-end",
  },
  reset: {
    textAlign: "center",
    color: Colors.buttonColor2,
  },
  inputText: {
    borderBottomWidth: 1,
    borderColor: Colors.color2,
    top: 10,
    fontSize: 12,
    paddingVertical: 5,
  },
  title1: {
    fontWeight: "bold",
    color: Colors.headerColor,
  },
  wordSearch: {
    marginBottom: 70,
  },
  profile: {
    fontWeight: "bold",
    color: Colors.headerColor,
  },
  selectList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.color2,
    minHeight: 50,
  },
  text: {
    color: Colors.subColor2,
  },
  popup: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "white",
    padding: 10,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  touchableProfile: {
    flex: 1,
  },
  choice: {
    alignItems: "flex-end",
    padding: 5,
  },
  profileWrapper: {
    marginBottom: 50,
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
  },
});

export default FilterScreen;
