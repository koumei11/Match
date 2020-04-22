import React, { createRef } from "react";
import {
  // Text,
  // View,
  // Button,
  // Dimensions,
  // Platform,
  View,
} from "react-native";
// import Card from "../../components/Card";
import Swiper from "../../components/swipe/Swiper";
// import { FontAwesome5 } from "@expo/vector-icons";
// import persons from "../../dummy-data/persons";
// import Colors from "../../constants/Colors";
// import ButtonComponent from "../../components/ButtonComponent";
// import { LinearGradient } from "expo-linear-gradient";

const ReceiveGoodScreen = () => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1, paddingLeft: "25%" }}>
      <Swiper />
    </View>
  );
};

// const colors = {
//   red: "#EC2379",
//   blue: "#0070FF",
//   gray: "#777777",
//   white: "#ffffff",
//   black: "#000000",
// };

// const ReceiveGoodScreen = () => {
//   const swiperRef = createRef();

//   return (
//     <View style={styles.container}>
//       <Text
//         style={{
//           position: "absolute",
//           top: 30,
//           fontSize: 12,
//           color: Colors.subColor2,
//         }}
//       >
//         スワイプできます
//       </Text>
//       <Swiper
//         useViewOverflow={Platform.OS === "ios"}
//         ref={swiperRef}
//         cards={persons}
//         renderCard={(person) => (
//           <Card
//             name={person.name}
//             age={person.age}
//             address={person.address}
//             hasVideo={person.hasVideo}
//           />
//         )}
//         stackSize={4}
//         stackScale={10}
//         stackSeparation={2}
//         disableTopSwipe
//         disableBottomSwipe
//         animateOverlayLabelsOpacity
//         animateCardOpacity
//         backgroundColor={"transparent"}
//         onSwipedLeft={(index) => {
//           console.log(persons[index].name);
//         }}
//         onSwipedRight={(index) => {
//           console.log(persons[index].name);
//         }}
//         onSwipedAll={() => <Text>いいねしたお相手はいません</Text>}
//         overlayLabels={{
//           left: {
//             title: (
//               <FontAwesome5
//                 name="grin-beam-sweat"
//                 size={Dimensions.get("window").height * 0.02}
//               >
//                 <Text>ごめんね</Text>
//               </FontAwesome5>
//             ),
//             style: {
//               label: {
//                 backgroundColor: Colors.baseColor,
//                 color: "white",
//                 paddingTop: Platform.OS === "ios" ? 15 : 10,
//               },
//               wrapper: {
//                 flexDirection: "column",
//                 alignItems: "flex-end",
//                 marginTop: 25,
//                 marginLeft: "-21%",
//                 zIndex: 10,
//                 elevation: 5,
//               },
//             },
//           },
//           right: {
//             title: (
//               <FontAwesome5
//                 name="grin-beam"
//                 size={Dimensions.get("window").height * 0.02}
//               >
//                 <Text>ありがとう</Text>
//               </FontAwesome5>
//             ),
//             style: {
//               label: {
//                 backgroundColor: "#22b9fe",
//                 color: "white",
//                 paddingTop: Platform.OS === "ios" ? 15 : 10,
//               },
//               wrapper: {
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 justifyContent: "flex-start",
//                 marginTop: 25,
//                 marginLeft: "25%",
//                 zIndex: 10,
//                 elevation: 5,
//               },
//             },
//           },
//         }}
//       />
//       <ButtonComponent
//         originalStyles={styles.bottomButton}
//         onButtonPress={() => {
//           console.log("いいね履歴");
//         }}
//       >
//         <Text style={{ color: "white" }}>いいね！履歴</Text>
//       </ButtonComponent>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   bottomButton: {
//     backgroundColor: Colors.baseColor,
//     width: "55%",
//     position: "absolute",
//     bottom: "15%",
//   },
// });

export default ReceiveGoodScreen;
