import { AnimationService } from "./application/AnimationService";
import { RepoService } from "./application/RepoService";
import { MockRepoRepository } from "./infrastructure/MockRepoRepository";
import { RepoRepositoryImpl } from "./infrastructure/RepoRepositoryImpl";

//비즈니스 로직을 수행하는 영역(브릿지 역할)

const repository = new MockRepoRepository(); //new RepoRepositoryImpl() //운영
const repoService = new RepoService(repository); //테스트
const animationService = new AnimationService();

export async function fetchUserRepos(username: string) {
  return await repoService.getUserRepos(username);
}

export function animate(htmlElement: HTMLElement) {
  animationService.fadeIn(htmlElement);
}
