module.exports = {
    getFile: function (accept, successCallback, failureCallback) {
        if (typeof accept === 'function') {
			failureCallback = successCallback;
			successCallback = accept;
			accept = undefined;
		}
        
        var result = new Promise(function (resolve, reject) {
            cordova.exec(
                function (json) {
                    try {
                        resolve(JSON.parse(json));
                    }
                    catch (err) {
                        reject(err);
                    }
                },
                reject,
                'Chooser',
                'getFile',
                [(typeof accept === 'string' ? accept.replace(/\s/g, '') : undefined) || '*/*']
            );
        });

        if (typeof successCallback === 'function') {
            result.then(successCallback);
        }
        if (typeof failureCallback === 'function') {
            result.catch(failureCallback);
        }

        return result;
    }
};
