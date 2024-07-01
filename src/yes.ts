const { Command } = require("commander");

const yes = () => {
  const program = new Command();

  program.parse(process.argv);

  while (true) {
    if (!program.args.length) console.log("y");
    else console.log(program.args.join(" "));
  }
};

yes();
