const Promise = require('bluebird');
const controlType = ['play','stop','pause','rewind','fastForward']

module.exports = function mediaControl(param){
	sails.log.debug('lgwebos.mediaControl');
	return gladys.param.getValue('LGTV_NAME')
	.then((lgtv_name) => {
		if(controlType.indexOf(param.controlType)>=0) 
		{
			sails.log.debug('lgtv_name :' + lgtv_name);
			if((typeof lgtv_name != 'undefined') && lgtv_name != null)
			{
				try{
					var lgtv_name = require("lgtv2")({
						url: 'ws://'+lgtv_name+':3000'
					});
						
					lgtv_name.on('connect', function () 
					{
						console.log(lgtv_name)
						lgtv_name.request('ssap://media.controls/'+param.controlType, function (err, res) {
							console.log(res)
							lgtv_name.disconnect();
						});
					});
					
					lgtv_name.on('error', function (err) {
						sails.log.error(err);
						reject(err);
					});
				} catch (e) {
					sails.log.debug('mediaControl failed');
					reject(e);
				}
			}
		}
			

	})
	.catch(function(err){
		sails.log.debug('Error LGTV_NAME : ' + LGTV_NAME + ' parameter');
		reject(err);
	});

}
