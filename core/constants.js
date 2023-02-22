const stats = {
    power: 'Puissance Instantanée',
    consumption: 'Consommation',
    exposure: 'Exposition',
    dimming: 'Atténuation Lumineuse',
    temperature: 'Température',
    perceived_temperature: 'Température Ressentie',
    humidity: 'Humidité',
    occupancy: 'Fréquentation',
    acoustic_pressure: 'Niveau Sonore',
    uv: 'Indice UV',
    irrigation: 'Irrigation',
    irrigation_time: 'Temps Irrigation',
    operating_time: 'Temps de fonctionnement',
    commissioning_date: 'Date de début de suivi',
    last_location: 'Dernier emplacement',
    sound_level: 'Niveau Sonore',
    noise_nuisance: 'Nuisance Sonore',
    irrigation_time: 'temps irrigation',
    frequentation: 'fréquentation',
    occupancy: 'Fréquentation',
    PM_0_3: 'PM 0.3',
    PM_0_5: 'PM 0.5',
    PM_1: 'PM 1',
    PM_2_5: 'PM 2.5',
    PM_5: 'PM 5',
    PM_10: 'PM 10',
    PMCR_0_3: 'PMCR 0.3',
    PMCR_0_5: 'PMCR 0.5',
    PMCR_1: 'PMCR 1',
    PMCR_2_5: 'PMCR 2.5',
    PMCR_5: 'PMCR 5',
    voc: 'COV',
    co2: 'CO2',
    iaqi: 'Indice Qualité Air',
    viralRisk: 'Risque Viral',
    heartbeat: 'Fréquence cardiaque',
    respiration: 'Réspiration',
    activity: 'Activité',
    noise: 'Bruit',
    luminosity: 'Luminosité',
    air_treatment: "Traitement de l'Air",
    Dimming_Command: "Dimming_Command"
};

