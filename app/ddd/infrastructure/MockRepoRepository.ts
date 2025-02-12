import { Repo } from "../domain/Repo";
import { RepoRepository } from "../domain/RepoRepository";

//[use case] Infrastructure Layer
//비즈니스 로직을 수행하는 인프라 영역
export class MockRepoRepository implements RepoRepository {
  async fetchRepos(username: string) {
    return [
      new Repo(1, "Test Repo", "테스트용 레포지토리", 100),
      new Repo(2, "Another Repo", "또 다른 레포", 50),
    ];
  }
}
