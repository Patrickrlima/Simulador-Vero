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
    + 'display:none;align-items:center;font-family:inherit;cursor:pointer;'
    + 'font-weight:500;font-size:15px;padding:0.75em 1.4em 0.75em 1.1em;color:#fff;'
    + 'background:linear-gradient(0deg,rgba(77,54,208,1) 0%,rgba(132,116,254,1) 100%);'
    + 'border:none;box-shadow:0 0.7em 1.5em -0.5em #4d36d0be;letter-spacing:.05em;'
    + 'border-radius:20em;transition:box-shadow .2s,transform .2s}'
    + '#pwa-install-btn:hover{box-shadow:0 0.5em 1.5em -0.5em #4d36d0be;transform:translateY(-2px)}'
    + '#pwa-install-btn:active{box-shadow:0 0.3em 1em -0.5em #4d36d0be;transform:translateY(0)}'
    + '#pwa-install-btn svg{margin-right:8px;flex-shrink:0}'
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
  btn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M12 3v13"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/>'
    + '</svg> Instalar App';
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
