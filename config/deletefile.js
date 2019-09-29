const Client = require('ssh2-sftp-client');
const sftp = new Client();

sftp.connect({
    host: 'armyali.xyz',
    port: 22,
    username: 'armyalix',
    password: 'kPqk1p5I84'
  }).then(() => {
    return sftp.list('./public_html/multer-image-upload/');
  }).then(() => {
    const remoteFile = './public_html/multer-image-upload/coding.png';
    return sftp.delete(remoteFile);
  }).then(() => {
    return sftp.list('./public_html/multer-image-upload/');
  }).then(data => {
    console.log(data, 'the data info');
  }).catch(err => {
    console.log(err, 'catch error');
  });
