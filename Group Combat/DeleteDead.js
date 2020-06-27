/* global log, _, getObj, HealthColors, playerIsGM, sendChat, on */
const DeleteDead = (() => {
  "use strict";
  const version = "1.0",
    observers = {
      "change": [],
    },
    boundedBar = false,
    checkInstall = () => {
      log(`-=> DeleteDead v${version} <=-`);
    },
    defaultOpts = {
      type: "half",
      ids: "",
      saves: "",
      DC: "-1",
      dmg: "0",
      bar: "1",
      force: "0"
    },
    statusMarkers = [
      "red", "blue", "green", "brown", "purple", "pink", "yellow", "dead", "skull", "sleepy", "half-heart",
      "half-haze", "interdiction", "snail", "lightning-helix", "spanner", "chained-heart", "chemical-bolt",
      "death-zone", "drink-me", "edge-crack", "ninja-mask", "stopwatch", "fishing-net", "overdrive", "strong",
      "fist", "padlock", "three-leaves", "fluffy-wing", "pummeled", "tread", "arrowed", "aura", "back-pain",
      "black-flag", "bleeding-eye", "bolt-shield", "broken-heart", "cobweb", "broken-shield", "flying-flag",
      "radioactive", "trophy", "broken-skull", "frozen-orb", "rolling-bomb", "white-tower", "grab", "screaming",
      "grenade", "sentry-gun", "all-for-one", "angel-outfit", "archery-target"
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
    processInlinerolls = function (msg) {
      if (msg.inlinerolls && msg.inlinerolls.length) {
        return msg.inlinerolls.map(v => {
          const ti = v.results.rolls.filter(v2 => v2.table)
            .map(v2 => v2.results.map(v3 => v3.tableItem.name).join(", "))
            .join(", ");
          return (ti.length && ti) || v.results.total || 0;
        }).reduce((m, v, k) => m.replace(`$[[${k}]]`, v), msg.content);
      } else {
        return msg.content;
      }
    },
    handleError = (whisper, errorMsg) => {
      const output = `${whisper}<div style="border:1px solid black;background:#FFBABA;padding:3px">` +
        `<h4>Error</h4><p>${errorMsg}</p></div>`;
      sendChat("DeleteDead", output);
    },
    finalApply = (results, dmg, type, bar, status, force) => {
      const barCur = `bar${bar}_value`,
        barMax = `bar${bar}_max`;
      Object.entries(results).forEach(([id, saved]) => {
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
      if (msg.type === "api" && msg.content.search(/^!delete-dead\b/) !== -1) {
        const hasValue = ["ids", "saves", "DC", "type", "dmg", "bar", "status", "force"],
          opts = Object.assign({}, defaultOpts, parseOpts(processInlinerolls(msg), hasValue));
        opts.ids = opts.ids.split(/,\s*/g);
        opts.saves = opts.saves.split(/,\s*/g);
        opts.DC = parseInt(opts.DC);
        opts.dmg = parseInt(opts.dmg);
        opts.force = parseInt(opts.force);
        if (!playerIsGM(msg.playerid) && getObj("player", msg.playerid)) {
          handleError(getWhisperPrefix(msg.playerid), "Permission denied.");
          return;
        }
        if (!["1", "2", "3"].includes(opts.bar)) {
          handleError(getWhisperPrefix(msg.playerid), "Invalid bar.");
          return;
        }
        if (opts.status === "none") {
          opts.status = "dead" ;
        }
        if (opts.status && !statusMarkers.includes(opts.status)) {
          handleError(getWhisperPrefix(msg.playerid), "Invalid status.");
          return;
        }
        const results = _.reduce(opts.ids, function (m, id, k) {
          m[id] = parseInt(opts.saves[k] || "0") >= opts.DC;
          return m;
        }, {});
        finalApply(results, opts.dmg, opts.type, opts.bar, opts.status, opts.force);
        const output = `${
          getWhisperPrefix(msg.playerid)
        }<div style="border:1px solid black;background:#FFF;padding:3px"><p>Dead NPC's moved to GM Layer </p></div>`;
        sendChat("DeleteDead", output, null, { noarchive: true });
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
        log("DeleteDead event registration unsuccessful.");
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
  DeleteDead.checkInstall();
  DeleteDead.registerEventHandlers();
  if ("undefined" !== typeof HealthColors) {
    DeleteDead.registerObserver("change", HealthColors.Update);
  }
});
