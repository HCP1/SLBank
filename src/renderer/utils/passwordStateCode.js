var passwordStateCode = new Map();
passwordStateCode.set(0,"数返回状态成功");
passwordStateCode.set(-99,"否应答");
passwordStateCode.set(-98,"口超时通信问题设备未连");
passwordStateCode.set(-97,"口未打开");
passwordStateCode.set(-96,"冲溢出");
passwordStateCode.set(-31,"开串口失败");
passwordStateCode.set(-32,"闭出口失败");
passwordStateCode.set(-200,"递参数错误");
passwordStateCode.set(-217,"指令可以执行，只是串口通");
passwordStateCode.set(-100,"未知错误");
passwordStateCode.set(0x04,"指令执行成功");
passwordStateCode.set(0x15,"命令参数错误");
passwordStateCode.set(0x80,"超时错误");
passwordStateCode.set(0xA4,"命令执行成功，但主密");
passwordStateCode.set(0xB5,"命令无效且主密钥无效");
passwordStateCode.set(0xC4,"命令可执行，但电池可");
passwordStateCode.set(0xD5,"命令无效且电池可能");
passwordStateCode.set(0xE0,"无效命令");
passwordStateCode.set(0xE1,"不支持的操作");
passwordStateCode.set(0xF0,"CPU错");
passwordStateCode.set(0xF1,"SAM卡错");
passwordStateCode.set(0xF2,"键盘有短路");
passwordStateCode.set(0xF4,"CPU卡出错");
passwordStateCode.set(0xF5,"电池可能损坏");
passwordStateCode.set(0xF6,"主密钥无效");
passwordStateCode.set(0xF7,"其他错");
passwordStateCode.set(0xA1,"国密芯片读写失败");
passwordStateCode.set(0x68,"国密执行失败");
passwordStateCode.set(0x67,"P3错误");
passwordStateCode.set(0x6B,"P1/P2错误");
passwordStateCode.set(0x6E,"CLA错误");
passwordStateCode.set(0x6A,"异或值错误");
passwordStateCode.set(0x6C,"验证失败");
passwordStateCode.set(0x86,"主动取消输入");
passwordStateCode.set(0x87,"输入超时");
passwordStateCode.set(0x88,"口令验证失败");
passwordStateCode.set(0x8B,"两次口令输入不一致");
passwordStateCode.set(0x8F,"口令未修改过");
passwordStateCode.set(0xA0,"密钥验证失败");
passwordStateCode.set(0x84,"输入管理员A口令");
passwordStateCode.set(0x85,"输入管理员B口令");
passwordStateCode.set(0x8A,"输入新口令");
passwordStateCode.set(0x8D,"再次输入新口令");
passwordStateCode.set(0x97,"输入分量A");
passwordStateCode.set(0x98,"输入分量B");
passwordStateCode.set(0x99,"输入KCV");
exports.getStateMsg=function(code){
  return  passwordStateCode.get(code)
}