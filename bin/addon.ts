import * as fs from 'fs';
import * as path from 'path';

[['addon', 'addons/']].forEach((val: string[]) => {
  const name = val[0];
  const dir = val[1];
  const src: string = path.join(__dirname, `../build/Release/${name}.node`);
  const dest: string = path.join(__dirname, `../${dir}${name}.node`);

  fs.copyFileSync(src, dest);
});
