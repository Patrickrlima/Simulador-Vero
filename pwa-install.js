/* PWA Install — ZAZ Vendas
   Registra o service worker e mostra um botão flutuante "Instalar App"
   quando o navegador emite o beforeinstallprompt (Android/Chrome/Edge).
   Em iOS mostra instruções manuais (Compartilhar → Adicionar à Tela de Início). */

(function () {
  // 1) Registrar o service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function (e) {
        console.warn('SW registration failed:', e);
      });
    });
  }

  // 2) Criar botão de instalação (fica escondido até estar disponível)
  var style = document.createElement('style');
  style.textContent = ''
    + '#pwa-install-btn{position:fixed;right:16px;bottom:16px;z-index:99999;'
    + 'display:none;align-items:center;gap:8px;padding:12px 18px;border:none;'
    + 'border-radius:999px;background:#5B21B6;color:#fff;font-weight:700;'
    + 'font-size:14px;box-shadow:0 6px 20px rgba(91,33,182,.4);cursor:pointer;'
    + 'font-family:inherit}'
    + '#pwa-install-btn:hover{background:#4c1d95}'
    + '#pwa-install-btn .ic{font-size:18px;line-height:1}'
    + '#pwa-install-btn.show{display:inline-flex}'
    + '#pwa-ios-hint{position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;'
    + 'display:none;background:#fff;color:#222;border:1px solid #e5e7eb;'
    + 'border-radius:14px;padding:14px 16px;box-shadow:0 10px 30px rgba(0,0,0,.15);'
    + 'font-size:13px;line-height:1.4;font-family:inherit}'
    + '#pwa-ios-hint b{color:#5B21B6}'
    + '#pwa-ios-hint .close{position:absolute;top:6px;right:10px;background:none;'
    + 'border:none;font-size:20px;cursor:pointer;color:#888}'
    + '#pwa-ios-hint.show{display:block}';
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.id = 'pwa-install-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Instalar aplicativo');
  btn.innerHTML = '<span class="ic">\u2B07\uFE0F</span> Instalar App';
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);
  });

  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    btn.classList.add('show');
  });

  btn.addEventListener('click', function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      btn.classList.remove('show');
    });
  });

  window.addEventListener('appinstalled', function () {
    btn.classList.remove('show');
    deferredPrompt = null;
  });

  // 3) iOS não emite beforeinstallprompt — mostra instrução manual
  function isIos() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }
  function isInStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
        || window.navigator.standalone === true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (isIos() && !isInStandalone() && !localStorage.getItem('pwa-ios-hint-dismissed')) {
      var hint = document.createElement('div');
      hint.id = 'pwa-ios-hint';
      hint.innerHTML =
        '<button class="close" aria-label="Fechar">&times;</button>' +
        '<b>\uD83D\uDCF2 Instale no iPhone:</b> toque em ' +
        '<b>Compartilhar</b> \u2794 <b>Adicionar \u00E0 Tela de In\u00EDcio</b>.';
      document.body.appendChild(hint);
      // Aparece depois de 1.5s pra não atrapalhar o load
      setTimeout(function () { hint.classList.add('show'); }, 1500);
      hint.querySelector('.close').addEventListener('click', function () {
        hint.classList.remove('show');
        localStorage.setItem('pwa-ios-hint-dismissed', '1');
      });
    }
  });
})();
