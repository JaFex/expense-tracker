import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck, MikroOrmHealthIndicator, DiskHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly http: HttpHealthIndicator,
        private readonly db: MikroOrmHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private readonly memory: MemoryHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck('network', 'https://google.com'),
            () => this.db.pingCheck('database'),
            () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
        ]);
    }
}