import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Modal from "../Modals";
import PickerSelect from "../selects/PickerSelect";
import heightScope from "../../data/height";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
let TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const HeighComponent = ({
  swapValue,
  togglePickerModal,
  setPicker,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 身長
  const [modalMinHeight, setModalMinHeight] = useState(
    filterSettings.minHeight
  );
  const [modalMaxHeight, setModalMaxHeight] = useState(
    filterSettings.maxHeight
  );
  const [minHeight, setMinHeight] = useState(filterSettings.minHeight);
  const [maxHeight, setMaxHeight] = useState(filterSettings.maxHeight);

  const dispatch = useDispatch();

  useEffect(() => {
    // 最小が最大よりも大きければ入れ替え
    swapValue(minHeight, maxHeight, setMinHeight, setMaxHeight);
    // リセット
    if (isReset) {
      setModalMinHeight("");
      setModalMaxHeight("");
      setMinHeight("");
      setMaxHeight("");
    }
  });

  // heightを入力するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ minHeight: minHeight, maxHeight: maxHeight }));
  }, [minHeight, maxHeight]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={togglePickerModal.bind(
          this,
          3,
          minHeight,
          maxHeight,
          setModalMinHeight,
          setModalMaxHeight
        )}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>身長</Text>
          <View style={styles.choice}>
            {minHeight || maxHeight ? (
              <Text style={{ fontSize: 12 }}>
                {minHeight ? minHeight + "cm" : ""}〜
                {maxHeight ? maxHeight + "cm" : ""}
              </Text>
            ) : (
              <Text style={{ fontSize: 12 }}>気にしない</Text>
            )}
          </View>
        </View>
      </TouchableCmp>
      <Modal
        isModalVisible={isVisible}
        toggleModal={togglePickerModal.bind(
          this,
          0,
          minHeight,
          maxHeight,
          setModalMinHeight,
          setModalMaxHeight
        )}
      >
        <PickerSelect
          onMinChange={(value) => setModalMinHeight(value)}
          onMaxChange={(value) => setModalMaxHeight(value)}
          closeModal={togglePickerModal.bind(
            this,
            0,
            minHeight,
            maxHeight,
            setModalMinHeight,
            setModalMaxHeight
          )}
          setFilter={setPicker.bind(
            this,
            modalMinHeight,
            modalMaxHeight,
            setMinHeight,
            setMaxHeight
          )}
          items1={heightScope}
          items2={heightScope}
          modalMin={modalMinHeight}
          modalMax={modalMaxHeight}
        />
      </Modal>
    </View>
  );
};

export default HeighComponent;
