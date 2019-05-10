const fs = require('fs');

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');
const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:vicentemazzaro@gmail.com',
    vapid.publicKey,
    vapid.privateKey
  );

const suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
}

module.exports.addSubscription = ( suscripcion ) => {
    suscripciones.push( suscripcion );
    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) );
}

module.exports.sendPush = (post) => {
    suscripciones.forEach( (suscripcion, i) => {
        console.log(suscripcion);
        webpush.sendNotification( suscripcion, JSON.stringify(post) );
    });
}


