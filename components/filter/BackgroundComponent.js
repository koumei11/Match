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
import backgroundChoice from "../../data/backgroundChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const BackgroundComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  const [isNotCareBackground, setisNotCareBackground] = useState(
    filterSettings.isNotCareBackground
  );
  const [modalBackground, setModalBackground] = useState(
    filterSettings.background
  );
  const [background, setBackground] = useState(filterSettings.background);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setBackground({});
      setisNotCareBackground(true);
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「学歴」
    if (isNotCareBackground) {
      setModalBackground({});
    }
  }, [isNotCareBackground]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「学歴」
    if (Object.keys(modalBackground).length) {
      setisNotCareBackground(false);
    } else {
      setisNotCareBackground(true);
    }
  }, [modalBackground]);

  // backgroundを更新するたびにstateを更新
  useEffect(() => {
    dispatch(
      setConditions({
        background: background,
        isNotCareBackground: isNotCareBackground,
      })
    );
  }, [background, isNotCareBackground]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 6, background, setModalBackground)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>学歴</Text>
          <View style={styles.choice}>
            {Object.keys(background).length ? (
              Object.values(background).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, background, setModalBackground)}
      >
        <View style={styles.popup}>
          <View style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareBackground}
              onChange={() => {
                setisNotCareBackground(true);
              }}
            >
              {backgroundChoice[0]}
            </SelectBox>
            <SelectBox
              isSelected={1 in modalBackground}
              onChange={selectChoice.bind(
                this,
                { 1: "高校卒" },
                modalBackground,
                setModalBackground
              )}
              style={styles.selectBoxes}
            >
              {backgroundChoice[1]}
            </SelectBox>
            <SelectBox
              isSelected={2 in modalBackground}
              onChange={selectChoice.bind(
                this,
                { 2: "短大/専門卒" },
                modalBackground,
                setModalBackground
              )}
              style={styles.selectBoxes}
            >
              {backgroundChoice[2]}
            </SelectBox>
            <SelectBox
              isSelected={3 in modalBackground}
              onChange={selectChoice.bind(
                this,
                { 3: "大学卒" },
                modalBackground,
                setModalBackground
              )}
              style={styles.selectBoxes}
            >
              {backgroundChoice[3]}
            </SelectBox>
            <SelectBox
              isSelected={4 in modalBackground}
              onChange={selectChoice.bind(
                this,
                { 4: "大学院卒" },
                modalBackground,
                setModalBackground
              )}
              style={styles.selectBoxes}
            >
              {backgroundChoice[4]}
            </SelectBox>
            <SelectBox
              isSelected={5 in modalBackground}
              onChange={selectChoice.bind(
                this,
                { 5: "その他" },
                modalBackground,
                setModalBackground
              )}
              style={styles.selectBoxes}
            >
              {backgroundChoice[5]}
            </SelectBox>
          </View>
          <Buttons
            onPressCancel={toggleModal.bind(
              this,
              0,
              background,
              setModalBackground
            )}
            onPressComplete={setSelect.bind(
              this,
              modalBackground,
              setBackground
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default BackgroundComponent;
