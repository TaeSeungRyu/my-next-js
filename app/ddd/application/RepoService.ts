import { Repo } from "../domain/Repo";
import { RepoRepository } from "../domain/RepoRepository";

//[use case] Application Layer
//비즈니스 로직을 수행하는 유스케이스 영역
export class RepoService {
  constructor(private repoRepo: RepoRepository) {}

  async getUserRepos(username: string): Promise<Repo[]> {
    if (!username) throw new Error("Username is required");

    const repos = await this.repoRepo.fetchRepos(username);
    return repos.sort((a, b) => b.stars - a.stars); // ⭐ 스타 개수 기준 정렬
  }
}
