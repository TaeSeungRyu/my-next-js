import { Repo } from "./Repo";

//[use case] Domain Layer
//비즈니스 로직을 수행하는 도메인 영역
export interface RepoRepository {
  fetchRepos(username: string): Promise<Repo[]>;
}
