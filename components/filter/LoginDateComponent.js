import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import Modal from "../Modals";
import Buttons from "../buttons/Buttons";
import loginDateChoice from "../../data/loginDateChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const LoginDateComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  const [isNotCareLoginDate, setisNotCareLoginDate] = useState(
    filterSettings.isNotCareLoginDate
  );
  const [modalLoginDate, setModalLoginDate] = useState(
    filterSettings.loginDate
  );
  const [loginDate, setLoginDate] = useState(filterSettings.loginDate);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setLoginDate({});
      setisNotCareLoginDate(true);
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「ログイン日時」
    if (isNotCareLoginDate) {
      setModalLoginDate({});
    }
  }, [isNotCareLoginDate]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「ログイン日時」
    if (Object.keys(modalLoginDate).length) {
      setisNotCareLoginDate(false);
    } else {
      setisNotCareLoginDate(true);
    }
  }, [modalLoginDate]);

  // jobを更新するたびにstateを更新
  useEffect(() => {
    dispatch(
      setConditions({
        loginDate: loginDate,
        isNotCareLoginDate: isNotCareLoginDate,
      })
    );
  }, [loginDate, isNotCareLoginDate]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 12, loginDate, setModalLoginDate)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>ログイン日時</Text>
          <View style={styles.choice}>
            {Object.keys(loginDate).length ? (
              Object.values(loginDate).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, loginDate, setModalLoginDate)}
      >
        <View style={styles.popup}>
          <ScrollView style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareLoginDate}
              onChange={() => {
                setisNotCareLoginDate(true);
              }}
            >
              {loginDateChoice[0]}
            </SelectBox>
            {Object.entries(loginDateChoice).map((loginDate, key) => {
              if (loginDate[0] === "0") {
                return;
              }

              return (
                <SelectBox
                  isSelected={loginDate[0] in modalLoginDate}
                  key={key}
                  onChange={selectChoice.bind(
                    this,
                    { [loginDate[0]]: loginDate[1] },
                    modalLoginDate,
                    setModalLoginDate
                  )}
                  style={styles.selectBoxes}
                >
                  {loginDate[1]}
                </SelectBox>
              );
            })}
          </ScrollView>
          <Buttons
            onPressCancel={toggleModal.bind(
              this,
              0,
              loginDate,
              setModalLoginDate
            )}
            onPressComplete={setSelect.bind(this, modalLoginDate, setLoginDate)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoginDateComponent;
