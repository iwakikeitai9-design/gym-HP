/* ==========================================
   main.js - 全ページ共通JavaScript
   ========================================== */

/* ------------------------------------------
   1. ローディング画面（ページ読み込み時0.8秒表示）
   ------------------------------------------ */
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  if (!loading) return;
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 800); // 0.8秒後に非表示
});

/* ------------------------------------------
   2. ヘッダースクロール追従（透明 → 白背景+影）
   ------------------------------------------ */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ------------------------------------------
   3. ハンバーガーメニュー（スマホ用ナビ開閉）
   ------------------------------------------ */
const hamburger = document.getElementById('hamburger');
const spNav = document.getElementById('sp-nav');

if (hamburger && spNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    spNav.classList.toggle('open');
    // アクセシビリティ対応：開閉状態をスクリーンリーダーに伝える
    const isOpen = hamburger.classList.contains('open');
    hamburger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  // スマホナビのリンクをクリックしたらメニューを閉じる
  spNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      spNav.classList.remove('open');
    });
  });
}

/* ------------------------------------------
   4. スクロールアニメーション（Intersection Observer API）
   ページをスクロールして画面に入った要素をふわっと表示する
   ------------------------------------------ */
const fadeElements = document.querySelectorAll('.fade-in-section');

if (fadeElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 一度表示したら監視をやめる
      }
    });
  }, {
    threshold: 0.1 // 要素が10%見えたら発火
  });

  fadeElements.forEach(el => observer.observe(el));
}

/* ------------------------------------------
   5. スムーズスクロール（ページ内リンク #〇〇 をクリックで滑らかに移動）
   ------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80; // ヘッダー分ずらす
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ------------------------------------------
   6. ページトップへ戻るボタン（300px以上スクロールで表示）
   ------------------------------------------ */
const pageTop = document.getElementById('pageTop');
if (pageTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      pageTop.classList.add('visible');
    } else {
      pageTop.classList.remove('visible');
    }
  });

  pageTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ------------------------------------------
   7. FAQアコーディオン（about.html）
   クリックで答えを開閉する。CSSのmax-heightでアニメーション
   ------------------------------------------ */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    // すでに開いているものを閉じる
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.style.maxHeight = null;
    });

    // クリックしたものを開く（すでに開いていた場合は閉じたまま）
    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* 8. トレーナースライダーは削除済み（グリッドレイアウトに変更） */

/* ------------------------------------------
   8b. 料金プランのトグル（詳細を開閉）
   ------------------------------------------ */
document.querySelectorAll('.pricing-detail-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.closest('.pricing-row').querySelector('.pricing-detail-body');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      detail.style.maxHeight = null;
      btn.querySelector('.pricing-arrow').textContent = '▼';
    } else {
      btn.setAttribute('aria-expanded', 'true');
      detail.style.maxHeight = detail.scrollHeight + 'px';
      btn.querySelector('.pricing-arrow').textContent = '▲';
    }
  });
});

/* ------------------------------------------
   8c. スケジュール曜日セレクター（スマホ用）
   ------------------------------------------ */
const scheduleData = {
  '月': [
    { time: '18:00〜19:00', name: 'キッズクラス',              color: 'beginner' },
    { time: '19:30〜21:00', name: 'キックボクシングクラス',    color: 'kick'     }
  ],
  '火': [
    { time: '18:00〜19:00', name: 'ビギナーキックボクシング',  color: 'beginner' },
    { time: '19:30〜21:00', name: '女性クラス',                color: 'women'    }
  ],
  '水': [
    { time: '18:00〜19:00', name: 'キッズクラス',              color: 'beginner' },
    { time: '19:30〜21:00', name: 'キックボクシングクラス',    color: 'kick'     }
  ],
  '木': [
    { time: '18:00〜19:00', name: 'ビギナーキックボクシング',  color: 'beginner' },
    { time: '19:30〜21:00', name: '女性クラス',                color: 'women'    }
  ],
  '金': [
    { time: '18:00〜19:00', name: 'キッズクラス',              color: 'beginner' },
    { time: '19:30〜21:00', name: 'キックボクシングクラス',    color: 'kick'     }
  ],
  '土': [
    { time: '10:00〜13:00', name: 'オープンマット（フリー）',  color: 'open'     }
  ],
  '日': [
    { time: '10:00〜13:00', name: 'オープンマット（フリー）',  color: 'open'     }
  ]
};

