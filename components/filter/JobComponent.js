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
import jobChoice from "../../data/jobChoice";
import SelectBox from "../selects/SelectBox";
import { useDispatch } from "react-redux";
import { setConditions } from "../../store/actions/filters";

// Androidの場合は独自のエフェクトにする
const TouchableCmp =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const JobComponent = ({
  toggleModal,
  selectChoice,
  setSelect,
  isReset,
  isVisible,
  filterSettings,
  styles,
}) => {
  const [isNotCareJob, setisNotCareJob] = useState(filterSettings.isNotCareJob);
  const [modalJob, setModalJob] = useState(filterSettings.job);
  const [job, setJob] = useState(filterSettings.job);

  const dispatch = useDispatch();

  // リセット
  useEffect(() => {
    if (isReset) {
      setJob({});
      setisNotCareJob(true);
    }
  });

  // セレクトボックスで「気にしない」を選択すると他の全てのセレクトボックスが外れる
  useEffect(() => {
    // 「職業」
    if (isNotCareJob) {
      setModalJob({});
    }
  }, [isNotCareJob]);

  // セレクトボックスで何か１つ選択すると「気にしない」が外れる
  useEffect(() => {
    // 「職業」
    if (Object.keys(modalJob).length) {
      setisNotCareJob(false);
    } else {
      setisNotCareJob(true);
    }
  }, [modalJob]);

  // jobを更新するたびにstateを更新
  useEffect(() => {
    dispatch(
      setConditions({
        job: job,
        isNotCareJob: isNotCareJob,
      })
    );
  }, [job, isNotCareJob]);

  return (
    <View style={styles.selectList}>
      <TouchableCmp
        onPress={toggleModal.bind(this, 7, job, setModalJob)}
        activeOpacity={0.7}
        style={styles.touchableProfile}
      >
        <View style={styles.profileContainer}>
          <Text style={styles.text}>お仕事</Text>
          <View style={styles.choice}>
            {Object.keys(job).length ? (
              Object.values(job).map((value, key) => (
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
        toggleModal={toggleModal.bind(this, 0, job, setModalJob)}
      >
        <View style={styles.popup}>
          <ScrollView style={styles.selectBoxes}>
            <SelectBox
              isSelected={isNotCareJob}
              onChange={() => {
                setisNotCareJob(true);
              }}
            >
              {jobChoice[0]}
            </SelectBox>
            {Object.entries(jobChoice).map((job, key) => {
              if (job[0] === "0") {
                return;
              }

              return (
                <SelectBox
                  isSelected={job[0] in modalJob}
                  key={key}
                  onChange={selectChoice.bind(
                    this,
                    { [job[0]]: job[1] },
                    modalJob,
                    setModalJob
                  )}
                  style={styles.selectBoxes}
                >
                  {job[1]}
                </SelectBox>
              );
            })}
          </ScrollView>
          <Buttons
            onPressCancel={toggleModal.bind(this, 0, job, setModalJob)}
            onPressComplete={setSelect.bind(this, modalJob, setJob)}
          />
        </View>
      </Modal>
    </View>
  );
};

export default JobComponent;
