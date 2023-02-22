import React from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeToken,
  setClientToken,
  setToken,
} from "../../../core/interceptors/interceptors";
import {
  LoginSuccessAction,
  LogoutSuccessAction,
} from "../../../core/redux/actions/authActions";
import {
  ActionFetchClientsSuccess,
  ActionFetchClientSuccess,
  ActionSetClientId,
} from "../../../core/redux/actions/clientsActions";
import { ActionFetchGroupsSuccess } from "../../../core/redux/actions/groupActions";
import { ActionFetchDevicesSuccess } from "../../../core/redux/actions/deviceActions";
import { ActionUpdatePayload } from "../../../core/redux/actions/qrActions";
import { persistor } from "../../../core/store";
import { ActionFetchSitesSuccess } from "../../../core/redux/actions/siteActions";
function Profile() {
  const isLoading = useSelector((state) => state.auth.me.isLoading);
  const me = useSelector((state) => state.auth.me.data);

  const dispatch = useDispatch();
  //reset all state calls after logout
  const handleLogout = () => {
    persistor.purge();
    (async () => {
      dispatch(ActionSetClientId(null));
      dispatch(LoginSuccessAction(null));
      dispatch(ActionFetchClientsSuccess(null));
      dispatch(ActionFetchGroupsSuccess(null));
      dispatch(ActionFetchSitesSuccess(null));
      dispatch(ActionFetchClientSuccess(null));
      dispatch(ActionFetchDevicesSuccess(null));
      dispatch(
        ActionUpdatePayload({
          clientId: false,
          siteId: false,
          groupId: false,
        })
      );

      await removeToken();
      await setToken(null);
      setClientToken(null);
      dispatch(LogoutSuccessAction(null));
    })();
  };

  function ProfileText({ children }) {
    return (
      <Text
        style={{
          fontSize: 16,
          paddingVertical: 3,
          textAlign: "center",
          fontWeight: "500",
          color: "#666",
        }}
      >
        {children}
      </Text>
    );
  }
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <>
        <View
          style={{
            backgroundColor: "#f1f1f1",
            width: "100%",
            height: "40%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          {me &&
          me.distributor &&
          me.distributor.logo &&
          me.distributor.logo ? (
            <Image
              source={{
                uri:
                  me && me.distributor && me.distributor && me.distributor.logo,
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 24,
                marginBottom: 24,
                resizeMode: "contain",
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/images/InesoMobileAppIcon.png")}
              style={{
                width: 200,
                height: 200,
                borderRadius: 24,
                marginBottom: 24,
              }}
            />
          )}
        </View>
        <View style={{ flex: 0.5 }}>
          {me && (
            <>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                {me.first_name} {me.last_name}
              </Text>
              <ProfileText>{me.email}</ProfileText>
              <ProfileText>{me.phone_number}</ProfileText>
              <ProfileText>{me.prefered_timezone}</ProfileText>
              <ProfileText>{me.distributor.name}</ProfileText>
            </>
          )}
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              paddingHorizontal: 24,
              paddingBottom: 24,
            }}
          >
            {/* <SelectBox
                placeholder="Language"
                defaultValue={activeLang}
                onSelect={(lang) => {
                  changeLanguage(lang);
                }}
                buttonTextAfterSelection={(lang) => {
                  return lang;
                }}
                rowTextForSelection={(lang) => {
                  return lang;
                }}
                data={["English", "Friench"]}
              /> */}
          </View>
          <TouchableHighlight underlayColor="#fff" onPress={handleLogout}>
            <View
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                marginBottom: 24,
                borderWidth: 1,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </>
    </View>
  );
}

export default Profile;
