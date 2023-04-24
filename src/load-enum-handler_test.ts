import { strictEqual } from 'assert';
import { EnumLoadHandlerContext } from 'lite-ts-enum';
import { Mock, mockAny } from 'lite-ts-mock';

import { ICache } from './i-cache';
import { RedisLoadEnumHandler as Self } from './load-enum-handler';

describe('src/load-cache-enum-handler.ts', () => {
    describe('.handle(opt: LoadEnumHandlerBase)', () => {
        it('ok', async () => {
            const cacheMock = new Mock<ICache>();
            const self = new Self(cacheMock.actual);

            cacheMock.expectReturn(
                r => r.get('t', 0, mockAny),
                1
            );

            const opt: EnumLoadHandlerContext = {
                enum: {
                    name: 't'
                } as any,
                areaNo: 0,
                res: null
            };
            await self.handle(opt);
            strictEqual(opt.res, 1);
        });
    });
});