function renderDaySchedule(day) {
  const view = document.getElementById('scheduleDayView');
  if (!view) return;
  const classes = scheduleData[day];
  if (!classes || classes.length === 0) {
    view.innerHTML = '<p class="no-class">この日はお休みです。</p>';
    return;
  }
  // textContentを使って安全にレンダリング（XSS対策）
  view.innerHTML = '';
  classes.forEach(c => {
    const item = document.createElement('div');
    item.className = 'schedule-day-item class-' + c.color;
    const time = document.createElement('span');
    time.className = 'schedule-day-time';
    time.textContent = c.time;
    const name = document.createElement('span');
    name.className = 'schedule-day-name';
    name.textContent = c.name;
    item.appendChild(time);
    item.appendChild(name);
    view.appendChild(item);
  });
}

const dayBtns = document.querySelectorAll('.day-btn');
if (dayBtns.length > 0) {
  renderDaySchedule('月');
  dayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDaySchedule(btn.dataset.day);
    });
  });
}

/* ------------------------------------------
   8d. スケジュール：クラスハイライト＆アコーディオン
   ------------------------------------------ */
(function() {
  const cards = document.querySelectorAll('.schedule-card');
  const classes = document.querySelectorAll('.sc-class');
  if (cards.length === 0) return;

  function isMobile() {
    return window.innerWidth <= 767;
  }

  // クラスアイテムのクリックハイライト
  classes.forEach(cls => {
    cls.addEventListener('click', (e) => {
      // スマホでのアコーディオン誤作動を防ぐ（ヘッダークリックではない）
      const wasSelected = cls.classList.contains('selected');
      // 全解除
      classes.forEach(c => c.classList.remove('selected'));
      // 同じものをクリックした場合は解除だけ、違うものなら選択
      if (!wasSelected) cls.classList.add('selected');
    });
  });

  // アコーディオン（スマホ用）：曜日ヘッダーをタップして開閉
  cards.forEach(card => {
    const header = card.querySelector('.schedule-card-header');
    if (!header) return;
    header.addEventListener('click', () => {
      if (!isMobile()) return;
      const isOpen = card.classList.contains('open');
      cards.forEach(c => c.classList.remove('open'));
      if (!isOpen) card.classList.add('open');
    });
  });

  // 初期状態：スマホなら今日の曜日のカードを開く（なければ月曜）
  function openTodayOrFirst() {
    if (!isMobile()) return;
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const todayName = dayNames[new Date().getDay()] + '曜日';
    let target = Array.from(cards).find(c => {
      const h = c.querySelector('.schedule-card-header');
      return h && h.textContent.trim() === todayName;
    });
    if (!target) target = cards[0];
    target.classList.add('open');
  }

  openTodayOrFirst();
})();

/* ------------------------------------------
   9. カテゴリー絞り込みフィルター（news.html）
   ボタンをクリックしてカテゴリーで記事を絞り込む
   ------------------------------------------ */
const filterBtns = document.querySelectorAll('.filter-btn');
const articles = document.querySelectorAll('.news-article');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      // ボタンのアクティブ状態を切り替え
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 記事の表示・非表示を切り替え
      articles.forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
          article.classList.remove('hidden');
        } else {
          article.classList.add('hidden');
        }
      });
    });
  });
}

