const webpush = require('web-push');

export default class PushNotificationService {

  createVapidKeyPair() {
    return webpush.generateVAPIDKeys;
  }


}
