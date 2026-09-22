declare module 'core-js/modules/*';
declare module '@rollup/plugin-babel';
declare module '@swc/core' {
  namespace swc {
    interface Options { [key: string]: any }
    function transformSync(code: string, options: Options): { code: string; map?: string };
    function transform(code: string, options: Options): Promise<{ code: string; map?: string }>;
    function transformFile(path: string, options: Options): Promise<{ code: string; map?: string }>;
  }
  export = swc;
}
declare module 'webpack' {
  namespace webpack {
    interface Configuration { [key: string]: any }
  }
  function webpack(options: any, callback?: any): any;
  export = webpack;
}
declare module 'core-js/*';
