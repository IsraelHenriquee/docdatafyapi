// Playground (Try it): lembra phone_number_id e waba_id entre aberturas e páginas,
// como o Mintlify já faz com o token. O valor fica só no localStorage de quem usa.
(() => {
  const CAMPOS = ['phone_number_id', 'waba_id']
  const chave = (campo) => `datafy-playground:${campo}`
  const setValor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set

  const campoDoInput = (el) => {
    if (!(el instanceof HTMLInputElement)) return null
    const placeholder = el.getAttribute('placeholder') || ''
    return CAMPOS.find((campo) => placeholder === `enter ${campo}`) || null
  }

  const ler = (campo) => {
    try { return localStorage.getItem(chave(campo)) || '' } catch { return '' }
  }

  const gravar = (campo, valor) => {
    try {
      if (valor) localStorage.setItem(chave(campo), valor)
      else localStorage.removeItem(chave(campo))
    } catch {}
  }

  // Salva enquanto a pessoa digita; campo apagado remove o valor salvo.
  document.addEventListener('input', (evento) => {
    const campo = campoDoInput(evento.target)
    if (campo) gravar(campo, evento.target.value.trim())
  }, true)

  // Preenche o campo uma única vez quando ele aparece vazio no playground.
  const restaurar = (el) => {
    const campo = campoDoInput(el)
    if (!campo || el.dataset.datafyRestaurado) return
    el.dataset.datafyRestaurado = '1'
    const salvo = ler(campo)
    if (!salvo || el.value) return
    setValor.call(el, salvo)
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }

  const varrer = (raiz) => raiz.querySelectorAll?.('input[placeholder^="enter "]').forEach(restaurar)

  new MutationObserver((mutacoes) => {
    for (const mutacao of mutacoes) {
      for (const no of mutacao.addedNodes) {
        if (no.nodeType !== 1) continue
        if (no.matches?.('input')) restaurar(no)
        varrer(no)
      }
    }
  }).observe(document.body, { childList: true, subtree: true })

  varrer(document)
})()
