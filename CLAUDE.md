# Diretrizes de Design e Desenvolvimento — Coa

## FILOSOFIA DE DESIGN (PRIORIDADE MÁXIMA)
- Minimalismo absoluto — cada elemento na tela deve ter uma razão clara para existir
- Uma funcionalidade principal por tela — tudo que não serve à ação principal deve ser removido
- Menos é mais: se uma informação pode ser omitida sem prejudicar o uso, ela deve ser omitida
- Nunca adicionar elementos decorativos, banners, badges ou informações extras por padrão
- Hierarquia de decisão para cada elemento: "o usuário precisa disso agora?" — se a resposta não for sim imediato, remover
- Espaço em branco é parte do design, não ausência de design — usar generosamente
- Primeira versão sempre com o mínimo — adicionar complexidade apenas se explicitamente solicitado

## FUNDAMENTOS VISUAIS
- Nunca usar degradê, gradientes ou efeitos de glassmorphism
- Bordas suaves com border-radius consistente com o design system
- Sombras sutis apenas para elevação real (modais, dropdowns, cards flutuantes)
- Espaçamento generoso — usar sempre múltiplos de 4px (8, 12, 16, 24, 32, 48, 64)
- Hierarquia visual clara: um elemento principal por tela recebe destaque, o resto é suporte

## CORES
- Usar sempre as variáveis CSS do design system (--primary, --secondary, etc)
- Nunca hardcodar cores hex diretamente no código
- Textos sobre fundo claro: mínimo de contraste 4.5:1
- Textos sobre fundo escuro: mínimo de contraste 4.5:1

## TIPOGRAFIA
- Usar exclusivamente a tipografia Inter já configurada no design system — nunca sobrescrever tamanhos, pesos ou line-heights
- Nunca importar a fonte Inter separadamente — ela já está definida no design system
- Nunca hardcodar valores de fonte no código — usar sempre as variáveis e classes do design system
- Nunca usar texto em maiúsculas em parágrafos

## ACESSIBILIDADE (WCAG 2.1 AA obrigatório)
- Todo input deve ter label associado via htmlFor
- Todo ícone decorativo deve ter aria-hidden="true"
- Todo ícone funcional deve ter aria-label descritivo
- Imagens sempre com alt descritivo ou alt="" se decorativas
- Botões sempre com texto descritivo — nunca apenas ícone sem label
- Ordem de foco lógica seguindo a leitura natural da tela
- Nunca remover outline de foco — apenas estilizar com as cores do design system
- Componentes interativos com área de clique mínima de 44x44px

## LAYOUT E COMPOSIÇÃO
- Layouts baseados em grid de 12 colunas
- Conteúdo principal com max-width de 1280px centralizado
- Sidebar quando houver navegação lateral: 240-280px de largura
- Mobile first — todos os componentes devem ser responsivos
- Nunca usar posição absoluta para layout principal — usar flexbox ou grid

## REALISMO E MODERNIDADE
- Usar dados fictícios realistas (nomes, emails, valores, datas reais)
- Nunca usar placeholder como "Lorem ipsum" — criar conteúdo contextual
- Estados reais: loading, empty state, error state e success state em todos os componentes
- Micro-interações: hover states, active states e transitions de 150-200ms
- Densidade de informação equilibrada — nem telas vazias nem sobrecarregadas
- Componentes com variações reais: botão com ícone, sem ícone, loading, disabled

## ESTRUTURA DE ARQUIVOS
- Cada tela em sua própria pasta dentro de app/
- Componentes reutilizáveis em components/
- Nunca duplicar código — extrair componente se usado mais de uma vez
- Nomear arquivos em kebab-case: minha-tela.tsx
