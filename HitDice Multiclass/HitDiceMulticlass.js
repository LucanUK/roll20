on("chat:message", function(msg) {
	
	const HD_Dice = { Barbarian: "12", 
			 Fighter: "10", 
			 Paladin: "10", 
			 Ranger: "10", 
			 Sorcerer: "6", 
			 Wizard: "6",
			 Artificer: "8",
			 Bard: "8",
			 Cleric: "8",
			 Druid: "8",
			 Monk: "8",
			 Rogue: "8",
			 Warlock: "8"}
	
     if (msg.type === "api" && msg.content.search(/^!hitdice-mc\b/) !== -1) {
        //log(msg);
		 var hd_list = [];
		 let difference;
		 let con_mod_value;
		 let char_name_value;
		msg.selected.forEach( function(token) {
			const id = token._id
			//log(id);
			var tokeninfo = getObj('graphic', id);
			//log(tokeninfo);
			var CharacterID = tokeninfo.get("represents")
			//log(CharacterID);
			var hd = findObjs({type: 'attribute', characterid: CharacterID, name: "hit_dice"}, {caseInsensitive: true})[0];
			con_mod = findObjs({type: 'attribute', characterid: CharacterID, name: "constitution_mod"}, {caseInsensitive: true})[0];
			char_name = getObj('character', CharacterID);
			hd_max = parseInt(hd.get("max"));
			hd_current = parseInt(hd.get("current"));
			con_mod_value = con_mod.get("current");
			char_name_value = char_name.get("name");
			var mc_flag1 = findObjs({type: 'attribute', characterid: CharacterID, name: "multiclass1_flag"}, {caseInsensitive: true})[0];
			var mc_flag2 = findObjs({type: 'attribute', characterid: CharacterID, name: "multiclass2_flag"}, {caseInsensitive: true})[0];
			var mc_flag3 = findObjs({type: 'attribute', characterid: CharacterID, name: "multiclass3_flag"}, {caseInsensitive: true})[0];
			var mc_flags = { 1: mc_flag1.get("current"), 2: mc_flag2.get("current"), 3: mc_flag3.get("current")}
			var base_level = findObjs({type: 'attribute', characterid: CharacterID, name: "base_level"}, {caseInsensitive: true})[0];
			var base_class = findObjs({type: 'attribute', characterid: CharacterID, name: "class"}, {caseInsensitive: true})[0];
			var classes = [];
			classes.push({ class_name: base_class.get("current"), level: base_level.get("current") , hd_value: HD_Dice[base_class.get("current")]});
			
			_.each(mc_flags, function(element, key){
				if (element > 0) {
					const mcl = `multiclass${key}_lvl`,
					  mcc = `multiclass${key}`;
					var mc_level = findObjs({type: 'attribute', characterid: CharacterID, name: mcl}, {caseInsensitive: true})[0];
					var mc_class = findObjs({type: 'attribute', characterid: CharacterID, name: mcc}, {caseInsensitive: true})[0];
					classes.push({ class_name: mc_class.get("current"), level: mc_level.get("current"), hd_value: HD_Dice[mc_class.get("current")] });
				}
				
			});
			//log(classes);
			
			
			_.each(classes, function(element, key){
				for(let i=0;i < element["level"]; i++){
				    var hd_value_int = parseInt(element["hd_value"])
					hd_list.push(hd_value_int)	
				}	
			});
			hd_list.sort();
			//log(hd_max);
			//log(hd_current);
			difference = Math.abs(hd_max - hd_current);
			
			//log(difference);
			//let classorder = JSON.parse(classes.sort((hd_value) => {return hd_value}));
			//log(hd_list[difference]);
			//log("-------");
			
			
			
		}
		)
		var diceroll = `&{template:simple} {{rname=^{hit-dice-u}}} {{mod=D${hd_list[difference]}+${con_mod_value}}} {{r1=[[d${hd_list[difference]}+${con_mod_value}]]}} {{normal=1}} charname=${char_name_value}`
		log(diceroll);
		if (hd_current > 0) {
			sendChat(msg.who, diceroll, null, {noarchive:true} );
		}
		else {
			sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container'><div class='sheet-label' style='margin-top:5px;'><span>" + char_name_value + " has no HD remaining." + "</span></div></div></div>");	
		}
	 }
});