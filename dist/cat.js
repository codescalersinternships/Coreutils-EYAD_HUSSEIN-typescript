"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
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
    }
    else {
        displayFilesWithLineNumbers(files);
    }
};
const displayFiles = (files) => {
    files.forEach((file) => {
        try {
            const content = fs_1.default.readFileSync(file, "utf-8");
            console.log(content);
        }
        catch (err) {
            console.error(`Error reading file '${file}':`, err);
            process.exit(1);
        }
    });
};
const displayFilesWithLineNumbers = (files) => {
    let lineNumber = 1;
    files.forEach((file) => {
        try {
            const fileStream = fs_1.default.createReadStream(file);
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
        }
        catch (err) {
            console.error(`Error reading file '${file}':`, err);
            process.exit(1);
        }
    });
};
cat();
//# sourceMappingURL=cat.js.map