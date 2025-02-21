import { CashedItemRepository } from "../domain/board/CashedItemRepository";
import { CommonResponse } from "../domain/CommonResponse";

export class BoardService {
  private static instance: BoardService;
  private repository: CashedItemRepository;
  private constructor(repository: CashedItemRepository) {
    this.repository = repository;
  }

  //싱글톤 패턴 적용
  static getInstance(repository: CashedItemRepository) {
    if (!BoardService.instance) {
      BoardService.instance = new BoardService(repository);
    }
    return BoardService.instance;
  }

  async selectCashedDataAll(): Promise<CommonResponse> {
    const data = await this.repository.selectAll();
    return data;
  }
}
