module.exports = function createLGDevice(){

    var promises = [
        gladys.param.getValue('LGTV_MAC_ADRESS')
    ];
    
    return Promise.all(promises)
    .then ((array) => {

        var newDevice = {
            device: {
            name: 'LG WEBOS',
            protocol: 'web',
            service: 'lgwebos',
            identifier: array[0]
            },
            types: [{
                name: 'Power',
                type: 'binary',
                category:'television',
                identifier: 'Power',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Son',
                type: 'Son',
                category:'television',
                identifier: 'Sound',
                unit: '%',
                sensor: true,
                min: 0,
                max: 100,
            },
            {
                name: 'Mute',
                type: 'Mute',
                category:'television',
                identifier: 'Mute',
                sensor: false,
                min: 0,
                max: 1,
            },
            {
                name: 'Channel',
                type: 'Channel',
                category:'television',
                identifier: 'Channel',
                sensor: false,
                min: 0,
                max: 200,
            }]
        };

        return gladys.device.create(newDevice);

    });
}