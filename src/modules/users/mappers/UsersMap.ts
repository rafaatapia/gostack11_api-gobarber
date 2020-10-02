import User from '../infra/typeorm/entities/User';

interface IUserDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

class UserMap {
  public static toDTO(user: User): IUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}

export default UserMap;
