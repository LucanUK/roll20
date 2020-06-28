on("chat:message", function(msg) {
     if (msg.type === "api" && msg.content.search(/^!hitdice-mc\b/) !== -1) {
        const hasValue = ["id"],
        opts = Object.assign({}, defaultOpts, parseOpts(msg, hasValue));
        log(opts.id) 
});