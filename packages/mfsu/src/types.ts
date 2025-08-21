import type { ImportSpecifier } from '@4399ywkf/bundler-utils/compiled/es-module-lexer';
import type { TransformOptions } from '@4399ywkf/bundler-utils/compiled/esbuild';

export enum Mode {
  development = 'development',
  production = 'production',
}

export interface IEsbuildLoaderHandlerParams {
  code: string;
  filePath: string;
  imports: readonly ImportSpecifier[];
  exports: readonly string[];
}

export interface IEsbuildLoaderOpts extends Partial<TransformOptions> {
  handler?: Array<(opts: IEsbuildLoaderHandlerParams) => string>;
  implementation?: typeof import('@4399ywkf/bundler-utils/compiled/esbuild');
}
