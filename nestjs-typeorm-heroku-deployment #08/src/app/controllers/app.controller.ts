import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('/api/v1')
export class AppController {

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ){

  }
  @Get('/testAuth0')
  getHello() {
    return {
      status: 'ok',
    };
  }
  @HealthCheck()
  @Get('/health')
  getHealthCheck() {
    // this.logger.log('checking health check :: test log message');
    return this.health.check([
      async () => this.db.pingCheck('typeorm'),
    ]);
  }
}
