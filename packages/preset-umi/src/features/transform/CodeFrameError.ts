import type { SourceLocation } from '@4399ywkf/bundler-utils/compiled/babel/code-frame';

export default class CodeFrameError extends Error {
  location: SourceLocation;

  constructor(msg: string, location: SourceLocation) {
    super(msg);
    this.location = location;
  }
}
