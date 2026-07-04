/* NNAI Chat — a "talking website" AI assistant widget.
   Self-contained, no dependencies. Auto-themes from host page CSS vars (--acc, --surface, etc).
   The visitor injects their own API key on-screen (stored ONLY in their browser, localStorage).
   Providers: Google Gemini (default), OpenAI, Anthropic, or any OpenAI-compatible endpoint.

   Usage (after the file is loaded):
     NNAIChat.init({
       brand:"Khalid Rind — NeuraNest AI",
       url:"https://khalidrind.io",
       desc:"...what the brand does...",
       services:"...service list with prices...",
       email:"info@nnai.com.au",
       contactName:"Khalid",
       greeting:"Hi! Ask me anything about..."
     });
*/
(function () {
  const LS = { prov: 'nnc_provider', key: 'nnc_key', model: 'nnc_model', ep: 'nnc_endpoint' };
  // Model is AUTO (always-latest aliases). Model name is never shown to the visitor.
  const DEFAULT_MODELS = {
    gemini: 'gemini-flash-latest',
    openai: 'gpt-4o-mini',
    anthropic: 'claude-3-5-haiku-latest',
    custom: 'gpt-4o-mini'
  };
  // Self-heal retired/deprecated models saved in a visitor's browser (e.g. gemini-1.5-flash was
  // retired by Google — the cause of "couldn't reach the AI" even with a valid fresh key).
  const DEPRECATED = /gemini-1\.5|gemini-1\.0|gemini-pro$|text-bison|gpt-3\.5|claude-3-haiku|claude-2/i;
  function healModel(prov, m) { return (!m || DEPRECATED.test(m)) ? (DEFAULT_MODELS[prov] || m) : m; }

  function esc(s) { return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function fmt(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'); }
  function get(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function init(cfg) {
    if (window.__nncMounted) return;
    window.__nncMounted = true;
    cfg = cfg || {};
    const brand = cfg.brand || 'Our AI Assistant';
    const greeting = cfg.greeting || ("Hi! I'm the AI assistant for " + brand + ". How can I help?");

    const system =
      "You are the friendly, sharp AI assistant for " + brand + " (" + (cfg.url || '') + "). " +
      (cfg.desc || '') + " " +
      "You represent the brand warmly and knowledgeably — like a switched-on team member who knows the founder, the story, the services and the products. " +
      "Answer visitor enquiries clearly and briefly — 2 to 4 sentences, warm and professional, never salesy or robotic. " +
      "Services and pricing you can quote: " + (cfg.services || 'ask the visitor to contact us for details.') + " " +
      (cfg.products ? ("Products available: " + cfg.products + " ") : "") +
      "When someone asks a current, factual or local question (e.g. 'near me', a place, opening context), you may use live Google Search grounding to answer accurately — never guess. " +
      "Never invent prices or facts beyond what is given here. If you are unsure, say so and offer to connect them with " + (cfg.contactName || 'the team') + " at " + (cfg.email || '') + ". " +
      "When a visitor seems ready to proceed, warmly guide them to email " + (cfg.email || 'us') + ".";

    // ---- styles ----
    const style = document.createElement('style');
    style.textContent = `
    .nnc-fab{position:fixed;right:24px;bottom:24px;z-index:2147483000;width:60px;height:60px;border-radius:50%;
      background:var(--acc,#4F46E5);color:#fff;border:none;cursor:pointer;display:grid;place-items:center;
      box-shadow:0 14px 34px -10px rgba(0,0,0,.45);transition:transform .3s cubic-bezier(.16,1,.3,1),opacity .3s;}
    .nnc-fab:hover{transform:scale(1.07);}
    .nnc-fab svg{width:26px;height:26px;}
    .nnc-fab .x{display:none;}
    .nnc-open .nnc-fab .b{display:none;} .nnc-open .nnc-fab .x{display:block;}
    .nnc-panel{position:fixed;right:24px;bottom:96px;z-index:2147483000;width:380px;max-width:calc(100vw - 32px);
      height:560px;max-height:calc(100vh - 130px);background:var(--surface,#fff);color:var(--ink,#14151A);
      border:1px solid var(--line,#e5e5e5);border-radius:20px;box-shadow:0 40px 90px -30px rgba(0,0,0,.5);
      display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(12px) scale(.98);
      pointer-events:none;transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1);
      font-family:var(--fb,system-ui,sans-serif);}
    .nnc-open .nnc-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}
    .nnc-head{display:flex;align-items:center;gap:10px;padding:16px 18px;border-bottom:1px solid var(--line,#eee);}
    .nnc-dot{width:9px;height:9px;border-radius:50%;background:var(--acc,#4F46E5);box-shadow:0 0 10px var(--acc,#4F46E5);flex:none;}
    .nnc-title{font-family:var(--fd,inherit);font-weight:700;font-size:15px;letter-spacing:-.01em;line-height:1.2;}
    .nnc-sub{font-size:11px;color:var(--dim,#777);}
    .nnc-head .sp{flex:1;}
    .nnc-ico{width:32px;height:32px;border-radius:9px;border:1px solid var(--line,#eee);background:transparent;
      color:var(--dim,#777);cursor:pointer;display:grid;place-items:center;transition:all .25s;}
    .nnc-ico:hover{color:var(--acc,#4F46E5);border-color:var(--acc,#4F46E5);}
    .nnc-ico svg{width:16px;height:16px;}
    .nnc-body{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px;}
    .nnc-msg{max-width:85%;padding:11px 14px;border-radius:14px;font-size:14px;line-height:1.5;}
    .nnc-user{align-self:flex-end;background:var(--acc,#4F46E5);color:#fff;border-bottom-right-radius:4px;}
    .nnc-bot{align-self:flex-start;background:var(--neutral,#f0f0f0);color:var(--ink,#111);border-bottom-left-radius:4px;}
    .nnc-err{align-self:flex-start;background:#fdecea;color:#8a1c14;font-size:13px;border-radius:12px;padding:10px 13px;}
    .nnc-typing{align-self:flex-start;display:flex;gap:4px;padding:12px 14px;background:var(--neutral,#f0f0f0);border-radius:14px;}
    .nnc-typing i{width:6px;height:6px;border-radius:50%;background:var(--dim,#999);animation:nncb 1s infinite;}
    .nnc-typing i:nth-child(2){animation-delay:.15s;} .nnc-typing i:nth-child(3){animation-delay:.3s;}
    @keyframes nncb{0%,60%,100%{opacity:.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-3px);}}
    .nnc-foot{padding:12px;border-top:1px solid var(--line,#eee);display:flex;gap:8px;align-items:flex-end;}
    .nnc-in{flex:1;resize:none;border:1px solid var(--line,#ddd);border-radius:12px;padding:11px 12px;font:inherit;
      font-size:14px;color:var(--ink,#111);background:var(--bg,#fafafa);max-height:110px;outline:none;}
    .nnc-in:focus{border-color:var(--acc,#4F46E5);}
    .nnc-send{flex:none;width:42px;height:42px;border-radius:11px;border:none;background:var(--acc,#4F46E5);color:#fff;
      cursor:pointer;display:grid;place-items:center;transition:transform .2s,opacity .2s;}
    .nnc-send:hover{transform:scale(1.06);} .nnc-send:disabled{opacity:.4;cursor:default;transform:none;}
    .nnc-send svg{width:18px;height:18px;}
    .nnc-note{font-size:10.5px;color:var(--dim,#999);text-align:center;padding:0 12px 10px;}
    .nnc-settings{position:absolute;inset:0;background:var(--surface,#fff);z-index:5;display:none;flex-direction:column;padding:18px;overflow-y:auto;}
    .nnc-settings.on{display:flex;}
    .nnc-settings h4{font-family:var(--fd,inherit);font-size:15px;margin-bottom:4px;}
    .nnc-settings p{font-size:12px;color:var(--dim,#777);margin-bottom:16px;}
    .nnc-field{margin-bottom:14px;}
    .nnc-field label{display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--ink,#111);}
    .nnc-field input,.nnc-field select{width:100%;border:1px solid var(--line,#ddd);border-radius:10px;padding:10px 11px;
      font:inherit;font-size:13px;background:var(--bg,#fafafa);color:var(--ink,#111);outline:none;}
    .nnc-field input:focus,.nnc-field select:focus{border-color:var(--acc,#4F46E5);}
    .nnc-help{font-size:11px;color:var(--dim,#888);margin-top:5px;}
    .nnc-help a{color:var(--acc,#4F46E5);}
    .nnc-save{margin-top:auto;background:var(--acc,#4F46E5);color:#fff;border:none;border-radius:11px;padding:13px;
      font:inherit;font-weight:600;font-size:14px;cursor:pointer;}
    @media(max-width:520px){.nnc-panel{right:8px;left:8px;width:auto;bottom:88px;height:calc(100vh - 110px);}
      .nnc-fab{right:16px;bottom:16px;}}
    `;
    document.head.appendChild(style);

    // ---- DOM ----
    const root = document.createElement('div');
    root.innerHTML = `
      <button class="nnc-fab" aria-label="Open chat">
        <svg class="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        <svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <div class="nnc-panel" role="dialog" aria-label="AI assistant">
        <div class="nnc-head">
          <span class="nnc-dot"></span>
          <div><div class="nnc-title">${esc(brand)}</div><div class="nnc-sub">AI assistant &middot; live</div></div>
          <span class="sp"></span>
          <button class="nnc-ico nnc-gear" title="AI settings" aria-label="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></button>
        </div>
        <div class="nnc-body"></div>
        <div class="nnc-foot">
          <textarea class="nnc-in" rows="1" placeholder="Ask about services, pricing..."></textarea>
          <button class="nnc-send" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button>
        </div>
        <div class="nnc-note">Your API key stays in your browser. Powered by your chosen AI model.</div>
        <div class="nnc-settings">
          <h4>Connect an AI model</h4>
          <p>Paste an API key to make this assistant live. The key is stored only in this browser.</p>
          <div class="nnc-field"><label>Provider</label>
            <select class="nnc-prov">
              <option value="gemini">Google Gemini (recommended)</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="custom">Custom (OpenAI-compatible)</option>
            </select></div>
          <div class="nnc-field"><label>API key</label><input class="nnc-key" type="password" placeholder="Paste your API key" autocomplete="off" />
            <div class="nnc-help nnc-keyhelp"></div></div>
          <input class="nnc-model" type="hidden" />
          <div class="nnc-field nnc-epwrap" style="display:none;"><label>Endpoint URL</label><input class="nnc-ep" type="text" placeholder="https://.../v1/chat/completions" /></div>
          <button class="nnc-save">Save &amp; start chatting</button>
        </div>
      </div>`;
    document.body.appendChild(root);

    const $ = s => root.querySelector(s);
    const fab = $('.nnc-fab'), body = $('.nnc-body'), input = $('.nnc-in'), send = $('.nnc-send'),
      settings = $('.nnc-settings'), provSel = $('.nnc-prov'), keyIn = $('.nnc-key'),
      modelIn = $('.nnc-model'), epIn = $('.nnc-ep'), epWrap = $('.nnc-epwrap'), keyHelp = $('.nnc-keyhelp');

    const KEYHELP = {
      gemini: 'Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>',
      openai: 'Get a key at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">platform.openai.com</a>',
      anthropic: 'Get a key at <a href="https://console.anthropic.com/" target="_blank" rel="noopener">console.anthropic.com</a>',
      custom: 'Works with OpenRouter, Groq, Together, local LLMs — any OpenAI-compatible endpoint.'
    };

    const history = [];
    let busy = false;

    function open() { document.documentElement.classList.add('nnc-open'); if (!history.length) botSay(greeting); setTimeout(() => input.focus(), 300); }
    function close() { document.documentElement.classList.remove('nnc-open'); }
    fab.addEventListener('click', () => document.documentElement.classList.contains('nnc-open') ? close() : open());

    function scroll() { body.scrollTop = body.scrollHeight; }
    function botSay(t) { const d = document.createElement('div'); d.className = 'nnc-msg nnc-bot'; d.innerHTML = fmt(t); body.appendChild(d); scroll(); return d; }
    function userSay(t) { const d = document.createElement('div'); d.className = 'nnc-msg nnc-user'; d.textContent = t; body.appendChild(d); scroll(); }
    function errSay(t) { const d = document.createElement('div'); d.className = 'nnc-err'; d.innerHTML = fmt(t); body.appendChild(d); scroll(); }
    function typing() { const d = document.createElement('div'); d.className = 'nnc-typing'; d.innerHTML = '<i></i><i></i><i></i>'; body.appendChild(d); scroll(); return d; }

    // ---- settings ----
    function loadSettings() {
      provSel.value = get(LS.prov) || 'gemini';
      keyIn.value = get(LS.key);
      modelIn.value = healModel(provSel.value, get(LS.model)) || DEFAULT_MODELS[provSel.value];
      epIn.value = get(LS.ep);
      syncProv();
    }
    function syncProv() {
      keyHelp.innerHTML = KEYHELP[provSel.value] || '';
      epWrap.style.display = provSel.value === 'custom' ? 'block' : 'none';
      if (!modelIn.value || Object.values(DEFAULT_MODELS).includes(modelIn.value)) modelIn.value = DEFAULT_MODELS[provSel.value];
    }
    provSel.addEventListener('change', syncProv);
    $('.nnc-gear').addEventListener('click', () => { loadSettings(); settings.classList.add('on'); });
    $('.nnc-save').addEventListener('click', () => {
      set(LS.prov, provSel.value); set(LS.key, keyIn.value.trim());
      set(LS.model, modelIn.value.trim() || DEFAULT_MODELS[provSel.value]); set(LS.ep, epIn.value.trim());
      settings.classList.remove('on');
      botSay("Great — I'm connected. Ask me anything about " + brand + ".");
    });

    // ---- providers ----
    async function callAI(userMsg) {
      const prov = get(LS.prov) || 'gemini';
      const key = get(LS.key);
      const model = healModel(prov, get(LS.model));
      if (!key) { settings.classList.add('on'); loadSettings(); throw { soft: true }; }
      const hist = history.slice(-10);
      if (prov === 'gemini') {
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(key);
        const contents = hist.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
        contents.push({ role: 'user', parts: [{ text: userMsg }] });
        const baseBody = { systemInstruction: { parts: [{ text: system }] }, contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 500 } };
        // Try WITH live Google Search grounding; if the key's project doesn't allow the tool,
        // transparently retry WITHOUT it so the chat still answers.
        async function ask(withTools) {
          const body = withTools ? Object.assign({ tools: [{ google_search: {} }] }, baseBody) : baseBody;
          const rr = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
          return { rr, jj: await rr.json() };
        }
        let { rr: r, jj: j } = await ask(true);
        if (!r.ok && /tool|google_search|grounding|not supported|INVALID_ARGUMENT/i.test((j.error && j.error.message) || '')) {
          ({ rr: r, jj: j } = await ask(false));
        }
        if (!r.ok) throw new Error(j.error && j.error.message || 'Request failed');
        var cand = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts;
        return (cand && cand.map(function (p) { return p.text || ''; }).join('').trim()) || "Sorry, I couldn't answer that.";
      }
      if (prov === 'anthropic') {
        const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
          body: JSON.stringify({ model, max_tokens: 500, system, messages: hist.concat([{ role: 'user', content: userMsg }]) }) });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error && j.error.message || 'Request failed');
        return (j.content && j.content[0] && j.content[0].text) || "Sorry, I couldn't answer that.";
      }
      // openai + custom (OpenAI-compatible)
      const endpoint = prov === 'custom' ? (get(LS.ep) || '') : 'https://api.openai.com/v1/chat/completions';
      if (!endpoint) throw new Error('Please set an endpoint URL in settings.');
      const msgs = [{ role: 'system', content: system }].concat(hist).concat([{ role: 'user', content: userMsg }]);
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
        body: JSON.stringify({ model, messages: msgs, temperature: 0.6, max_tokens: 500 }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error && j.error.message || 'Request failed');
      return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "Sorry, I couldn't answer that.";
    }

    async function submit() {
      const text = input.value.trim();
      if (!text || busy) return;
      input.value = ''; input.style.height = 'auto';
      userSay(text); history.push({ role: 'user', content: text });
      busy = true; send.disabled = true;
      const t = typing();
      try {
        const reply = await callAI(text);
        t.remove();
        botSay(reply); history.push({ role: 'assistant', content: reply });
      } catch (e) {
        t.remove();
        if (e && e.soft) botSay("First, connect an AI model — paste your API key in settings (the gear icon), then ask away.");
        else errSay("**Couldn't reach the AI.** " + (e && e.message ? e.message : 'Check your API key in settings (gear icon).'));
      } finally { busy = false; send.disabled = false; input.focus(); }
    }
    send.addEventListener('click', submit);
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
    input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 110) + 'px'; });
  }

  window.NNAIChat = { init };
})();
