import React from "react";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import Slider from "@react-native-community/slider";
import SelectBox from "../../../atoms/SelectBox";
import { SystemColors } from "../../../../core/Styles/theme/colors";
import { category_command } from "../../../../core/utils/Categories";
import { apiDeviceCommand } from "../../../../core/API/apiCommands";
import { useSelector } from "react-redux";
import { Message } from "../../../molecules/Toast";

function LightDimming({ activeDevice }) {
  const clientId = useSelector((state) => state.client.clientId);
  const [slide, setSlide] = React.useState(50);
  const [activeCommand, setActiveCommand] = React.useState(false);
  const [payload, setPayload] = React.useState({
    command_name: "",
    value: 0,
  });

  const is_command = category_command.filter(
    (cc) => cc.name === activeDevice.category
  )[0];

  const commands = [{
    name: "Turn on",
  },{
    name:"Turn off"
  },{
    name:"Dimming"
  },{
    name:"Turn on auxiliary"
  },{
    name:"Turn off auxiliary"
  }];

  const [loading, setLoading] = React.useState(false);

  const handleSelect = (e) => {
    setActiveCommand(e.name);
    switch (e.name) {
      case "Turn off":
        setLoading(true);
        apiDeviceCommand({
          deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
          clientId,
          payload: {
            command: is_command.commands.off,
             
          },
        })
          .then(() => {
            Message("success", "Device Turned off", "");
          })
          .catch((error) => {
            Message(
              "error",
              "Device command failed",
              error.response.data.message
            );
          })
          .finally(() => {
            setLoading(false);
          });

        break;

      case "Turn on":
        setLoading(true);
        apiDeviceCommand({
          deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
          clientId,
          payload: {
            command: is_command.commands.on,
            
          },
        })
          .then(() => {
            Message("success", "Device Turned on", "");
          })
          .catch((error) => {
            
            Message(
              "error",
              "Device command failed",
              error.response.data.message
            );
          })
          .finally(() => {
            setLoading(false);
          });

        break;

        case "Turn on auxiliary":

        setLoading(true);
        apiDeviceCommand({
          deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
          clientId,
          payload: {
            command: is_command.commands.aux_on,
          },
        })
          .then(() => {
            Message("success", "Device Turn on auxiliary", "");
          })
          .catch((error) => {
            Message(
              "error",
              "Device command failed",
              error.response.data.message
            );
          })
          .finally(() => {
            setLoading(false);
          });
        break;
        case "Turn off auxiliary":
        setLoading(true);
        apiDeviceCommand({
          deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
          clientId,
          payload: {
            command: is_command.commands.aux_off,
          },
        })
          .then(() => {
            Message("success", "Device Turn off auxiliary", "");
          })
          .catch((error) => {
            Message(
              "error",
              "Device command failed",
              error.response.data.message
            );
          })
          .finally(() => {
            setLoading(false);
          });

        break;

      case "Dimming":
        break;
    }
  };

  const onValueChange = (e) => {
    setSlide(parseInt(e));
  };

  const updateDimming = () => {
    setLoading(true);
    apiDeviceCommand({
      deviceId: `${activeDevice.vendor}:${activeDevice.serial}`,
      clientId,
      payload: {
        command: is_command.commands.dim,
        value: parseInt(slide),
      },
    })
      .then(() => {
        Message("success", "Device command successful", "");
      })
      .catch((error) => {
        Message("error", "Device command failed", error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View>
        {
          !loading && 
 <SelectBox
          placeholder="Select Command"
          onSelect={(e) => {
            handleSelect(e);
          }}
           buttonTextAfterSelection={({ name }) => {
                return name.toUpperCase();
              }}
          data={
            is_command.commands.dimming ? commands : [{
              name:"Turn on"
            },{name:"Turn off"}]
          }
        />
        }
       
        {is_command.commands.dimming && activeCommand === "Dimming" && (
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "90%", marginRight: 6 }}>
              <Slider
                value={slide}
                onValueChange={onValueChange}
                style={{ width: "100%", height: 44 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={SystemColors.primary}
                maximumTrackTintColor="#F2F5F9"
                onSlidingComplete={updateDimming}
              />
            </View>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{slide}%</Text>
          </View>
        )}
    {
      loading &&     <ActivityIndicator />
    }
      </View>
    </>
  );
}

export default LightDimming;
