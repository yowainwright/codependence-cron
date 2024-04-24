export type ConstructVersionMapOptions = {
  packageJson?: string;
  rootDir?: string;
  debug?: boolean;
};

export type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
