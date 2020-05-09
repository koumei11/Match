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
import addressChoice from "../../data/addressChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const AddressComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  const [isNotCareAddress, setisNotCareAddress] = useState(
    filterSettings.isNotCareAddress
  );
  const [modalAddress, setModalAddress] = useState(filterSettings.address);
  const [address, setAddress] = useState(filterSettings.address);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setAddress({});
      setisNotCareAddress(true);
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「住んでるところ」
    if (isNotCareAddress) {
      setModalAddress({});
    }
  }, [isNotCareAddress]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「住んでるところ」
    if (Object.keys(modalAddress).length) {
      setisNotCareAddress(false);
    } else {
      setisNotCareAddress(true);
    }
  }, [modalAddress]);

  // addressを更新するたびにstateを更新
  useEffect(() => {
    dispatch(
      setConditions({
        address: address,
        isNotCareAddress: isNotCareAddress,
      })
    );
  }, [address, isNotCareAddress]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 1, address, setModalAddress)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>住んでるところ</Text>
          <View style={styles.choice}>
            {Object.keys(address).length ? (
              Object.values(address).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, address, setModalAddress)}
      >
        <View style={styles.popup}>
          <ScrollView style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareAddress}
              onChange={() => {
                setisNotCareAddress(true);
              }}
            >
              {addressChoice[0]}
            </SelectBox>
            {Object.entries(addressChoice).map((address, key) => {
              if (address[0] === "0") {
                return;
              }

              return (
                <SelectBox
                  isSelected={address[0] in modalAddress}
                  key={key}
                  onChange={selectChoice.bind(
                    this,
                    { [address[0]]: address[1] },
                    modalAddress,
                    setModalAddress
                  )}
                  style={styles.selectBoxes}
                >
                  {address[1]}
                </SelectBox>
              );
            })}
          </ScrollView>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, address, setModalAddress)}
            onPressComplete={setSelect.bind(this, modalAddress, setAddress)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddressComponent;
