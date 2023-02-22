import moment from "moment";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  BackHandler,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { TabActions } from "@react-navigation/native";

import { measurementKeys } from "../../../core/constants";
import { RenameMaintenence } from "../../../core/utils/Maintenance";
import { toCapitalize, removeUnderscore } from "../../../core/utils/Capitalize";
import GenerateImage from "../../../core/utils/GenerateImage";
import { SystemColors } from "../../../core/Styles/theme/colors";
import { ActionSyncDevice } from "../../../core/redux/actions/deviceActions";
import { generateModel, vendorName } from "../../../core/utils/generateModel";
import LightDimming from "./components/LightDimming";
import { category_command } from "../../../core/utils/Categories";
import { ButtonRounded } from "../../atoms/Button/rounded";

export const Device = ({ navigation }) => {
  const activeDevice = useSelector((state) => state.device.device.data);
  const isLoading = useSelector((state) => state.device.device.isLoading);
  const [measures, setMeasures] = React.useState([]);
  const clientId = useSelector((state) => state.client.clientId);
  const dispatchAction = useDispatch();
  function CommissionList({ children }) {
    return <View>{children}</View>;
  }

  //backhandler

  const getWarrantyDays = (date) => {
    let d = new Date(date);
    let today = Date.now();
    let new_dy = d.setDate(d.getDate() + 730); // set warranty on days
    let days = "";

    days = moment(new_dy).diff(today, "years", true) + "";
    return parseInt(days);
  };

  const getWarrantyYear = (date) => {
   // console.log(date);
    let d = new Date(date);
    let today = Date.now();
    let new_d = d.setMonth(d.getMonth() + 24); //set 2 years warranty
    let year = "";

   // console.log("new_d", new_d);
    year = moment(new_d).diff(today, "years", true) + "";

  //  console.log("year", year);

    if (year.split(".")[1] === "00") {
      return parseInt(year);
    } else {
      return parseFloat(year).toFixed(2);
    }
  };

  function DeviceInfo({ title, value, unit, icon, indxKey}) {
    return (
      <View key={indxKey}
        style={{
          flex: 1,
          paddingVertical: 12,
          paddingRight: 24,
          paddingLeft: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: "#d8d8d8",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {icon ? (
            <Image
              source={icon}
              style={{
                resizeMode: "contain",
                height: 24,
                width: 24,
                tintColor: "#000",
                marginRight: 6,
              }}
            />
          ) : (
            <Image
              style={{
                width: 25,
                height: 25,
                tintColor: "#000",
                marginRight: 4,
              }}
              source={GenerateImage(
                activeDevice &&
                  activeDevice.metadata &&
                  activeDevice.metadata.model &&
                  activeDevice.metadata.model
                  ? activeDevice.metadata.model
                  : ""
              )}
            />
          )}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "#000",
            }}
          >
            {toCapitalize(title)}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "#666",
            fontWeight: "400",
          }}
        >
          {isNaN(value)
            ? value
            : value && value.toString().split(".")[1] > 0
            ? parseFloat(value).toFixed(1)
            : parseFloat(value)}
        </Text>
        <Text style={{ fontSize: 20, color: "#666", fontWeight: "400" }}>
          &nbsp;
          {unit}
        </Text>
      </View>
    );
  }

  function Online() {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            marginRight: 6,
            borderRadius: 100,
          }}
        >
          <Image
            source={require("../../../assets/images/measure/connected.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: SystemColors.success,
            }}
          />
        </View>
        <Text>Online</Text>
      </View>
    );
  }
  function OffLine() {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            marginRight: 6,
            borderRadius: 100,
          }}
        >
          <Image
            style={{
              tintColor: SystemColors.warning,
              width: 18,
              height: 18,
            }}
            source={require("../../../assets/images/measure/offline.png")}
          />
        </View>
        <Text>Offline</Text>
      </View>
    );
  }

  function DeviceLoader() {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      </>
    );
  }
  let timer = null;
  React.useEffect(() => {
    if (activeDevice) {
      BackHandler.addEventListener("hardwareBackPress", () => {
        const jumpToAction = TabActions.jumpTo("Devices");
        navigation.dispatch(jumpToAction);
      });

      let deviceMeasurements = Object.entries(
        activeDevice && activeDevice.lastMeasurement
          ? activeDevice.lastMeasurement
          : {}
      );
      let filterdMeasures = measurementKeys.filter((mk) =>
        deviceMeasurements.some((dm) => dm[0] === mk.key)
      );
      let newMeasure = filterdMeasures.map((fm) => ({
        key: fm.key,
        name: fm.name,
        unit: fm.unit,
        icon: fm.icon,
        value: deviceMeasurements.filter((dm) => dm[0] === fm.key)[0][1],
      }));
      setMeasures(newMeasure);
      timer = setTimeout(() => {
        activeDevice &&
          dispatchAction(
            ActionSyncDevice({
              clientId,
              deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
            })
          );
      }, 180 * 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [activeDevice]);
  // fetch devices every 120 seconds (2 min)
  return (
    <>
      {isLoading && <DeviceLoader />}
      {activeDevice && (
        <View>
          <View
            style={{
              height: 116,
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 8,
              flexDirection: "row",
              backgroundColor: "#F2F5F9",
            }}
          >
            <Image
              source={GenerateImage(
                activeDevice &&
                  activeDevice &&
                  activeDevice.metadata &&
                  activeDevice.metadata.model
              )}
              style={{
                width: 64,
                height: 64,
                marginRight: 12,
                tintColor: "#000",
                resizeMode: "contain",
              }}
            ></Image>
            <View>
              <Text
                style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}
              >
                {activeDevice &&
                  activeDevice.metadata &&
                  activeDevice.metadata.name &&
                  activeDevice.metadata.name}
              </Text>
              <Text
                style={{ fontSize: 16, fontWeight: "400", marginBottom: 8 }}
              >
                {activeDevice &&
                  activeDevice.metadata &&
                  activeDevice.metadata.model &&
                  generateModel(activeDevice.metadata.model, "type")}
              </Text>
              {activeDevice.online_status && <Online />}
              {!activeDevice.online_status && <OffLine />}
            </View>
          </View>

          <ScrollView
            contentContainerStyle={{
              padding: 12,
              backgroundColor: "#F2F5F9",
              paddingBottom: 120,
            }}
          >
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
        Model : &nbsp;
                </Text>
                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {activeDevice &&
                    activeDevice.metadata &&
                    activeDevice.metadata.model &&
                    generateModel(activeDevice.metadata.model, "model")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Line: &nbsp;
                </Text>

                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {toCapitalize(removeUnderscore(activeDevice.line))}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Vendor: &nbsp;
                </Text>
                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {activeDevice.vendor && vendorName(activeDevice.vendor)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                  }}
                >
                  Serial number: &nbsp;
                </Text>
                <Text style={{ fontSize: 16, color: "#5E5E5E" }}>
                  {activeDevice.serial}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000",
                    fontWeight: "400",
                  }}
                >
                  Last measurement:
                </Text>
                <Text style={{ fontSize: 14, color: "#5E5E5E" }}>
                  &nbsp;
                  {activeDevice &&
                    activeDevice.lastMeasurement &&
                    activeDevice.lastMeasurement.time &&
                    moment(activeDevice.lastMeasurement.time).format(
                      "DD-MM-YYYY hh:mm A"
                    )}
                </Text>
              </View>
            </View>
            {
              measures && measures.length > 0 &&   
              <View style={styles.card_measure}>
              {
                measures.map(
                  (measure, i) =>
                    measure.value !== null && (
                      <DeviceInfo
                        icon={measure.icon}
                        title={measure.name}
                        value={measure.value}
                        unit={measure.unit ? measure.unit : ""}
                        indxKey={"measure" + i}
                      />
                    )
                )}
            </View>
            }
         
            {category_command.filter((cc) => cc.name === activeDevice.category)
              .length > 0 && (
              <>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    marginBottom: 12,
                  }}
                >
                  Command
                </Text>
                <View style={styles.card}>
                  <LightDimming activeDevice={activeDevice} />
                </View>
              </>
            )}
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Commissioning
              </Text>
              {
                activeDevice &&
                  activeDevice.metadata &&
                  activeDevice.metadata.maintenance &&
                   <View style={styles.card}>
                {
                  activeDevice.metadata.maintenance
                    .filter((c) => c.state === "in_use")
                    .map(
                      (cycle, i) =>
                        i === 0 && (
                          <View
                            key={"cycle" + i}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <View
                                style={{
                                  flex: 4,
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "400",
                                    width: "100%",
                                    display: "flex",

                                    fontSize: 16,
                                    marginBottom: 6,
                                    marginTop: 0,
                                  }}
                                >
                                  Current State:{" "}
                                  {cycle.state &&
                                    cycle.state &&
                                    toCapitalize(
                                      RenameMaintenence(
                                        cycle.state && cycle.state
                                      )
                                    )}
                                </Text>
                                <Text
                                  style={{
                                    marginBottom: 6,
                                    color: "#5E5E5E",
                                    fontSize: 16,
                                  }}
                                >
                                  Date:{" "}
                                  {moment(cycle.timestamp).format("D-MM-yyyy")}
                                </Text>
                              </View>
                              <Image
                                source={require("../../../assets/images/qr.png")}
                                style={{
                                  resizeMode: "contain",
                                  flex: 1,
                                  width: 56,
                                  height: 56,
                                  tintColor: SystemColors.primary,
                                }}
                              />
                            </View>
                          </View>
                        )
                    )}
              </View>
              }
             
            </>
            {activeDevice &&
              activeDevice.metadata &&
              activeDevice.metadata.maintenance &&
              activeDevice.metadata.maintenance
                .filter((c) => c.state === "in_use")
                .map(
                  (cycle, i) =>
                    i === 0 && (
                      <>
                        <Text
                          key={"cycle2" + i}
                          style={{
                            fontSize: 20,
                            fontWeight: "500",
                            marginBottom: 12,
                          }}
                        >
                          Warranty
                        </Text>
                        <View style={styles.card}>
                          <Text
                            style={{
                              paddingVertical: 8,
                              fontSize: 16,
                              fontWeight: "400",
                            }}
                          >
                           
                            Operating time: {getWarrantyDays(cycle.date ? cycle.date : cycle.timestamp)}
                            {getWarrantyDays(cycle.date) > 1
                              ? "Days"
                              : "Day"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                paddingVertical: 8,
                                fontSize: 16,
                                fontWeight: "400",
                              }}
                            >
                              Warranty status:{" "}
                            </Text>
                            <Text
                              style={{
                                paddingVertical: 8,
                                fontSize: 18,
                                fontWeight: "500",
                                color: SystemColors.success,
                              }}
                            >
                              Running
                            </Text>
                          </View>

                          <View>
                            <View
                              style={{
                                backgroundColor: "#eee",
                                height: 24,
                                borderRadius: 6,
                                width: "100%",
                                position: "relative",
                              }}
                            >
                              <View
                                style={{
                                  backgroundColor: SystemColors.primary,
                                  height: 24,
                                  borderRadius: 6,
                                  width:
                                    (getWarrantyYear(cycle.date ? cycle.date : cycle.timestamp) / 2) *
                                      100 +
                                    "%",
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  paddingTop: 2,
                                  paddingLeft: 6,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    width: "100%",
                                    textAlign: "center",
                                  }}
                                >
                                  {parseFloat(
                                    getWarrantyYear(cycle.date ? cycle.date : cycle.timestamp)
                                  ) + " Years"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </>
                    )
                )}

            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Maintenance History
              </Text>
              <View style={styles.card}>
               
                {activeDevice &&
                  activeDevice.metadata &&
                  activeDevice.metadata.maintenance &&
                  activeDevice.metadata.maintenance.map(
                    (cycle, i) =>
                      i === 0 && (
                        <View key={"cycle3" + i}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginBottom: 16,
                              justifyContent: "space-between",

                              paddingBottom: 12,
                              borderBottomColor: "#d9d9d9",
                              borderBottomWidth: 1,
                            }}
                          >
                            <Text
                              style={{
                                marginBottom: 6,
                                color: "#5E5E5E",
                                fontSize: 16,
                                marginRight: 12,
                              }}
                            >
                              {moment(cycle.timestamp).format("D-MM-yyyy")}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "400",
                                width: "100%",
                                display: "flex",
                                fontSize: 16,
                                marginBottom: 6,
                                marginTop: 0,
                              }}
                            >
                              {" "}
                              {cycle.state &&
                                cycle.state &&
                                toCapitalize(
                                  RenameMaintenence(cycle.state && cycle.state)
                                )}
                            </Text>
                            {/* <View>
                              <Image
                                source={require("../../../assets/images/right-arrow.png")}
                                style={{
                                  resizeMode: "contain",
                                  width: 20,
                                  height: 20,
                                  tintColor: SystemColors.primary,
                                }}
                              />
                            </View> */}
                          </View>
                          <View>
                            <ButtonRounded>Declare an incident</ButtonRounded>
                          </View>
                        </View>
                      )
                  )}
              </View>
            </>
            {/* <View style={styles.card}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "500",
                  marginBottom: 12,
                }}
              >
                Maintenance History
              </Text>
              <CommissionList>Date: June 13, 2022</CommissionList>
              <CommissionList></CommissionList>
              <Button
                secondary
                onPress={() => {
                  navigation.navigate("IncidentReporting");
                }}
              >
                Declare an Incident
              </Button>
            </View> */}

            {activeDevice &&
              activeDevice.metadata &&
              activeDevice.metadata.gpsLocation &&
              activeDevice.metadata.gpsLocation && (
                <>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      marginBottom: 12,
                    }}
                  >
                    Last location
                  </Text>
                  <View style={styles.card}>
                    <TouchableHighlight
                      underlayColor="#fff"
                      style={{
                        padding: 0,
                      }}
                      onPress={() => {
                        navigation.navigate("EditGPS", {
                          activeDevice,
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            flex: 4,
                            fontSize: 16,
                            fontWeight: "400",
                            paddingRight: 12,
                          }}
                        >
                          Tap to edit GPS coordinates of the device
                        </Text>
                        <Image
                          source={require("../../../assets/images/lastlocation.png")}
                          style={{
                            resizeMode: "contain",
                            width: 72,
                            height: 72,
                            tintColor: SystemColors.primary,
                          }}
                        />
                      </View>
                    </TouchableHighlight>
                  </View>
                </>
              )}
            <CommissionList></CommissionList>

            {/* <View
              style={{
                paddingBottom: 24,
              }}
            >
              <Button primary>Remove Device</Button>
            </View> */}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  card_measure: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingTop: 12,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
});
