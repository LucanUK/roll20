/* global log, _, getObj, HealthColors, playerIsGM, sendChat, on */
const HitDiceMulticlass = (() => {
  "use strict";
  const version = "1.0",
    observers = {
      "change": [],
    },
    boundedBar = false,
    checkInstall = () => {
      log(`-=> HitDiceMulticlass v${version} <=-`);
    },
    defaultOpts = {
      ids: "",
    },
    statusMarkers = [
      "red", "blue", "green", "brown", "purple", "pink", "yellow", "dead", "skull", "sleepy", "half-heart"
    ],
    getWhisperPrefix = (playerid) => {
      const player = getObj("player", playerid);
      if (player && player.get("_displayname")) {
        return `/w "${player.get("_displayname")}" `;
      }
      else {
        return "/w GM ";
      }
    },
    parseOpts = (content, hasValue) => {
      return content
        .replace(/<br\/>\n/g, " ")
        .replace(/({{(.*?)\s*}}\s*$)/g, "$2")
        .split(/\s+--/)
        .slice(1)
        .reduce((opts, arg) => {
          const kv = arg.split(/\s(.+)/);
          if (hasValue.includes(kv[0])) {
            opts[kv[0]] = (kv[1] || "");
          } else {
            opts[arg] = true;
          }
          return opts;
        }, {});
    },
    handleError = (whisper, errorMsg) => {
      const output = `${whisper}<div style="border:1px solid black;background:#FFBABA;padding:3px">` +
        `<h4>Error</h4><p>${errorMsg}</p></div>`;
      sendChat("HitDiceMulticlass", output);
    },
		
		
    finalApply = (results) => {
      const barCur = `bar${bar}_value`,
        barMax = `bar${bar}_max`;
      Object.entries(results).forEach(([id]) => {
        const token = getObj("graphic", id),
          prev = JSON.parse(JSON.stringify(token || {}));
        let newValue;
          newValue = parseInt(token.get(barCur))
		let forceValue;
		    forceValue = parseInt(force)
         if (newValue < 1 || force === 1) {
          token.set(`status_dead`, true);
		  token.set(`layer`, `gmlayer`);
		 }
        
      });
    },
    handleInput = (msg) => {
      if (msg.type === "api" && msg.content.search(/^!hitpoint-mc\b/) !== -1) {
        const hasValue = ["ids"],
          opts = Object.assign({}, defaultOpts, parseOpts(msg, hasValue));
        opts.ids = opts.ids.split(/,\s*/g);
        if (!playerIsGM(msg.playerid) && getObj("player", msg.playerid)) {
          handleError(getWhisperPrefix(msg.playerid), "Permission denied.");
          return;
        }
		  
		  
        const results = _.reduce(opts.ids, function (m, id, k) {
          m[id] = parseInt(opts.saves[k] || "0") >= opts.DC;
          return m;
        }, {});
		  
		  
        finalApply(results);
        const output = `${
          getWhisperPrefix(msg.playerid)
        }<div style="border:1px solid black;background:#FFF;padding:3px"><p>Dead NPC's moved to GM Layer </p></div>`;
        sendChat("HitDiceMulticlass", output, null, { noarchive: true });
      }
      return;
    },
    notifyObservers = (event, obj, prev) => {
      observers[event].forEach(observer => observer(obj, prev));
    },
    registerObserver = (event, observer) => {
      if (observer && _.isFunction(observer) && observers.hasOwnProperty(event)) {
        observers[event].push(observer);
      } else {
        log("HitDiceMulticlass event registration unsuccessful.");
      }
    },
    registerEventHandlers = () => {
      on("chat:message", handleInput);
    };

  return {
    checkInstall,
    registerEventHandlers,
    registerObserver
  };
})();

on("ready", () => {
  "use strict";
  HitDiceMulticlass.checkInstall();
  HitDiceMulticlass.registerEventHandlers();
  if ("undefined" !== typeof HealthColors) {
    HitDiceMulticlass.registerObserver("change", HealthColors.Update);
  }
});
