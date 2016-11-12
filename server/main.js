// Listen to incoming HTTP requests, can only be used on the server
WebApp.connectHandlers.use("/validateToken", function(req, res, next) {

  var query = req.query;
  //console.log("*** URL:" + req.url);
  //console.log(query);
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;
  var oriArray = new Array();
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = "wechat-token";//这里是你在微信开发者中心页面里填的token
  oriArray.sort();
  var original = oriArray.join('');
  console.log("Original str : " + original);
  console.log("Signature : " + signature );
  //var scyptoString = sha1(original);

  var shaObj2 = new jsSHA(original, 'TEXT');
  scyptoString = shaObj2.getHash('SHA-1', 'HEX');
  if(signature == scyptoString){
    res.end(echostr);
    console.log("Confirm and send echo back");
  }else {
    res.end("false");
    console.log("Failed!");
  }
});