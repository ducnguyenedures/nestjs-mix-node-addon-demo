import { Injectable } from '@nestjs/common';
import { performance } from 'perf_hooks';

import { calc as cpp } from '../addons/addon';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return await this.test();
  }

  public async test(): Promise<string> {
    let res = 'Hello World! \n';
    try {
      const size = 1000000000;
      let now: number;
      let result: number;

      res = res + `loop: nodeCase(N) vs. cppCase(C) \n`;

      for (let i = 1; i <= 10; i += 1) {
        now = performance.now();
        for (let j = 0; j < size; j += 1) {}
        const node1 = performance.now() - now;

        now = performance.now();
        result = await cpp.loop(size);
        const cpp1 = performance.now() - now;
        if (result !== size) {
          throw new Error(`InvalidCpp: ${result}`);
        }

        res = res + `${i}: N ${node1}ms / C ${cpp1}ms \n`;
      }
    } catch (err) {
      console.error(err);
    }
    return res;
  }
}
