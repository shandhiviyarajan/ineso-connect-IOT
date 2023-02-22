import React from "react";
import Toast, { BaseToast } from "react-native-toast-message";

export const Message = (type , title , message ) => {
  Toast.show({
    topOffset: 0,
    type: type,
    text1: title,
    text2: message,
    onPress() {
      Toast.hide();
    },
  });
};

const base = {
  borderBottomWidth: 4,
  borderLeftWidth: 0,
  borderRadius: 0,
  marginTop: 0,
  height: 110,
  width: "100%",
  paddingTop: 20,
};

const toastStyle = {
  container: {
    padding: 24,
    height: 100,
  },
  error: {
    ...base,
    borderBottomColor: "#98261E",
    backgroundColor: "#BE382F",
  },
  info: {
    ...base,
    borderBottomColor: "#1B5583",
    backgroundColor: "#2373B3",
  },
  warning: {
    ...base,
    borderBottomColor: "#97561D",
    backgroundColor: "#C17028",
  },
  success: {
    ...base,
    borderBottomColor: "#97561D",
    backgroundColor: "#B54E29",
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  text2: {
    fontSize: 14,
    color: "#eee",
    fontWeight: "400",
  },
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={toastStyle.success}
      contentContainerStyle={toastStyle.container}
      text1Style={toastStyle.text1}
      text2Style={toastStyle.text2}
    />
  ),

  warning: (props) => (
    <BaseToast
      {...props}
      style={toastStyle.warning}
      contentContainerStyle={toastStyle.container}
      text1Style={toastStyle.text1}
      text2Style={toastStyle.text2}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={toastStyle.error}
      contentContainerStyle={toastStyle.container}
      text1Style={toastStyle.text1}
      text2Style={toastStyle.text2}
    />
  ),

  info: (props) => (
    <BaseToast
      {...props}
      style={toastStyle.info}
      contentContainerStyle={toastStyle.container}
      text1Style={toastStyle.text1}
      text2Style={toastStyle.text2}
    />
  ),
};
