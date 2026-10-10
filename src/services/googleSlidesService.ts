/**
 * Google Slides API integration service
 * Creates a complete slide deck in user's Google Slides account
 */
import { getAccessToken } from './firebaseAuth';
import { SLIDES } from '../data/slidesData';

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
  const title = 'AI AGENTS: وقتی هوش مصنوعی فقط جواب نمی‌دهد؛ کار می‌کند';
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
          text: 'AI AGENTS\nوقتی هوش مصنوعی فقط جواب نمی‌دهد؛ کار می‌کند',
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
          text: 'از مفهوم ساده تا معماری فنی عامل‌های هوشمند\nمعماری حلقوی: Human → AI Agent → Tools',
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
          text: 'درس هوش مصنوعی • ارائه کلاسی ۱۰ دقیقه‌ای',
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

    // Keep links on the real-agents slide clickable in Google Slides exports.
  if (slide.slug === 'featured-agents') {
    const officialLinks = [
      'https://openai.com/index/introducing-dots/',
      'https://www.antigravity.google/product/antigravity-2',
      'https://openai.com/index/introducing-deep-research/',
      'https://www.make.com/en/ai-agents',
    ];

    officialLinks.forEach((url) => {
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
          text: `💡 نکته کلیدی: ${slide.keyTakeaway} | زمان‌بندی: ${slide.timing}`,
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

function buildSlideBodyText(slide: any): string {
  switch (slide.id) {
    case 1:
      return [
        '● مقایسه بنیادین چتبات در برابر عامل هوشمند:',
        '  - چتبات: «چطور بلیط هواپیما بگیرم؟» ➔ پاسخ متنی و توضیح مراحل',
        '  - عامل هوشمند (Agent): «ارزان‌ترین پرواز جمعه را پیدا کن.» ➔ جستجو ➔ مقایسه ➔ انتخاب ➔ اقدام',
        '',
        '● تمایز کلیدی:',
        '  - Chatbot سؤال می‌گیرد و جواب متنی می‌دهد.',
        '  - AI Agent هدف می‌گیرد و در محیط عملیاتی اقدام می‌کند.',
        '  - Agent یک ربات انسان‌نما نیست؛ یک سیستم نرم‌افزاری متشکل از کد و ابزار است.'
      ].join('\n');

    case 2:
      return [
        '● مؤلفه‌های درون یک AI Agent:',
        '  - LLM (مغز): مسئول تحلیل، درک مفهوم و تصمیم‌گیری',
        '  - Tools (دست‌ها): ارتباط با وب، دیتابیس، ایمیل و APIها',
        '  - Memory / State (حافظه): نگه‌داشتن سابقه اقدامات و تغییر وضعیت',
        '  - Instructions (شرح وظایف): تعیین نقش و اهداف دقیق',
        '  - Guardrails (محدودیت‌ها): فیلترهای امنیتی و مهار رفتارهای ناخواسته',
        '',
        '● فرمول بنیادین:',
        '  [Agent = Model + Tools + Memory + Control Loop]',
        '  الگوی ReAct (استدلال و عمل) به عنوان یکی از محبوب‌ترین الگوها.'
      ].join('\n');

    case 3:
      return [
        '● چرخه حیات و حلقه کنترل (Agent Loop):',
        '  Goal ➔ Decide ➔ Act ➔ Observe ➔ Repeat',
        '',
        '● نمونه پیاده‌سازی حلقه در سناریوی رزرو پرواز:',
        '  ۱. Decide: باید پروازهای موجود را بررسی کنم.',
        '  ۲. Act: فراخوانی تابع Search_Flights(date, dest)',
        '  ۳. Observe: دریافت ۱۲ گزینه پرواز از وب‌سرویس',
        '  ۴. Decide: مقایسه قیمت‌ها و گزینش ارزان‌ترین مورد',
        '  ۵. نتیجه: ارائه گزینه‌های پرواز برای انتخاب کاربر'
      ].join('\n');

    case 4:
      return [
        '● مسیر ورود هوش مصنوعی به دنیای واقعی:',
        '  User ➔ LLM ➔ Tool Request ➔ Program/API ➔ Result ➔ LLM',
        '',
        '● چهار ستون اتصال به سیستم‌های واقعی:',
        '  ۱. Tool Calling: مدل درخواست فراخوانی تابع ساختاریافته (JSON) تولید می‌کند.',
        '  ۲. API: تبادل داده و ارتباط مستقیم با سرویس‌های ابری.',
        '  ۳. MCP (Model Context Protocol): استاندارد استانداردسازی اتصال AI به فایل‌ها، ایمیل و پایگاه‌های داده.',
        '  ۴. Computer Use: مشاهده تصویر مانیتور، هدایت ماوس و تایپ خودکار.'
      ].join('\n');

    case 5:
      return [
        '● ۵ کاربرد برتر در دنیای واقعی:',
        '  💻 Coding Agent: پیدا کردن باگ ➔ ویرایش کد ➔ اجرای تست ➔ اصلاح مجدد',
        '  🔎 Research Agent: جستجوی منابع ➔ مطالعه ➔ تحلیل مقایسه‌ای ➔ تهیه گزارش',
        '  🎧 Customer Support: خواندن تیکت ➔ استعلام سفارش ➔ انجام عملیات استرداد یا تغییر',
        '  📊 Data Agent: دریافت داده ➔ اجرای کوئری و کد پایتون ➔ رسم نمودار',
        '  📅 Personal Agent: مدیریت ایمیل، تقویم کاری، فایل‌ها و وظایف روزانه',
        '',
        '● چرخه دمو Coding Agent: Test Runner ➔ Error ➔ Patch ➔ Passed ✓'
      ].join('\n');

    case 6:
      return [
        '● چهار ایجنت واقعی و لینک‌های رسمی:',
        '۱. OpenAI dots — دستیار همیشگی؛ پیگیری کارها، ایمیل و تقویم با اجازه کاربر (عرضه محدود)',
        'https://openai.com/index/introducing-dots/',
        '۲. Google Antigravity 2.0 — کدنویسی، اصلاح باگ و هماهنگی چند عامل',
        'https://www.antigravity.google/product/antigravity-2',
        '۳. ChatGPT Deep Research — تحقیق چندمنبعی و تهیه گزارش مستند',
        'https://openai.com/index/introducing-deep-research/',
        '۴. Make AI Agents — اتصال نرم‌افزارها و خودکارسازی فرایندها',
        'https://www.make.com/en/ai-agents',
        'دسترسی، هزینه و محدودیت منطقه‌ای بسته به سرویس متفاوت است.'
      ].join('\n');
    case 7:
      return [
        '● چالش خطاهای آبشاری (Compounding Error):',
        '  فرمول موفقیت چندگامی: P(Success) = p^n',
        '  با فرض p = 95% دقت در هر گام مستقل:',
        '    - ۵ مرحله: ۷۷٪ موفقیت',
        '    - ۱۰ مرحله: ۶۰٪ موفقیت',
        '    - ۲۰ مرحله: ۳۶٪ موفقیت (احتمال شکست بیش از ۶۴٪!)',
        '',
        '● تهدیدهای سیستم‌های عاملی:',
        '  Hallucination • گیر کردن در Loop • انحراف از هدف (Goal Drift) • نفوذ به پرامپت (Prompt Injection)',
        '● راهکارهای مهندسی: تأیید انسان • حداقل دسترسی • سقف مراحل • بررسی خروجی'
      ].join('\n');

    case 8:
      return [
        '● معماری سیستم‌های چندعاملی (Multi-Agent):',
        '  - مدیر سیستم (Orchestrator): تجزیه مأموریت بزرگ به ریزپروژه‌ها',
        '  - عامل‌های تخصصی (Workers): Research Agent + Coding Agent + Review Agent',
        '  - ترکیب نتایج: Specialization + Coordination',
        '',
        '● نکته کلیدی مهندسی:',
        '  چندعاملی همیشه بهتر نیست! به ازای استقلال بیشتر، هزینه توکن و تأخیر افزایش می‌یابد.',
        '  در تسک‌های شفاف، یک عامل منفرد بهینه و سریع‌تر است.'
      ].join('\n');

    case 9:
      return [
        '● سه پیام ماندگار از ارائه:',
        '  ۱. Agent هدف می‌گیرد، نه فقط سؤال.',
        '  ۲. تصمیم می‌گیرد، از ابزارها استفاده می‌کند و نتیجه را در محیط مشاهده می‌کند.',
        '  ۳. هرچه سطح خودمختاری بیشتر شود، اهمیت ایمنی، نظارت و کنترل دوچندان است.',
        '',
        '● فرمول جمع‌بندی:',
        '  AI Agent = Model + Tools + Memory + Autonomy + Feedback',
        '',
        '● سخن پایانی:',
        '  هوش مصنوعی از «تولید پاسخ متنی» به «اجرای کار واقعی» حرکت کرده است.'
      ].join('\n');

    default:
      return slide.keyTakeaway;
  }
}
