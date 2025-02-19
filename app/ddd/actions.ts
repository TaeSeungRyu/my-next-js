import { UserService } from "./application/UserService";
import { UserRepositoryImpl } from "./infrastructure/user/RepoUserRepository";

//비즈니스 로직을 수행하는 영역(브릿지 역할)
const userRepository = new UserRepositoryImpl();
const useUserService = new UserService(userRepository);

export { useUserService };
