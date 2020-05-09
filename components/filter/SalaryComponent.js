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
import salary from "../../data/salary";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
let TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const SalaryComponent = ({
  swapValue,
  togglePickerModal,
  setPicker,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  // 年収
  const [modalMinSalary, setModalMinSalary] = useState(
    filterSettings.minSalary
  );
  const [modalMaxSalary, setModalMaxSalary] = useState(
    filterSettings.maxSalary
  );
  const [minSalary, setMinSalary] = useState(filterSettings.minSalary);
  const [maxSalary, setMaxSalary] = useState(filterSettings.maxSalary);

  const dispatch = useDispatch();

  useEffect(() => {
    // 最小が最大よりも大きければ入れ替え
    swapValue(minSalary, maxSalary, setMinSalary, setMaxSalary);
    // リセット
    if (isReset) {
      setModalMinSalary("");
      setModalMaxSalary("");
      setMinSalary("");
      setMaxSalary("");
    }
  });

  // salaryを入力するたびにstateを更新
  useEffect(() => {
    dispatch(setConditions({ minSalary: minSalary, maxSalary: maxSalary }));
  }, [minSalary, maxSalary]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={togglePickerModal.bind(
          this,
          5,
          minSalary,
          maxSalary,
          setModalMinSalary,
          setModalMaxSalary
        )}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>年収</Text>
          <View style={styles.choice}>
            {minSalary || maxSalary ? (
              <Text style={{ fontSize: 12 }}>
                {minSalary ? minSalary + "万" : ""}〜
                {maxSalary ? maxSalary + "万" : ""}
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
          minSalary,
          maxSalary,
          setModalMinSalary,
          setModalMaxSalary
        )}
      >
        <PickerSelect
          onMinChange={(value) => setModalMinSalary(value)}
          onMaxChange={(value) => setModalMaxSalary(value)}
          closeModal={togglePickerModal.bind(
            this,
            0,
            minSalary,
            maxSalary,
            setModalMinSalary,
            setModalMaxSalary
          )}
          setFilter={setPicker.bind(
            this,
            modalMinSalary,
            modalMaxSalary,
            setMinSalary,
            setMaxSalary
          )}
          items1={salary}
          items2={salary}
          modalMin={modalMinSalary}
          modalMax={modalMaxSalary}
        />
      </Modal>
    </View>
  );
};

export default SalaryComponent;
