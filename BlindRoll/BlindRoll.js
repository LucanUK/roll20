on("chat:message", function(msg) {
    var cmdName = "!broll ";
	var msgTxt = msg.content;
	var msgWho = msg.who;
	var msgFormula = msgTxt.slice(cmdName.length);

	if(msg.type == "api" && msgTxt.indexOf(cmdName) !== -1) {
		sendChat(msgWho, "/gmroll " + msgFormula);
		sendChat(msgWho, "/w " + msgWho + " secret roll sent to GM (" + msgFormula + ")");
  	};
});