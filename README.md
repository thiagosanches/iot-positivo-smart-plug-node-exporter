# iot-positivo-smart-plug-node-exporter

This exposes a simple NodeJS API using the express package. The idea is to response back with the same "protocol" as a node-exporter application, which is something that Prometheus expects, so we can plot the data into Grafana.

### Configuration

First, you need to set it up an IoT Tuya account in order to make this working, you can follow this guide [here](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md#listing-tuya-devices-from-the-tuya-smart-or-smart-life-apps) on the TuyaAPI. Take a look at the `Listing Tuya devices from the Tuya Smart or Smart Life apps` section.

### Set it up the environment variables

If everything worked fine on the mandatory configuration as described previously, you should be able to get an `ID` and a `KEY` using the tuya-cli. With that values you need to create a `.env` file and update as follow:

```bash
cat .env
TUYA_ID=XXX
TUYA_KEY=YYY
```

### Installation

```bash
https://github.com/thiagosanches/iot-positivo-smart-plug-node-exporter.git
cd iot-positivo-smart-plug-node-exporter
docker-compose up
```

### Example

```bash
curl http://localhost:3000

# HELP iot_plug1_current Current A
# TYPE iot_plug1_current gauge
iot_plug1_current 761
# HELP iot_plug1_power Power W
# TYPE iot_plug1_power gauge
iot_plug1_power 930
# HELP iot_plug1_voltage Voltage V
# TYPE iot_plug1_voltage gauge
iot_plug1_voltage 1280
```

### Grafana
![image](https://user-images.githubusercontent.com/5191469/227377174-bdd0de5d-e01a-4d54-ba71-7d2f25460a7c.png)
