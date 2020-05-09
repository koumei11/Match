import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Modal from "../Modals";
import Buttons from "../buttons/Buttons";
import holidayChoice from "../../data/holidayChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const HolidayComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 休日
  const [isNotCareHoliday, setIsNotCareHoliday] = useState(
    filterSettings.isNotCareHoliday
  );
  const [modalHoliday, setModalHoliday] = useState(filterSettings.holiday);
  const [holiday, setHoliday] = useState(filterSettings.holiday);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setIsNotCareHoliday(true);
      setHoliday({});
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「休日」
    if (isNotCareHoliday) {
      setModalHoliday({});
    }
  }, [isNotCareHoliday]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「休日」
    if (Object.keys(modalHoliday).length) {
      setIsNotCareHoliday(false);
    } else {
      setIsNotCareHoliday(true);
    }
  }, [modalHoliday]);

  // holidayを入力するたびにstateを更新
  useEffect(() => {
    dispatch(
      setConditions({ holiday: holiday, isNotCareHoliday: isNotCareHoliday })
    );
  }, [holiday, isNotCareHoliday]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 8, holiday, setModalHoliday)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>休日</Text>
          <View style={styles.choice}>
            {Object.keys(holiday).length ? (
              Object.values(holiday).map((value, key) => (
                <Text key={key} style={{ fontSize: 12 }}>
                  {value}
                </Text>
              ))
            ) : (
              <Text style={{ fontSize: 12 }}>気にしない</Text>
            )}
          </View>
        </View>
      </TouchableCmp>
      <Modal
        isModalVisible={isVisible}
        toggleModal={toggleModal.bind(this, 0, holiday, setModalHoliday)}
      >
        <View style={styles.popup}>
          <View style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareHoliday}
              onChange={() => {
                setIsNotCareHoliday(true);
              }}
            >
              {holidayChoice[0]}
            </SelectBox>
            <SelectBox
              isSelected={1 in modalHoliday}
              onChange={selectChoice.bind(
                this,
                { 1: "土日" },
                modalHoliday,
                setModalHoliday
              )}
              style={styles.selectBoxes}
            >
              {holidayChoice[1]}
            </SelectBox>
            <SelectBox
              isSelected={2 in modalHoliday}
              onChange={selectChoice.bind(
                this,
                { 2: "平日" },
                modalHoliday,
                setModalHoliday
              )}
            >
              {holidayChoice[2]}
            </SelectBox>
            <SelectBox
              isSelected={3 in modalHoliday}
              onChange={selectChoice.bind(
                this,
                { 3: "不定期" },
                modalHoliday,
                setModalHoliday
              )}
            >
              {holidayChoice[3]}
            </SelectBox>
            <SelectBox
              isSelected={4 in modalHoliday}
              onChange={selectChoice.bind(
                this,
                { 4: "その他" },
                modalHoliday,
                setModalHoliday
              )}
            >
              {holidayChoice[4]}
            </SelectBox>
          </View>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, holiday, setModalHoliday)}
            onPressComplete={setSelect.bind(this, modalHoliday, setHoliday)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HolidayComponent;
