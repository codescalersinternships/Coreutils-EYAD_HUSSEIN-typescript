"use strict";
const yes = () => {
    const { Command } = require("commander");
    const program = new Command();
    program.parse(process.argv);
    while (true) {
        if (!program.args.length)
            console.log("y");
        else
            console.log(program.args.join(" "));
    }
};
yes();
//# sourceMappingURL=yes.js.map