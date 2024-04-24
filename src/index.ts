#!/usr/bin/env node

import { program } from "commander";
import { readFileSync, writeFileSync } from "fs-extra";

import { ConstructVersionMapOptions, PackageJson } from "./types";

export const updateCodependencies = ({
  packageJson = "package.json",
  rootDir: cwd = "./",
  debug = false,
}: ConstructVersionMapOptions = {}): void => {
  const rootPkgPath = `${cwd}${packageJson}`;
  const rootPkg = readFileSync(`${cwd}${packageJson}`, "utf8");
  const json = JSON.parse(rootPkg);
  const { dependencies = {}, devDependencies = {} } = json as PackageJson;
  const codependencies = Object.keys(dependencies).concat(
    Object.keys(devDependencies),
  );
  const updatedJson = {
    ...json,
    codependence: {
      codependencies,
    },
  };
  if (debug) console.log({ updatedJson });
  writeFileSync(rootPkgPath, JSON.stringify(updatedJson, null, 2).concat("\n"));
};

program
  .description(
    "Codependency cron, constructs codependencies from dependencies and devDependencies",
  )
  .option("-p, --packageJson", "dependencies json reference")
  .option("-r, --rootDir", "directory of json reference")
  .option("--debug", "enable debugging")
  .action(updateCodependencies)
  .parse(process.argv);

export { program };
