let ffi = require("ffi-napi");
const Store = require("electron-store");
const store = new Store();
// 引入 events 模块
var Events = require("events");
// 创建 eventEmitter 对象
var myEmitter = new Events.EventEmitter();
var stateMsg = require("./passwordStateCode");// ??

var pwdDll;

exports.initPwd = function() {
  try {
    // Call *.dll with ffi
    // Create funtions
    pwdDll = ffi.Library("dll/KMY350X.dll", {
      KMY_EPP_OpenPort: ["int", ["int", "int"]],
      KMY_EPP_GetDllVersion: ["int", ["pointer"]],
      KMY_EPP_ClosePort: ["int", []],
      KMY_EPP_KeyboardControl: ["int", ["int"]], //控制键盘输入和按键音
      KMY_EPP_ScoutKeyPress: ["int", ["pointer"]], //监测键盘
      KMY_EPP_DevReset: ["int", ["int"]],
      KMY_EPP_GetFWVersion: ["int", ["pointer"]],
      KMY_EPP_SetStartMode: ["int", ["int"]], //设置键盘开机输入模式
      KMY_EPP_SetPINArithmetic: ["int", ["int"]], //设置PIN算法
      KMY_EPP_SetEncryptMethod: ["int", ["int"]], //设置加密方法
      KMY_EPP_SetEcbCbcMode: ["int", ["int"]], //设置加密算法
      KMY_EPP_SetFunctionKeys: ["int", ["int"]], //设置功能键处理方式
      KMY_EPP_SetCommunicationMode: ["int", ["int"]], //设置通讯模式

      KMY_EPP_LoadMainKey: ["int", ["int", "pointer", "pointer"]], //下载主密钥
      KMY_EPP_LoadWorkKey: ["int", ["int", "int", "pointer", "pointer"]], //下载工作密钥
      KMY_EPP_ActivateWorkKey: ["int", ["int", "int"]], //激活工作密钥
      KMY_EPP_KeyboardControl: ["int", ["int"]], //发送开关键盘和按键声音
      KMY_EPP_SetPinMinLen: ["int", ["int"]], //设置PIN输入最小长度

      KMY_EPP_ExSetting: ["int", ["int"]], //0x21: 清除键做Backspace使用，只清除最新一个输入
      KMY_EPP_SetAccount: ["int", ["pointer"]], //设置账号
      KMY_EPP_PinStart: ["int", ["int", "int", "int"]], //启动密码键盘加密
      KMY_EPP_ReadPinBlock: ["int", ["pointer"]] //取键盘中密码
    });

    //console.info("KMY_EPP_GetDllVersion="+lt);
  } catch (error) {
    console.error("ffi.Library", error);
  }
};
var getkey;
exports.closeKeyboard = function() {
  console.info("关闭密码键盘=" + pwdDll.KMY_EPP_KeyboardControl(1)); //1:关闭键盘
  console.log("关闭密码键盘串口=" + pwdDll.KMY_EPP_ClosePort());
  clearInterval(getkey);  

  console.log(getkey);
}
//明文输入
exports.plaintextInput = function() {
 
  console.log(
    "打开密码键盘串口=" +
      pwdDll.KMY_EPP_OpenPort(
        store.get("serialPort.keypadCom"),
        store.get("serialPort.keypadBps")
      )
  );
  //alert("键盘开机输入模式"+Dll.KMY_EPP_SetStartMode(1));
  var tt = Buffer.alloc(1);
  var passwordStr = "";
  //alert("打开键盘"+Dll.KMY_EPP_KeyboardControl(2));
  /**
   * 1:关闭键盘
   * 2:打开键盘
   * 3:打开按键但静音
   * 4:切换至系统键盘
   * 5:输入时关闭按键音
   * 6:输入时打开按键音
   */
  if (pwdDll.KMY_EPP_KeyboardControl(2) == 0) {
    console.log("开始输入值");

    getkey = setInterval(function() {
      //0D 确定 1B取消
      pwdDll.KMY_EPP_ScoutKeyPress(tt);
      var tem = tt.toString("hex");
      console.log("输入值：[" + tt + "]" + tem);
      if (tem == "0d") {
        //0d 确定  1b退出  08 清除
        // console.info("关闭密码键盘=" + pwdDll.KMY_EPP_KeyboardControl(1)); //1:关闭键盘
        // console.info("输入的值为" + passwordStr);
        // alert("关闭"+getkey);
        // console.log("关闭密码键盘串口=" + pwdDll.KMY_EPP_ClosePort());
        myEmitter.emit("getCiphertext", ""); //触发事件
        // clearInterval(getkey);
        console.log(getkey);
      } else if (tem == "1b") {   
        // console.info("关闭密码键盘=" + pwdDll.KMY_EPP_KeyboardControl(1)); //1:关闭键盘
        // console.log("关闭密码键盘串口=" + pwdDll.KMY_EPP_ClosePort());
        myEmitter.emit("outEvent"); //触发事件
        // clearInterval(getkey);
      } else if (tem == "08") {
        //TODO 清除
        passwordStr = "";
        myEmitter.emit("delEvent"); //触发事件
      } else if (tem != "00") {
        //00未获取到值
        passwordStr += tt;
        myEmitter.emit("addEvent", tt); //触发事件
      }
    }, 500);
    // alert("开启"+getkey);
  }

  // console.log("关闭密码键盘串口="+pwdDll.KMY_EPP_ClosePort());
  // return tt;
};
//密文输入参数配置
exports.encryptConfig = function() {
  var ret = pwdDll.KMY_EPP_OpenPort(
    store.get("serialPort.keypadCom"),
    store.get("serialPort.keypadBps")
  );
  if (ret != 0) {
    console.log("设置加密工作方式失败" + ret + "=" + stateMsg.getStateMsg(ret));
    alert("设置加密工作方式失败" + stateMsg.getStateMsg(ret)); //触发事件
  }
  var kcvBuf = Buffer.alloc(8);
  var masterKeyBuf = Buffer.from(
    Buffer.from(store.get("term.workKey")).toString("hex")
  );
  console.log(masterKeyBuf);
  ret = pwdDll.KMY_EPP_LoadMainKey(0, masterKeyBuf, kcvBuf); //完成主密钥下载
  ret = pwdDll.KMY_EPP_ActivateWorkKey(0, 0); //激活工作密钥

  console.log("关闭密码键盘串口=" + pwdDll.KMY_EPP_ClosePort());
  // 第1步：使用打开串口的函数
  // 第2步： 设置加密工作方式，一般默认是DES
  // 第3步： 设置PIN算法，一般默认是ANSI X9.8
  // 第4步： 下载主密钥
  // 第5步： 下载工作密钥
  // 第6步： 激活工作密钥
  // 第7步： 设置账号
  // 第8步： 启动密码键盘PIN输入 （此时在键盘上输入密码）
  //  启动键盘后，需要开一个新线程循环调用KMY_EPP_ScoutKeyPress()函数来
  // 监测键盘的按键响应。
  // 第9步： 取键盘中PIN密文
};
//密文输入
exports.ciphertextInput = function() {
  var ret = pwdDll.KMY_EPP_OpenPort(
    store.get("serialPort.keypadCom"),
    store.get("serialPort.keypadBps")
  );
  if (ret != 0) {
    console.log("打开密码键盘串口 " + ret + "=" + stateMsg.getStateMsg(ret));
    myEmitter.emit(
      "errorEvent",
      "打开密码键盘串口" + stateMsg.getStateMsg(ret)
    ); //触发事件
  }
  /**
   * 1：DES，使用工作密钥加密或解密(默认)
   * 2：TDES，使用工作密钥加密或解密
   * 3：使用内置PSAM卡加密
   * 5：DES，使用主密钥直接加密或解密
   * 6：TDES，使用主密钥直接加密或解密
   * 7：SM4,使用工作密钥加密或解密
   * 8：SM4，使用主密钥加密或解密
   */
  ret = pwdDll.KMY_EPP_SetEncryptMethod(8); //des算法
  if (ret != 0) {
    console.log("设置加密工作方式失败" + ret + "=" + stateMsg.getStateMsg(ret));
    myEmitter.emit(
      "errorEvent",
      "设置加密工作方式失败" + stateMsg.getStateMsg(ret)
    ); //触发事件
  }
  ret = pwdDll.KMY_EPP_ActivateWorkKey(0, 0); //激活工作密钥
  ret = pwdDll.KMY_EPP_PinStart(6, 0, 30);
  var pinBlockBuf = Buffer.alloc(32 );
  var tt = Buffer.alloc(1);
  var pinLen = 0;
  if (ret == 0) {
    console.log("开始输入值");
    getkey = setInterval(function() {
      //0D 确定 1B取消
      //监测键盘
      pwdDll.KMY_EPP_ScoutKeyPress(tt);
      var tem = tt.toString("hex");
      if (tem == "0d") {
        //确认键处理
        if (pinLen == 6) {
          //假定必须达到指定长度才符合要求
          //后加密模式，需要设置pinblock算法，否则使用默认算法
          //1：ISO9564-1格式0(ANSI x9.8)(默认) 2:ASCII码格式  3：IBM3624格式
          pwdDll.KMY_EPP_SetPINArithmetic(1);
          pwdDll.KMY_EPP_ReadPinBlock(pinBlockBuf);
          console.log(pinBlockBuf + "===" + pinBlockBuf.toString());
          myEmitter.emit("getCiphertext", pinBlockBuf.toString()); //触发事件
          clearInterval(getkey);
        } else {
          alert("密码长度不够6位");
        }
      } else if (tem == "08") {
        //TODO 清除
        pwdDll.KMY_EPP_ExSetting(0x21);
        pinLen--;
        myEmitter.emit("delEvent"); //触发事件
      } else if (tem == "1b") {
        //0x20: 清除键做clear使用，清除所有输入
        pwdDll.KMY_EPP_ExSetting(0x20);
        pinLen = 0;
        clearInterval(getkey);
        myEmitter.emit("outEvent"); //触发事件
      } else if (tem == "2a") {
        //接收到密码处理
        pinLen++;
        console.log("pinlen=" + pinLen);
        myEmitter.emit("addEvent", tt); //触发事件
      }
    }, 500);
  }
};

//给事件对象绑定一个事件名，并且绑定上一个回调函数
myEmitter.on("addEvent", addKeyboardValue);
myEmitter.on("delEvent", delKeyboardValue);
myEmitter.on("outEvent", outKeyboardValue);
myEmitter.on("errorEvent", errorEvent);
myEmitter.on("getCiphertext", getCiphertext);
