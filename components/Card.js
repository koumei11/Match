import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const Card = ({
  name,
  age,
  address,
  hasVideo,
  imageUrl,
  intro,
  originalStyles,
}) => {
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

  // 最初にカードに表示する文字数を制限
  let shortIntro =
    intro.length > 20 ? intro.substr(0, 20) + "..." : (shortIntro = intro);

  return (
    <WrapperView
      style={{
        ...styles.container,
        ...originalStyles,
        padding: hasVideo ? 3 : 0,
      }}
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
              height: "35%",
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
              <Text style={styles.intro}>{shortIntro}</Text>
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
    borderColor: "white",
  },
  content: {
    flex: 1,
    borderRadius: 15,
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
    marginBottom: 5,
  },
  userInfo: {
    color: "white",
    fontSize: 12,
    marginRight: 10,
  },
  intro: {
    fontSize: 8,
    color: "white",
  },
});

export default Card;
