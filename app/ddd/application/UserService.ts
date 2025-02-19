import { UserRepository } from "../domain/user/UserRepository";

//[use case] Application Layer
export class UserService {
  constructor(private userRepo: UserRepository) {}
  async signIn(username: string, password: string) {
    return this.userRepo.findOneUser(username, password);
  }
  async signUp(username: string, password: string, name: string | null) {
    return this.userRepo.insertUser(username, password, name);
  }
}
