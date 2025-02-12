//[use case] Domain Layer
//비즈니스 로직을 수행하는 도메인 영역
export class Repo {
  constructor(
    public id: number,
    public name: string,
    public description: string | null,
    public stars: number
  ) {}
}
