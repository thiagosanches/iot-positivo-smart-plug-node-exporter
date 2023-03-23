const express = require('express');
const TuyAPI = require('tuyapi');

const device = new TuyAPI({
    id: process.env.TUYA_ID,
    key: process.env.TUYA_KEY,
    issueGetOnConnect: false
});

const app = express();
const port = 3000;

app.use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain; version=0.0.4");
    next();
});

app.get('/metrics', async (req, res) => {
    await device.find();
    await device.connect();
    const status = await device.get({ schema: true });
    device.disconnect();

    const current = status.dps['18'];
    const power = status.dps['19'];
    const voltage = status.dps['20'];

    const response = `# HELP iot_plug1_current Current A
# TYPE iot_plug1_current gauge
iot_plug1_current ${current}
# HELP iot_plug1_power Power W
# TYPE iot_plug1_power gauge
iot_plug1_power ${power}
# HELP iot_plug1_voltage Voltage V
# TYPE iot_plug1_voltage gauge
iot_plug1_voltage ${voltage}
`
    res.removeHeader('X-Powered-By');
    res.removeHeader('ETag');
    res.removeHeader('Date');
    res.removeHeader('Connection');
    res.removeHeader('Keep-Alive');
    res.setHeader("Content-Length", response.length);
    res.end(response)
})

app.listen(port, () => {
    console.log("Listening!")
})
