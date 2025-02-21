import { CashedItemRepository } from "../domain/board/CashedItemRepository";
import { CommonResponse } from "../domain/CommonResponse";
import { RepoBoardRepository } from "../infrastructure/board/RepoBoardRepository";

export class BoardService {
  private static instance: BoardService;
  private repository: CashedItemRepository;
  private repository2: RepoBoardRepository;
  private constructor(
    repository: CashedItemRepository,
    repository2: RepoBoardRepository
  ) {
    this.repository = repository;
    this.repository2 = repository2;
  }

  //싱글톤 패턴 적용
  static getInstance(
    repository: CashedItemRepository,
    repository2: RepoBoardRepository
  ): BoardService {
    if (!BoardService.instance) {
      BoardService.instance = new BoardService(repository, repository2);
    }
    return BoardService.instance;
  }

  async selectCashedDataAll(): Promise<CommonResponse> {
    const data = await this.repository.selectAll();
    return data;
  }
  async selectDataAll(): Promise<CommonResponse> {
    const data = await this.repository2.selectAll();
    return data;
  }
  async selectDataById(id: number): Promise<CommonResponse> {
    const data = await this.repository2.selectById(id);
    return data;
  }
  async insertData(board: any): Promise<CommonResponse> {
    const data = await this.repository2.insert(board);
    return data;
  }
  async updateData(board: any): Promise<CommonResponse> {
    const data = await this.repository2.update(board);
    return data;
  }
  async deleteData(id: number): Promise<CommonResponse> {
    const data = await this.repository2.delete(id);
    return data;
  }
}
