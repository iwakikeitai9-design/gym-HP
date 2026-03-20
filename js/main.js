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

/* ------------------------------------------
   8. トレーナー紹介スライダー（Swiper.js v11 / about.html）
   ------------------------------------------ */
if (document.querySelector('.trainer-swiper')) {
  new Swiper('.trainer-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    breakpoints: {
      // タブレット以上では2枚並び
      768: {
        slidesPerView: 2,
      },
      // PC以上では3枚並び
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

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
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ページのリロードを止める

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
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

    // すべてのバリデーションが通った場合
    if (isValid) {
      const successMsg = document.getElementById('formSuccess');
      successMsg.style.display = 'block';
      // フォームのトップへスクロール
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      contactForm.reset();
    }
  });
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
