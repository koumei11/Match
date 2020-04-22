import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const Card = ({ name, age, address, hasVideo, imageUrl, originalStyles }) => {
  // ビデオを投稿しているかどうかで条件分岐
  const configs = hasVideo
    ? {
        colors: ["#CA1D7E", "#E35157", "#F2703F"],
        start: { x: 0.0, y: 1.0 },
        end: { x: 1.0, y: 1.0 },
      }
    : {};

  const borderStyle = hasVideo ? { borderWidth: 2, borderColor: "white" } : {};

  // ビデオを投稿しているかどうかで条件分岐
  const WrapperView = hasVideo ? LinearGradient : View;

  return (
    <WrapperView
      style={{ ...styles.container, ...originalStyles }}
      {...configs}
    >
      <View style={{ ...styles.content, ...borderStyle }}>
        <ImageBackground
          style={styles.imgBackground}
          resizeMode="cover"
          source={require("../assets/image/sample.jpg")}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: "22%",
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View style={styles.profile}>
              <Text
                style={{
                  ...styles.userInfo,
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userInfo}>{age}歳</Text>
                <Text style={styles.userInfo}>{address}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </WrapperView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    height: 250,
    padding: 3,
  },
  content: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
  },
  profile: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flex: 1,
    justifyContent: "flex-end",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userInfo: {
    color: "white",
    fontSize: 12,
    marginRight: 10,
  },
});

export default Card;
