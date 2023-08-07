const express = require('express');
const TuyAPI = require('tuyapi');
const config = require('./config.json')

const devices = []
for (const device of config.devices) {
    devices.push(
        new TuyAPI({
            id: device.tuyaId,
            key: device.tuyaKey,
            issueGetOnConnect: false
        })
    )
}

const app = express();
const port = 3000;

app.use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain; version=0.0.4");
    next();
});

app.get('/metrics', async (req, res) => {
    let response = '';
    let index = 1;
    for (const device of devices) {

        await device.find();
        await device.connect();
        const status = await device.get({ schema: true });
        device.disconnect();

        const current = status.dps['18'];
        const power = status.dps['19'];
        const voltage = status.dps['20'];

        response += `# HELP iot_plug${index}_current Current A
# TYPE iot_plug${index}_current gauge
iot_plug${index}_current ${current}
# HELP iot_plug${index}_power Power W
# TYPE iot_plug${index}_power gauge
iot_plug${index}_power ${power}
# HELP iot_plug${index}_voltage Voltage V
# TYPE iot_plug${index}_voltage gauge
iot_plug${index}_voltage ${voltage}
`
        index += 1
    }

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
