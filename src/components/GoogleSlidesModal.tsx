import React, { useState, useEffect } from 'react';
import {
  X,
  Presentation,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Sparkles,
  AlertCircle,
  LogOut,
  FolderPlus
} from 'lucide-react';
import { googleSignIn, getAccessToken, logout, initAuth, auth } from '../services/firebaseAuth';
import { createGoogleSlidesDeck, CreatePresentationResult } from '../services/googleSlidesService';
import { SLIDES } from '../data/slidesData';
import { User } from 'firebase/auth';

interface GoogleSlidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const GoogleSlidesModal: React.FC<GoogleSlidesModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [createdResult, setCreatedResult] = useState<CreatePresentationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Track auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setHasToken(!!token);
      },
      () => {
        setCurrentUser(null);
        setHasToken(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleSignIn = async () => {
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setHasToken(true);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'خطا در ورود با گوگل');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setHasToken(false);
    setCreatedResult(null);
  };

  const handleExportToGoogleSlides = async () => {
    setErrorMsg(null);
    setIsCreating(true);
    setProgressMsg('در حال آماده‌سازی درخواست...');
    try {
      const result = await createGoogleSlidesDeck((msg) => {
        setProgressMsg(msg);
      });
      setCreatedResult(result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'خطا در ایجاد ارائه در Google Slides');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in select-none">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-extrabold text-base">خروجی مستقیم به Google Slides</h3>
              <p className="text-xs text-slate-400">
                ایجاد {SLIDES.length} اسلاید کامل در حساب کاربری Google Drive شما
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* User auth state */}
          {!hasToken ? (
            <div className="text-center py-4 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                برای ایجاد و ویرایش اسلایدها در حساب شخصی خود، با حساب گوگل وارد شوید تا دسترسی
                موردنیاز به Google Slides داده شود.
              </div>

              {/* Official Google Sign-in Button style */}
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-slate-800 font-semibold text-sm hover:bg-slate-100 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isSigningIn ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                )}
                <span>ورود با حساب گوگل (Sign in with Google)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Logged in user info */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/50 border border-slate-800 text-xs">
                <div className="flex items-center gap-2.5">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">
                      G
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-slate-200">
                      {currentUser?.displayName || 'کاربر گرامی'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {currentUser?.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
                  title="خروج از حساب"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* What will be created */}
              {!createdResult && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-2">
                    <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>تأییدیه ایجاد ارائه در Google Slides:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      یک فایل جدید با نام{' '}
                      <span className="font-bold text-white">«AI AGENTS»</span> شامل {SLIDES.length} اسلاید متنی
                      با عنوان‌ها، نکات کلیدی و لینک ابزارها در Google Drive شما ساخته می‌شود.
                      برای حفظ نمودارهای تعاملی، طراحی اصلی و یادداشت‌های سخنران، از نسخه وب ارائه استفاده کنید.
                    </p>
                    <div className="pt-1 text-[11px] text-slate-400">
                      تعداد اسلایدها: {SLIDES.length} • زمان هدف: ۹:۲۵ • سقف: ۱۰ دقیقه
                    </div>
                  </div>

                  {/* Create / Confirm Button */}
                  <button
                    onClick={handleExportToGoogleSlides}
                    disabled={isCreating}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-900/30 transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{progressMsg || 'در حال ایجاد ارائه...'}</span>
                      </>
                    ) : (
                      <>
                        <FolderPlus className="w-4 h-4" />
                        <span>تأیید و ساخت ارائه در Google Slides</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Success Result Link */}
              {createdResult && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-emerald-300">
                      ارائه با موفقیت ایجاد شد!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      {createdResult.slideCount} اسلاید آماده ارائه در حساب Google Slides شما قرار گرفت.
                    </p>
                  </div>

                  <a
                    href={createdResult.presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 shadow-md transition-all active:scale-95"
                  >
                    <span>مشاهده و ویرایش در Google Slides</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
