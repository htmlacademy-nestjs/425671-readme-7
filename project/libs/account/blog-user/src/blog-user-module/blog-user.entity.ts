import { Entity } from '@project/shared/core';
import { StorableEntity, AuthUser} from '@project/shared/core';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public username: string;
  public avatar: string;
  public regDate: Date;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (! user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.username = user.username;
    this.avatar = user.avatar ?? 'dummy.png';
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      avatar: this.avatar,
      regDate: this.regDate,
      passwordHash: this.passwordHash,
    }
  }
}