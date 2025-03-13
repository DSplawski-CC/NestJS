import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@modules/user/user.entity';


@Injectable()
export class UserService {
  private readonly users = new Map<string, UserEntity>([
    ['a5db44cc-2794-443f-b963-bb1de227af2e', { id: 'a5db44cc-2794-443f-b963-bb1de227af2e', name: 'Mike', email: 'mike@mike.com' }],
    ['4905c177-b02b-4392-8788-4ec0486432fa', { id: '4905c177-b02b-4392-8788-4ec0486432fa', name: 'Jason', email: 'jason@jason.com' }],
  ]);

  getUser(id: string): UserEntity {
    if (!this.users.has(id)) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.users.get(id)!;
  }
}
