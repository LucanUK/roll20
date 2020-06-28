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
        log(msg);
		msg.selected.forEach( function(token) {
			const id = token._id
			//log(id);
			var tokeninfo = getObj('graphic', id);
			//log(tokeninfo);
			var CharacterID = tokeninfo.get("represents")
			//log(CharacterID);
			var hd = findObjs({type: 'attribute', characterid: CharacterID, name: "hit_dice"}, {caseInsensitive: true})[0];
			log(hd.get("max"))
			log(hd.get("current"))
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
			log(classes);
			//let classorder = JSON.parse(classes.sort((hd_value) => {return hd_value}));
			//log(classorder);
			log("-------");
			
		}
		)
	 }
});