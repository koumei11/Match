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
import shapeChoice from "../../data/shapeChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const ShapeComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 体型
  const [isNotCareShape, setIsNotCareShape] = useState(
    filterSettings.isNotCareShape
  );
  const [modalShape, setModalShape] = useState(filterSettings.shape);
  const [shape, setShape] = useState(filterSettings.shape);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setIsNotCareShape(true);
      setShape({});
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「体型」
    if (isNotCareShape) {
      setModalShape({});
    }
  }, [isNotCareShape]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「体型」
    if (Object.keys(modalShape).length) {
      setIsNotCareShape(false);
    } else {
      setIsNotCareShape(true);
    }
  }, [modalShape]);

  // shapeを入力するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ shape: shape, isNotCareShape: isNotCareShape }));
  }, [shape, isNotCareShape]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 4, shape, setModalShape)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>体型</Text>
          <View style={styles.choice}>
            {Object.keys(shape).length ? (
              Object.values(shape).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, shape, setModalShape)}
      >
        <View style={styles.popup}>
          <View style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareShape}
              onChange={() => {
                setIsNotCareShape(true);
              }}
            >
              {shapeChoice[0]}
            </SelectBox>
            <SelectBox
              isSelected={1 in modalShape}
              onChange={selectChoice.bind(
                this,
                { 1: "痩せ型" },
                modalShape,
                setModalShape
              )}
              style={styles.selectBoxes}
            >
              {shapeChoice[1]}
            </SelectBox>
            <SelectBox
              isSelected={2 in modalShape}
              onChange={selectChoice.bind(
                this,
                { 2: "グラマー" },
                modalShape,
                setModalShape
              )}
            >
              {shapeChoice[2]}
            </SelectBox>
            <SelectBox
              isSelected={3 in modalShape}
              onChange={selectChoice.bind(
                this,
                { 3: "筋肉質" },
                modalShape,
                setModalShape
              )}
            >
              {shapeChoice[3]}
            </SelectBox>
            <SelectBox
              isSelected={4 in modalShape}
              onChange={selectChoice.bind(
                this,
                { 4: "ぽっちゃり" },
                modalShape,
                setModalShape
              )}
            >
              {shapeChoice[4]}
            </SelectBox>
            <SelectBox
              isSelected={5 in modalShape}
              onChange={selectChoice.bind(
                this,
                { 5: "太め" },
                modalShape,
                setModalShape
              )}
            >
              {shapeChoice[5]}
            </SelectBox>
          </View>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, shape, setModalShape)}
            onPressComplete={setSelect.bind(this, modalShape, setShape)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ShapeComponent;
