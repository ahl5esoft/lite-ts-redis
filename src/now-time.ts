import moment from 'moment';

import { INowTime } from './i-now-time';
import { RedisBase } from './redis-base';

export class RedisNowTime implements INowTime {
    public constructor(private m_Redis: RedisBase) { }

    public async isSame(unixTime: number, granularity: string) {
        const nowUnix = await this.unix();
        return moment.unix(nowUnix).isSame(
            moment.unix(unixTime),
            granularity as any,
        );
    }

    public async unix() {
        const res = await this.m_Redis.time();
        return parseInt(res[0]);
    }

    public async unixNano() {
        const res = await this.m_Redis.time();
        const complement = '0'.repeat(6 - res[1].length);
        return parseInt(`${res[0]}${res[1]}${complement}`) * 1000;
    }
}