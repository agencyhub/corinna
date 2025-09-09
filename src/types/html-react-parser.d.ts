declare module 'html-react-parser' {
  import { ReactElement } from 'react';

  function parse(html: string, options?: any): string | ReactElement | ReactElement[];

  export = parse;
}
