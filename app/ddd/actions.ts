import { BoardService } from "./application/BoardService";
import { UserService } from "./application/UserService";
import { RepoBoardRepository } from "./infrastructure/board/RepoBoardRepository";
import { RepoCashedItemRepository } from "./infrastructure/board/RepoCashedItemRepository";
import { UserRepositoryImpl } from "./infrastructure/user/RepoUserRepository";

//비즈니스 로직을 수행하는 영역(브릿지 역할)
const userRepository = new UserRepositoryImpl();
const cashedRepository = new RepoCashedItemRepository();
const boardRepository = new RepoBoardRepository();

const useUserService = new UserService(userRepository);
const useBoardService = BoardService.getInstance(
  cashedRepository,
  boardRepository
);

export { useUserService, useBoardService };
