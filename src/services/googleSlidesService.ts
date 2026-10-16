/**
 * Google Slides API integration service
 * Creates a readable, non-interactive text summary deck in the user's Google Slides account
 */
import { getAccessToken } from './firebaseAuth';
import { SLIDES, type SlideData } from '../data/slidesData';

const plannedSeconds = SLIDES.reduce((sum, slide) => sum + slide.durationSeconds, 0);
const plannedTime = `${Math.floor(plannedSeconds / 60)}:${String(plannedSeconds % 60).padStart(2, '0')}`;

export interface CreatePresentationResult {
  presentationId: string;
  presentationUrl: string;
  title: string;
  slideCount: number;
}

export const createGoogleSlidesDeck = async (
  onProgress?: (step: string, current: number, total: number) => void
): Promise<CreatePresentationResult> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('برای دسترسی به Google Slides، لطفاً ابتدا با حساب گوگل خود وارد شوید.');
  }

  onProgress?.('در حال ایجاد فایل ارائه جدید در Google Slides...', 1, 4);

  // 1. Create the presentation
  const title = `AI AGENTS: ${SLIDES[0].subtitle || SLIDES[0].title}`;
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `خطا در ایجاد ارائه (${createRes.status}): دسترسی به Google Slides تأیید نشد.`
    );
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const initialSlides = presentation.slides || [];
  let firstSlideId = initialSlides[0]?.objectId;

  onProgress?.('در حال آماده‌سازی قالب و صفحات اسلایدها...', 2, 4);

  // 2. Prepare batchUpdate requests
  const requests: any[] = [];

  // Helper for generating unique ID
  const makeId = (prefix: string, index: number) => `${prefix}_${Date.now()}_${index}`;

  // A new presentation is blank and usually has no slides.
  // Always add its title slide explicitly, before inserting the remaining slides.
  if (!firstSlideId) {
    firstSlideId = makeId('title_slide', 0);
    requests.push({
      createSlide: {
        objectId: firstSlideId,
        insertionIndex: 0,
        slideLayoutReference: { predefinedLayout: 'BLANK' },
      },
    });
  }

  // Slide 0 (Title slide)
  if (firstSlideId) {
    const titleBoxId = makeId('title_box', 0);
    const subtitleBoxId = makeId('subtitle_box', 0);
    const footerBoxId = makeId('footer_box', 0);

    // Title box
    requests.push(
      {
        createShape: {
          objectId: titleBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: firstSlideId,
            size: {
              height: { magnitude: 90, unit: 'PT' },
              width: { magnitude: 620, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 50,
              translateY: 80,
              unit: 'PT',
            },
          },
        },
      },
      {
        insertText: {
          objectId: titleBoxId,
          text: `${SLIDES[0].title}\n${SLIDES[0].subtitle || ''}`,
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: titleBoxId,
          style: {
            bold: true,
            fontSize: { magnitude: 26, unit: 'PT' },
            foregroundColor: {
              opaqueColor: { rgbColor: { red: 0.1, green: 0.2, blue: 0.45 } },
            },
          },
          fields: 'bold,fontSize,foregroundColor',
        },
      }
    );

    // Subtitle box
    requests.push(
      {
        createShape: {
          objectId: subtitleBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: firstSlideId,
            size: {
              height: { magnitude: 50, unit: 'PT' },
              width: { magnitude: 620, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 50,
              translateY: 190,
              unit: 'PT',
            },
          },
        },
      },
      {
        insertText: {
          objectId: subtitleBoxId,
          text: 'از مفهوم عامل تا معماری، کاربرد و محدودیت‌ها\nHuman → AI Agent → Tools',
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: subtitleBoxId,
          style: {
            fontSize: { magnitude: 16, unit: 'PT' },
            foregroundColor: {
              opaqueColor: { rgbColor: { red: 0.35, green: 0.4, blue: 0.5 } },
            },
          },
          fields: 'fontSize,foregroundColor',
        },
      }
    );

    // Footer info
    requests.push(
      {
        createShape: {
          objectId: footerBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: firstSlideId,
            size: {
              height: { magnitude: 40, unit: 'PT' },
              width: { magnitude: 620, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 50,
              translateY: 330,
              unit: 'PT',
            },
          },
        },
      },
      {
        insertText: {
          objectId: footerBoxId,
          text: `درس هوش مصنوعی • زمان هدف ارائه ${plannedTime} دقیقه`,
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: footerBoxId,
          style: {
            fontSize: { magnitude: 12, unit: 'PT' },
            foregroundColor: {
              opaqueColor: { rgbColor: { red: 0.45, green: 0.5, blue: 0.55 } },
            },
          },
          fields: 'fontSize,foregroundColor',
        },
      }
    );
  }

  // Create all remaining slides from the shared slide-data source.
  const remainingSlides = SLIDES.slice(1);

  remainingSlides.forEach((slide, idx) => {
    const slideIndex = idx + 1;
    const pageId = makeId(`page_${slide.slug}`, slideIndex);

    // 1. Create slide
    requests.push({
      createSlide: {
        objectId: pageId,
        insertionIndex: slideIndex,
      },
    });

    // 2. Slide Header
    const titleBoxId = makeId('header', slideIndex);
    requests.push(
      {
        createShape: {
          objectId: titleBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: pageId,
            size: {
              height: { magnitude: 60, unit: 'PT' },
              width: { magnitude: 620, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 50,
              translateY: 30,
              unit: 'PT',
            },
          },
        },
      },
      {
        insertText: {
          objectId: titleBoxId,
          text: `اسلاید ${slide.id + 1}: ${slide.title}\n${slide.subtitle || ''}`,
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: titleBoxId,
          style: {
            bold: true,
            fontSize: { magnitude: 18, unit: 'PT' },
            foregroundColor: {
              opaqueColor: { rgbColor: { red: 0.12, green: 0.22, blue: 0.4 } },
            },
          },
          fields: 'bold,fontSize,foregroundColor',
        },
      }
    );

    // 3. Slide Core Content Box
    const bodyBoxId = makeId('body', slideIndex);
    const contentText = buildSlideBodyText(slide);

    requests.push(
      {
        createShape: {
          objectId: bodyBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: pageId,
            size: {
              height: { magnitude: 220, unit: 'PT' },
              width: { magnitude: 620, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 50,
              translateY: 100,
              unit: 'PT',
            },
          },
        },
      },
      {
        insertText: {
          objectId: bodyBoxId,
          text: contentText,
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: bodyBoxId,
          style: {
            fontSize: { magnitude: slide.slug === 'featured-agents' ? 11 : 14, unit: 'PT' },
            foregroundColor: {
              opaqueColor: { rgbColor: { red: 0.15, green: 0.2, blue: 0.25 } },
            },
          },
          fields: 'fontSize,foregroundColor',
        },
      }
    );

    // Link URLs on product slide directly from exportBullets; avoid parallel outdated link lists.
    if (slide.slug === 'featured-agents') {
      const urls = contentText.match(/https?:\/\/[^\s]+/g) || [];
      urls.forEach((url) => {
        const startIndex = contentText.indexOf(url);
        if (startIndex >= 0) {
          requests.push({
            updateTextStyle: {
              objectId: bodyBoxId,
              textRange: { type: 'FIXED_RANGE', startIndex, endIndex: startIndex + url.length },
              style: { link: { url } },
              fields: 'link',
            },
          });
        }
      });
    }

    // The real demonstration is a published past SWE-agent trace, NOT a live execution.
    if (slide.slug === 'applications-and-demo') {
      const traceLabel = 'مشاهده ردگیری SWE-agent';
      const startIndex = contentText.indexOf(traceLabel);
      if (startIndex >= 0) {
        requests.push({
          updateTextStyle: {
            objectId: bodyBoxId,
            textRange: { type: 'FIXED_RANGE', startIndex, endIndex: startIndex + traceLabel.length },
            style: {
              link: { url: 'https://github.com/SWE-agent/SWE-agent/blob/main/trajectories/demonstrations/function_calling_simple.traj' },
            },
            fields: 'link',
          },
        });
      }
    }

  // 4. Slide Footer & Key Takeaway
    const badgeBoxId = makeId('badge', slideIndex);
    requests.push(
      {
        createShape: {
          objectId: badgeBoxId,
          shapeType: 'TEXT_BOX',
          elementProperties: {
            pageObjectId: pageId,
            size: {
              height: { magnitude: 40, unit: 'PT' },
              width: { magnitude: 620, unit: 'PT' },
            },
            transform: {
              scaleX: 1,
              scaleY: 1,
              translateX: 50,
              translateY: 340,
              unit: 'PT',
            },
          },
        },
      },
      {
        insertText: {
          objectId: badgeBoxId,
          text: `💡 نکته کلیدی: ${slide.keyTakeaway}`,
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: badgeBoxId,
          style: {
            bold: true,
            fontSize: { magnitude: 11, unit: 'PT' },
            foregroundColor: {
              opaqueColor: { rgbColor: { red: 0.05, green: 0.5, blue: 0.35 } },
            },
          },
          fields: 'bold,fontSize,foregroundColor',
        },
      }
    );
  });

  onProgress?.('در حال تزریق محتوای اسلایدها و فرمت‌بندی...', 3, 4);

  // Send batchUpdate
  const batchRes = await fetch(
    `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }
  );

  if (!batchRes.ok) {
    const errorData = await batchRes.json().catch(() => ({}));
    console.error('BatchUpdate failed:', errorData);
    throw new Error(
      errorData.error?.message ||
      `ساخت محتوای اسلایدها با خطا روبه‌رو شد (${batchRes.status}). فایل ایجادشده ممکن است خالی باشد؛ آن را به‌عنوان ارائه آماده استفاده نکنید.`
    );
  }

  onProgress?.('ارائه با موفقیت در Google Slides ایجاد شد!', 4, 4);

  return {
    presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
    title,
    slideCount: SLIDES.length,
  };
};

/**
 * Text-only Google Slides uses the SAME structured source as the live website.
 * It deliberately does not claim to recreate interactive demos, timers, or speaker notes.
 */
function buildSlideBodyText(slide: SlideData): string {
  return slide.exportBullets.map((bullet) => `• ${bullet}`).join('\n');
}
