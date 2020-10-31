const clipboardy = require('clipboardy');
var express = require('express');
var router = express.Router();
const { exec } = require('child_process');
const fs = require("fs");
const { clipboard, nativeImage } = require('electron')

const util={};
/**
 * 检查路径是否存在 如果不存在则创建路径
 * @param {string} folderpath 文件路径
 */
util.checkDirExist=(folderpath)=>{
  const pathArr=folderpath.split('/');
  let _path='';
  for(let i=0;i<pathArr.length;i++){
    if(pathArr[i]){
      _path +=`${pathArr[i]}`;
      if (!fs.existsSync(_path)) {
        fs.mkdirSync(_path);
      }
    }
  }
}
module.exports = util;

/* GET home page. */
router.get('/', function(req, res, next) {
  // 获取局域网地址
  function getIPAddress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            // console.log(alias);
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' 
              && !alias.internal && alias.netmask === '255.255.255.0'){
              return alias.address;
            }
        }
    }
  }
  res.render('index', { title: getIPAddress()});
});

/* 处理 手机发来的信息 */
router.post('/msg', function (req, res) {
  const { msg } = req.body
  console.log(msg); 
  // 修改剪切板
  // exec(`echo ${msg} | clip`);
  // clipboardy.writeSync(msg)
  clipboardy.write(msg)
  res.send({code:1, msg:msg})

})

// 引入导入模块 
var formidable = require("formidable")
var os = require('os')
router.post('/upload', function (req, res) {
  // 获取用户信息
  var { homedir } = os.userInfo()

  var form = new formidable.IncomingForm();
  // 设置放置文件上传的目录
  form.parse(req, function(err, fields, files) {
    if (err) throw err
    
    for (let key in files) {
      let file = files[key]
      console.log(file.name);
      // 过滤空文件
      if (file.size == 0 && file.name == '') continue
      
      // 保存文件
      // const fileType = file.type.split('/')[1]
      const fileName = file.name.split('.')[0]
      const fileType = file.name.split('.')[1]
      const oldPath = file.path
      // const newPath = 'img/' + fileName + '_' + Date.now() + '.' + fileType
      // const newPath = 'C:\\Users\\arno\\Pictures\\' + fileName + '_' + Date.now() + '.' + fileType
      let newPath = homedir + '\\Pictures\\'
      // const newPath = 'img/' + file.name
      util.checkDirExist(newPath)
      newPath += fileName + '_' + Date.now() + '.' + fileType
      fs.rename(oldPath, newPath, (error) => {
        if (error) throw error
      })
      
      // 复制图片到剪切板
      // const image = nativeImage.createFromPath('/img/1.jpeg')
      // console.log(image)
      // clipboard.writeImage(image)

      }

      res.send({code:1, msg:'File transfer success.'})
  });
});

module.exports = router;
