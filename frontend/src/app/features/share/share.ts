import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './share.html',
  styleUrl: './share.css'
})
export class Share {
  readonly i18n = inject(I18nService);
  isCopied = signal(false);
  selectedPlatform = signal<string | null>(null);

  readonly shareMessage = "I'm ready to vote! 🗳️ I used the Democracy Guide to learn about the election process. Are you registered? Check it out: ";
  readonly shareUrl = 'https://election-process-educator.web.app';

  readonly platforms = [
    { id: 'twitter', label: 'X (Twitter)', icon: '𝕏', color: '#000000' },
    { id: 'facebook', label: 'Facebook', icon: 'f', color: '#1877F2' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'in', color: '#0A66C2' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', color: '#25D366' },
  ];

  shareOn(platform: string): void {
    this.selectedPlatform.set(platform);
    const text = encodeURIComponent(this.shareMessage);
    const url = encodeURIComponent(this.shareUrl);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}${url}`,
    };

    const shareWindowUrl = urls[platform];
    if (shareWindowUrl) {
      window.open(shareWindowUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 3000);
    });
  }
}
