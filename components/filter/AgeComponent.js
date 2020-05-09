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
import ageScope from "../../data/age";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
let TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const AgeComponent = ({
  swapValue,
  togglePickerModal,
  setPicker,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 年齢
  const [modalMinAge, setModalMinAge] = useState(filterSettings.minAge);
  const [modalMaxAge, setModalMaxAge] = useState(filterSettings.maxAge);
  const [minAge, setMinAge] = useState(filterSettings.minAge);
  const [maxAge, setMaxAge] = useState(filterSettings.maxAge);

  const dispatch = useDispatch();

  useEffect(() => {
    // 最小が最大よりも大きければ入れ替え
    swapValue(minAge, maxAge, setMinAge, setMaxAge);
    // リセット
    if (isReset) {
      setModalMinAge("");
      setModalMaxAge("");
      setMinAge("");
      setMaxAge("");
    }
  });

  // ageを更新するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ minAge: minAge, maxAge: maxAge }));
  }, [minAge, maxAge]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={togglePickerModal.bind(
          this,
          2,
          minAge,
          maxAge,
          setModalMinAge,
          setModalMaxAge
        )}
        activeOpacity={0.7}
        style={styles.touchableProfile}
        useForeground
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>年齢</Text>
          <View style={styles.choice}>
            {minAge || maxAge ? (
              <Text style={{ fontSize: 12 }}>
                {minAge ? minAge + "歳" : ""}〜{maxAge ? maxAge + "歳" : ""}
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
          minAge,
          maxAge,
          setModalMinAge,
          setModalMaxAge
        )}
      >
        <PickerSelect
          onMinChange={(value) => setModalMinAge(value)}
          onMaxChange={(value) => setModalMaxAge(value)}
          closeModal={togglePickerModal.bind(
            this,
            0,
            minAge,
            maxAge,
            setModalMinAge,
            setModalMaxAge
          )}
          setFilter={setPicker.bind(
            this,
            modalMinAge,
            modalMaxAge,
            setMinAge,
            setMaxAge
          )}
          items1={ageScope}
          items2={ageScope}
          modalMin={modalMinAge}
          modalMax={modalMaxAge}
        />
      </Modal>
    </View>
  );
};

export default AgeComponent;