/* ------------------------------------------
   10. フォームバリデーション＆送信処理（contact.html）
   必須項目のチェックと送信完了メッセージの表示
   ------------------------------------------ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;

    // エラーメッセージをリセット
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // お名前チェック
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      document.getElementById('error-name').textContent = 'お名前を入力してください。';
      isValid = false;
    }

    // メールアドレスチェック
    const email = document.getElementById('email');
    if (!email.value.trim()) {
      document.getElementById('error-email').textContent = 'メールアドレスを入力してください。';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value)) {
      document.getElementById('error-email').textContent = '正しいメールアドレスを入力してください。';
      isValid = false;
    }

    // お問い合わせ種別チェック
    const type = document.getElementById('type');
    if (!type.value) {
      document.getElementById('error-type').textContent = 'お問い合わせ種別を選択してください。';
      isValid = false;
    }

    // 個人情報同意チェック
    const agree = document.getElementById('agree');
    if (!agree.checked) {
      document.getElementById('error-agree').textContent = '個人情報の取り扱いへの同意が必要です。';
      isValid = false;
    }

    if (!isValid) return;

    // Formspreeへ非同期送信
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        const successMsg = document.getElementById('formSuccess');
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        contactForm.reset();
      } else {
        const data = await response.json();
        const msg = data.errors ? data.errors.map(e => e.message).join(', ') : '送信に失敗しました。';
        alert('エラー：' + msg + '\n時間をおいて再度お試しください。');
      }
    } catch {
      alert('送信に失敗しました。ネットワーク接続を確認してください。');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '送信する';
    }
  });
}

/* ------------------------------------------
   プライバシーポリシーモーダル
   ------------------------------------------ */
const privacyModal = document.getElementById('privacyModal');
if (privacyModal) {
  const openBtn = document.getElementById('openPrivacy');
  const closeBtn = document.getElementById('closePrivacy');
  const closeFooterBtn = document.getElementById('closePrivacyBtn');

  function openModal() {
    privacyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    privacyModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // フォーカストラップ（モーダル内だけでTabキーが循環する）
  const focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  function trapFocus(e) {
    const els = Array.from(privacyModal.querySelectorAll(focusable)).filter(el => !el.disabled);
    const first = els[0];
    const last = els[els.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    if (e.key === 'Escape') closeModal();
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  closeFooterBtn.addEventListener('click', closeModal);
  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) closeModal();
  });

  privacyModal.addEventListener('keydown', trapFocus);

  // openModal後に最初のフォーカス可能要素へフォーカス移動
  const _openModal = openModal;
  openModal = function() {
    _openModal();
    const els = Array.from(privacyModal.querySelectorAll(focusable)).filter(el => !el.disabled);
    if (els.length) els[0].focus();
  };
  openBtn.removeEventListener('click', _openModal);
  openBtn.addEventListener('click', openModal);
}

/* ------------------------------------------
   スポンサーフォームバリデーション（sponsor.html）
   ------------------------------------------ */
const sponsorForm = document.getElementById('sponsorForm');
if (sponsorForm) {
  sponsorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll('[id^="sp-error"]').forEach(el => el.textContent = '');

    const spName = document.getElementById('sp-name');
    if (!spName.value.trim()) {
      document.getElementById('sp-error-name').textContent = '担当者名を入力してください。';
      isValid = false;
    }

    const spEmail = document.getElementById('sp-email');
    if (!spEmail.value.trim()) {
      document.getElementById('sp-error-email').textContent = 'メールアドレスを入力してください。';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(spEmail.value)) {
      document.getElementById('sp-error-email').textContent = '正しいメールアドレスを入力してください。';
      isValid = false;
    }

    const spMessage = document.getElementById('sp-message');
    if (!spMessage.value.trim()) {
      document.getElementById('sp-error-message').textContent = 'お問い合わせ内容を入力してください。';
      isValid = false;
    }

    const spAgree = document.getElementById('sp-agree');
    if (!spAgree.checked) {
      document.getElementById('sp-error-agree').textContent = '個人情報の取り扱いへの同意が必要です。';
      isValid = false;
    }

    if (isValid) {
      const successMsg = document.getElementById('sponsorFormSuccess');
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      sponsorForm.reset();
    }
  });
}
