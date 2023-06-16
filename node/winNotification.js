// notification.js
const notifier = require('node-notifier');
module.exports = {
    sendNotification: function(title, message) {
        notifier.notify({
            title: title,
            message: message,
        });
        notifier.on('click', function (notifierObject, options, event) {
            // options.m == 通知的内容
        });
    }
}