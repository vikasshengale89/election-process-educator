import { Directive, ElementRef, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Deferred image load via IntersectionObserver: set initial URL in {@link HTMLImageElement#dataset}.src (`data-src`)
 * until the element is near the viewport.
 */
@Directive({
  selector: 'img[appLazyLoad]',
  standalone: true,
})
export class LazyLoadDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLImageElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const img = this.el.nativeElement;
    const dataSrc = img.dataset['src'];
    if (!dataSrc) return;

    this.observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            this.observer?.disconnect();
            this.observer = undefined;
            break;
          }
        }
      },
      { rootMargin: '100px', threshold: 0.01 },
    );
    this.observer.observe(img);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
