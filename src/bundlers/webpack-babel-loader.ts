import babel from '@babel/core';

export default async function(this: any, source: string, inputMap?: any) {
  const callback = this.async();
  const options = this.getOptions() || {};
  try {
    const result = await babel.transformAsync(source, {
      ...options,
      filename: this.resourcePath,
      inputSourceMap: inputMap,
      sourceMaps: this.sourceMap
    });
    if (!result) {
      return callback(null, source, inputMap);
    }
    callback(null, result.code || source, result.map || inputMap);
  } catch (err: any) {
    callback(err);
  }
}
