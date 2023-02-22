import React from "react";
import GenerateImage from "../../../core/utils/GenerateImage";
import Geolocation from "@react-native-community/geolocation";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionFetchDevice,
  ActionFetchDevices,
} from "../../../core/redux/actions/deviceActions";
import { Message } from "../../molecules/Toast";
import { StackActions } from "@react-navigation/native";
import { apiUpdateGPSCoodinates } from "../../../core/API/apiDevices";
import { ActionActivateDeviceSuccess } from "../../../core/redux/actions/qrActions";
import { apiActiveDevice } from "../../../core/API/apiQR";
function QRSearchSuccess({ route, navigation }) {
  const { device } = route.params;

  const clientId = useSelector((state) => state.client.clientId);
  const siteId = useSelector((state) => state.client.siteId);
  const groupId = useSelector((state) => state.client.groupId);
  const activate = useSelector((state) => state.qr.activate);

  const dispatchAction = useDispatch();

  const handleViewDevice = () => {
    if (device) {
      navigation.dispatch(StackActions.replace("All devices"));
    }
  };

  const redirectToDevice = () => {
    setTimeout(() => {
      if (device) {
        navigation.dispatch(StackActions.replace("All devices"));
      }
    }, 3000);
  };
  // Geolocation.setRNConfiguration({
  //   skipPermissionRequests: false,
  //   authorizationLevel: "auto",
  //   locationProvider: "auto",
  // });
  const [progress, setProgress] = React.useState(false);
  //activate QR Code
  const handleActivateDevice = () => {
    setProgress(true);
    apiActiveDevice({
      clientId,
      deviceId: `${device.vendor}:${device.serial}`,
    })
      .then((response) => {
        dispatchAction(ActionActivateDeviceSuccess(response));
        Message("success", "Device Activated", "QR code activation successful");
        setProgress(false);
        //fetch single device again
        dispatchAction(
          ActionFetchDevice({
            clientId,
            deviceId: `${device.vendor}:${device.serial}`,
          })
        );
        
          Geolocation.getCurrentPosition(
            function (location) {
              console.log(location.coords.latitude, location.coords.longitude);
              //update user location of the device
              apiUpdateGPSCoodinates({
                clientId,
                gluonId: `${device.vendor}:${device.serial}`,
                payload: {
                  gpsLocation: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                },
              });
            },
            function (error) {
              console.log(error);
              Message("error", "Device Location", "Coudn't find device location");
            },
          );
       

        //fetch devices again
        dispatchAction(
          ActionFetchDevices({
            clientId,
            siteId: siteId ? siteId : false,
            groupId: groupId ? groupId : false,
          })
        );

        navigation.dispatch(StackActions.replace("All devices"));
      })
      .catch((error) => {
        console.log("error", error);
         setProgress(false);
        if (error.response.status === 409) {
          Message(
            "warning",
            "Device already activated",
            "QR code activation failed"
          );
        } else {
          Message("error", "Error", "QR code device activation failed");
        }
      });
  };
  React.useEffect(() => {
    if (device) {
      dispatchAction(
        ActionFetchDevice({
          clientId,
          deviceId: `${device.vendor}:${device.serial}`,
        })
      );
    }
  }, [device]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "600",
        }}
      >
        Device found
      </Text>

      {device &&
        device.metadata &&
        device.metadata.maintenance.filter((c) => c.state === "in_use").length >
          0 && (
          <>
            <Text
              style={{
                fontSize: 18,
                marginVertical: 24,
                color: "green",
                paddingHorizontal: 12,
              }}
            >
              This device is already commissioned & activated
            </Text>

            <View>
              <Image
                source={GenerateImage(device.metadata.model)}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode:"contain",
                }}
              />
              <View>
                <Text style={{ textAlign: "center" }}>
                  {device.metadata.name}
                  Please wait...
                </Text>
              </View>
            </View>
            {redirectToDevice()}
           
          </>
        )}
      {device &&
        device.metadata &&
        device.metadata.maintenance.filter((c) => c.state === "in_use")
          .length === 0 && (
          <>
            <View>
              <Image
                source={GenerateImage(device.metadata.model)}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                }}
              />
              <View>
                <Text style={{ textAlign: "center" }}>
                  {device.metadata.model}
                </Text>
                <Text style={{ textAlign: "center" }}>
                  {device.metadata.name}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 18,
                marginVertical: 24,
                paddingHorizontal: 24,
                textAlign: "center",
              }}
            >
              {progress && <>Commissioning in progress, please wait</>}
              {!progress && <>Do you want to commission this device ?</>}
            </Text>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={handleActivateDevice}
            >
              <View
                style={{
                  width: 180,
                  height: 44,
                  backgroundColor: "green",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                {activate.isLoading && <ActivityIndicator color="#fff" />}
                {!activate.isLoading && (
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {!progress && "Yes"}
                    {progress && <ActivityIndicator color="#fff" />}
                  </Text>
                )}
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => {
                navigation.navigate("Dashboard");
              }}
            >
              <View
                style={{
                  width: 180,
                  height: 44,
                  backgroundColor: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  No
                </Text>
              </View>
            </TouchableHighlight>
          </>
        )}
    </View>
  );
}
export default QRSearchSuccess;
