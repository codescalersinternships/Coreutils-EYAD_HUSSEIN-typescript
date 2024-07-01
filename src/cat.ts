import fs from "fs";

const cat = () => {
  const { Command } = require("commander");
  const program = new Command();
  program.option("-n", "number all output lines").parse(process.argv);

  if (program.args.length === 0) {
    console.log("No files were entered!");
    process.exit(1);
  }

  const files = program.args;

  const options = program.opts();

  if (!options.n) {
    console.log("No line numbers");
    displayFiles(files);
  } else {
    displayFilesWithLineNumbers(files);
  }
};

const displayFiles = (files: string[]) => {
  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf-8");
      console.log(content);
    } catch (err) {
      console.error(`Error reading file '${file}':`, err);
      process.exit(1);
    }
  });
};

const displayFilesWithLineNumbers = (files: string[]) => {
  let lineNumber = 1;
  files.forEach((file) => {
    try {
      const fileStream = fs.createReadStream(file);
      fileStream.on("data", (chunk) => {
        chunk
          .toString()
          .split("\n")
          .forEach((line) => {
            console.log(`${lineNumber.toString().padStart(6)}  ${line}`);
            lineNumber++;
          });
      });
      fileStream.on("error", (err) => {
        console.error(`Error reading file '${file}':`, err);
        process.exit(1);
      });
    } catch (err) {
      console.error(`Error reading file '${file}':`, err);
      process.exit(1);
    }
  });
};

cat();
