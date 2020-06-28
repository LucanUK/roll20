on('chat:message', function(msg) {
// ROLL LISTENER
    if(msg.rolltemplate) {
        var cnamebase = msg.content.split("charname=")[1];
        var cname = cnamebase ? cnamebase.replace('}}','').trim() : (msg.content.split("{{name=")[1]||'').split("}}")[0].trim();
        var character = cname ? findObjs({name: cname, type: 'character'})[0] : undefined;
        if(["simple"].indexOf(msg.rolltemplate) > -1) {
            if(_.has(msg,'inlinerolls') && msg.content.indexOf("^{hit-dice-u}") > -1 && character) {
                handlehd(msg,character);
            }
			log(msg.content);
			log(msg.rolltemplate);
        }
    }
});
// CHECK CURRENT HD, DECREMENT HD, THEN APPLY HP
var handlehd = function (msg,character) {
    var hd = findObjs({type: 'attribute', characterid: character.id, name: "hit_dice"}, {caseInsensitive: true})[0];
    var hp = findObjs({type: 'attribute', characterid: character.id, name: "hp"}, {caseInsensitive: true})[0];
    if(!hd || hd.get("current")==="" || hd.get("max")==="") {
        log("CHARACTER HAS NO HIT_DICE ATTRIBUTE OR HD CURRENT/MAX IS NULL");
        sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container'><div class='sheet-label' style='margin-top:5px;'><span>" + "HD attribute on " + character.get("name") + " is missing or current/max values are not filled out, Hit Points were not applied." + "</span></div></div></div>");
        return;
    }
    else if(!hp || hp.get("current")==="" || hp.get("max")==="") {
        log("CHARACTER HAS NO HP ATTRIBUTE OR HP CURRENT/MAX IS NULL");
        sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container'><div class='sheet-label' style='margin-top:5px;'><span>" + "HP attribute on " + character.get("name") + " is missing or current/max values are not filled out, Hit Points were not applied." + "</span></div></div></div>");
        return;
    }
    else {
        var curhd = parseInt(hd.get("current"));
        var newhd = curhd - 1;
    }
    if (curhd === 0) {
        sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container'><div class='sheet-label' style='margin-top:5px;'><span>" + character.get("name") + " has no HD remaining, HP were not applied." + "</span></div></div></div>");
    }
    else {
		log(msg);
        hd.set({current:newhd});
        var maxhp = parseInt(hp.get("max"));
        var curhp = parseInt(hp.get("current"));
		if(msg.playerid.toLowerCase() != "api") {
        	var result = msg.inlinerolls[2].results.total ? msg.inlinerolls[2].results.total : false;
		}
		else {
				var result = msg.inlinerolls[0].results.total ? msg.inlinerolls[0].results.total : false;
		}
        var newhp = curhp + result;
        if(result === false) {
            log("FAILED TO GET HD RESULT");
        }
        else if (newhp > maxhp) {
            hp.set({current:maxhp});
        }
        else {
            hp.set({current:newhp});
        }
    }
};