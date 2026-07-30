[README.md](https://github.com/user-attachments/files/30556304/README.md)
# Simulador de Taxas — Vero × ZAZ Vendas

Ferramenta comercial para simular taxas da Vero (Banrisul), comparar com concorrentes, gerar propostas em PDF e consultar dados de CNPJ — tudo direto do navegador, sem instalar nada.

🔗 **Acesse:** [patrickrlima.github.io/Simulador-Vero](https://patrickrlima.github.io/Simulador-Vero/)

---

## O que essa ferramenta faz

- 📊 **Simulação de taxas** de 1x a 18x, para todas as bandeiras (Visa/Mastercard, Elo, Cabal, VerdeCard, Banricard, Banricompras, PIX)
- ⚔️ **Comparação com o concorrente** (ou entre planos Vero diferentes), com "ponto de equilíbrio" mostrando a partir de qual parcela a Vero compensa mais
- 📈 **Projeção de faturamento mensal**, não só uma venda isolada — mostra o ganho real projetado com base no mix de vendas do cliente
- 🔍 **Consulta automática de CNPJ** (dados públicos da Receita Federal), incluindo aviso se o cliente é MEI, Simples Nacional ou outro regime — pra já saber se dá pra emitir o CCMEI
- 📄 **Geração de proposta em PDF**, com controle total do que entra nela (parcelas, comparativo, projeção mensal, bandeiras específicas) — cada vendedor decide o que mostrar
- 💬 **Envio direto por WhatsApp**, anexando o PDF automaticamente no celular
- 📱 **Instalável como aplicativo** (PWA) — funciona offline, com ícone próprio na tela inicial

## Como usar

1. Abre o link acima no celular ou computador
2. Na primeira vez, aparece um guia rápido explicando cada ferramenta (pode reabrir a qualquer momento pelo botão **"Como Usar"**)
3. Preenche o faturamento e escolhe o plano do cliente
4. Simula a venda, compara com o concorrente, e gera a proposta

### Instalando como app no celular

No Chrome (Android) ou Safari (iPhone), deve aparecer um aviso de "Instalar aplicativo" — ou use o botão flutuante que aparece no canto da tela. Depois de instalado, funciona com ícone próprio, tela cheia, sem precisar abrir o navegador toda vez.

## Atualizando o projeto

Esse repositório **não usa nenhum processo de build** — o que está aqui é exatamente o que roda no site. Pra atualizar:

1. Edita o arquivo direto pelo GitHub (ícone de lápis) ou sobe um novo via **Add file → Upload files**
2. O GitHub Pages publica sozinho em 1-2 minutos
3. Quem já tem o app instalado recebe a atualização automaticamente na próxima vez que abrir

## Arquivos do projeto

| Arquivo | O que é |
|---|---|
| `index.html` | O app inteiro (HTML, CSS e JavaScript num arquivo só) |
| `manifest.json` | Configuração do PWA (nome, ícone, cores) |
| `sw.js` | Service worker — permite instalar e funcionar offline |
| `pwa-install.js` | Botão de instalação do app |
| `icon-*.png`, `favicon-*.png` | Ícones do app |

## Tecnologia

HTML, CSS e JavaScript puro — sem framework, sem etapa de compilação. Usa:
- [BrasilAPI](https://brasilapi.com.br/) para consulta de CNPJ
- [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) para gerar o PDF
- Web Share API para o envio direto pelo WhatsApp no celular

---

Desenvolvido para a equipe comercial da **ZAZ Vendas**, promotora oficial da **Vero (Banrisul)**.
