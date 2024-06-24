import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TaskController } from './modules/tasks/controllers/task.controller';
import { TaskService } from './modules/tasks/services/task.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { JwtAuthGuard } from './common/guards/jwt-auth/jwt-auth.guard';
import { jwtConstants } from './common/strategies/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '160s' },
    }),
  ],
  controllers: [TaskController, AuthController],
  providers: [TaskService, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
