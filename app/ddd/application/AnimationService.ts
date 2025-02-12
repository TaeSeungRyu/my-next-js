//[use case] Application Layer
//비즈니스 로직을 수행하는 유스케이스 영역
export class AnimationService {
  fadeIn(element: HTMLElement) {
    element.style.opacity = "0";
    element.style.transition = "opacity 0.3s ease-in";
    setTimeout(() => (element.style.opacity = "1"), 250);
  }
}
