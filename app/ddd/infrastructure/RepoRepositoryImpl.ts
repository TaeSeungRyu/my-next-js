import { Repo } from "../domain/Repo";
import { RepoRepository } from "../domain/RepoRepository";

//[use case] Infrastructure Layer
//비즈니스 로직을 수행하는 인프라 영역
export class RepoRepositoryImpl implements RepoRepository {
  async fetchRepos(username: string): Promise<Repo[]> {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );

    if (!response.ok) {
      throw new Error("GitHub API 요청 실패");
    }

    const data = await response.json();
    return data.map(
      (repo: any) =>
        new Repo(repo.id, repo.name, repo.description, repo.stargazers_count)
    );
  }
}
