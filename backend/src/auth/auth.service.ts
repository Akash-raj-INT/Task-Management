import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Guest login: creates a throwaway user record and issues a JWT.
   * No password/email required, matching the "Continue as Guest" flow.
   */
  async guestLogin(displayName?: string) {
    const user = this.usersRepo.create({
      displayName: displayName?.trim() || 'Guest',
      role: UserRole.GUEST,
    });
    await this.usersRepo.save(user);

    const token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
      name: user.displayName,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        displayName: user.displayName,
        role: user.role,
      },
    };
  }

  async findUserById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