export const measurementKeys = [
    { value: "", icon: require("../assets/images/measure/light.png"), key: "Dimming_Command", name: "Dimming", unit: "%", },

    { value: "", icon: require("../assets/images/measure/light.png"), key: "luminosity", name: "Luminosity", unit: "lux", },



    // {
    //     value: "", icon: require("../assets/images/measure/temperature.png"),
    //     key: "Internal_Temperature",
    //     name: "Internal temperature",
    //     unit: "°C",
    // },

    {

        value: "", icon: require("../assets/images/measure/light.png"),
        key: "Burning_Time",
        name: "Burning time",
        unit: "hours",
    },
    // {
    //     value: "", icon: false,
    //     key: "Restarted",
    //     name: "Restarted",
    // },
    // {
    //     value: "", icon: false,
    //     key: "Sensor_Firmware_Version",
    //     name: "Sensor firmware version",
    // },
    // {
    //     value: "", icon: false,
    //     key: "Comm_State",
    //     name: "Comm state",
    // },

    { value: "", icon: require("../assets/images/measure/irrigation.png"), key: "Sensor_Humidity", name: "Humidity", unit: "%" },
    { value: "", icon: require("../assets/images/measure/temperature.png"), key: "Temperature", name: "Internal Temperature", unit: "°C" },
    { value: "", icon: require("../assets/images/measure/temperature.png"), key: "Sensor_Temperature", name: "Sensor Temperature", unit: "°C" },
    { value: "", icon: require("../assets/images/measure/temperature.png"), key: "Bulb_Temperature", name: "Bulb Temperature", unit: "°C" },
    { value: "", icon: require("../assets/images/measure/irrigation.png"), key: "humidity", name: "Humidity", unit: "%" },
    { value: "", icon: require("../assets/images/measure/temperature.png"), key: "temperature", name: "Temperature", unit: "°C" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "exposure", name: "Exposure" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "pm1", name: "PM 1", unit: "µg/㎥" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "pm2_5", name: "PM 2.5", unit: "µg/㎥" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "pm10", name: "PM 10", unit: "µg/㎥" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "pm0_3", name: "PM 0.3", unit: "µg/㎥" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "pm0_5", name: "PM 0.5", unit: "µg/㎥" },

    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "Sensor_PM10_1_Weight", name: "PM 1", unit: "µg/㎥" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "Sensor_PM10_2_5_Weight", name: "PM 2.5", unit: "µg/㎥" },
    { value: "", icon: require("../assets/images/measure/pm-alt.png"), key: "Sensor_PM60_10_Weight", name: "PM 10", unit: "µg/㎥" },

    // "Sensor_PM10_1_Weight": 0.6,
    // "Sensor_PM10_2_5_Weight": 0.6,
    // "Sensor_PM60_10_Weight": 2.2,
    {
        value: "", icon: false,
        key: "PMCR_1",
        name: "PMCR 1", unit: "µg/㎥"
    },
    {
        value: "", icon: false,
        key: "PMCR_2_5",
        name: "PMCR 2,5", unit: "µg/㎥"
    },
    {
        value: "",
        icon: require("../assets/images/measure/noise.png"),
        key: "noise",
        name: "Noise",
        unit: "dB",
    },
    { value: "", icon: false, key: "PMCR_5", name: "PMCR 5" },
    { value: "", icon: false, key: "tilt", name: "Tilt" },
    { value: "", icon: require("../assets/images/measure/frequentation.png"), key: "occupancy", name: "Occupancy" },
    // { value: "", icon: false, key: "falldown", name: "Falldown" },
    // { value: "", icon: false, key: "rssi", name: "Rssi" },
    // { value: "", icon: false, key: "underrange", name: "Underrage" },
    { value: "", icon: require("../assets/images/measure/battery.png"), key: "vBat", name: "Battery voltage" },
    { value: "", icon: require("../assets/images/measure/noise.png"), key: "acousticPressure", name: "Accoustic pressure", unit: "db" },
    { value: "", icon: require("../assets/images/measure/frequentation.png"), key: "frequentation", name: "Frequentation" },
    { value: "", icon: require("../assets/images/measure/battery.png"), key: "battery", name: "Battery", unit: "%", },

    { value: "", icon: require("../assets/images/measure/humidity.png"), key: "irrigation", name: "Irrigation" },
    { value: "", icon: require("../assets/images/measure/activity.png"), key: "activity", name: "Activity" },
    { value: "", icon: require("../assets/images/measure/respiration.png"), key: "respiration", name: "Respiration" },
    { value: "", icon: require("../assets/images/measure/pulse.png"), key: "heartbeat", name: "Heartbeat" },

    { value: "", icon: require("../assets/images/measure/uv.png"), key: "uv", name: "UV" },
    { value: "", icon: require("../assets/images/measure/co2.png"), key: "co2", name: "CO2", unit: "ppm" },
    { value: "", icon: require("../assets/images/measure/cov.png"), key: "voc", name: "VOC", unit: "μg/m³" },//ppm
    { value: "", icon: require("../assets/images/measure/iaqi.png"), key: "iaqi", name: "Air quality index", unit: "" },
    { value: "", icon: require("../assets/images/measure/viralRisk.png"), key: "viralRisk", name: "Viral risk", unit:"/5" },
    // { value: "", icon: require("../assets/images/measure/power.png"), key: "power", name: "Power" },
    { value: "", icon: require("../assets/images/measure/switch-output.png"), key: "valve", name: "Switch output" },
    // { value: "", icon: false, key: "tamper", name: "Tamper" },
    // { value: "", icon: require("../assets/images/measure/overload.png"), key: "overload", name: "Overload" },

    { value: "", icon: require("../assets/images/measure/atmospheric-pressure.png"), key: "pressure", name: "Atmospheric Pressure", unit: "hPa" },
    { value: "", icon: require("../assets/images/measure/noise.png"), key: "maximumNoise", name: "Maximum noise", unit: "dB" },
    { value: "", icon: require("../assets/images/measure/noise.png"), key: "averageNoise", name: "Noise", unit: "dB" },
    { value: "", icon: require("../assets/images/measure/hvac.png"), key: "air_treatment", name: "Air treatment", unit: "%" }
];