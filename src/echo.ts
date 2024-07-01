const echo = () => {
  const { Command } = require("commander");
  const program = new Command();

  program.option("-n", "do not output the trailing newline");
  program.parse(process.argv);

  const output = program.args.join(" ");

  const options = program.opts();

  if (options.n) {
    process.stdout.write(output);
  } else {
    console.log(output);
  }
};

echo();
