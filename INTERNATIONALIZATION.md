# Sistema de Internacionalização (i18n)

Este projeto agora suporta múltiplos idiomas usando o **next-intl**, a solução mais moderna para internacionalização no Next.js 14+.

## 🌍 Idiomas Suportados

- **Português (pt)** - Idioma padrão
- **English (en)** - Inglês

## 📁 Estrutura de Arquivos

```
src/
├── messages/
│   ├── pt.json          # Traduções em português
│   └── en.json          # Traduções em inglês
├── i18n.ts              # Configuração do next-intl
├── middleware.ts         # Middleware para roteamento por idioma
└── app/
    ├── [locale]/         # Páginas com suporte a idiomas
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── auth/
    │   ├── dashboard/
    │   └── ...
    └── layout.tsx        # Redireciona para /pt
```

## 🚀 Como Usar

### 1. Em Componentes Client-Side

```tsx
'use client'
import { useTranslations } from 'next-intl'

export function MyComponent() {
  const t = useTranslations('common')

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

### 2. Em Componentes Server-Side

```tsx
import { useTranslations } from 'next-intl'

export async function MyServerComponent() {
  const t = await useTranslations('common')

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

### 3. Navegação com Idiomas

```tsx
import Link from 'next/link'

// Link para a mesma página em português
<Link href="/pt/dashboard">Dashboard (PT)</Link>

// Link para a mesma página em inglês
<Link href="/en/dashboard">Dashboard (EN)</Link>
```

## 🔧 Adicionando Novas Traduções

### 1. Adicione a chave nos arquivos de tradução

**src/messages/pt.json:**
```json
{
  "common": {
    "newKey": "Nova tradução em português"
  }
}
```

**src/messages/en.json:**
```json
{
  "common": {
    "newKey": "New translation in English"
  }
}
```

### 2. Use no componente

```tsx
const t = useTranslations('common')
return <p>{t('newKey')}</p>
```

## 🌐 Seletor de Idioma

O componente `LanguageSwitcher` está disponível e pode ser usado em qualquer lugar:

```tsx
import { LanguageSwitcher } from '@/components/language-switcher'

export function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  )
}
```

## 📝 Estrutura de Traduções

As traduções estão organizadas por seções:

- `common` - Textos comuns (botões, labels, etc.)
- `navigation` - Menu de navegação
- `auth` - Páginas de autenticação
- `dashboard` - Dashboard principal
- `conversations` - Página de conversas
- `appointments` - Página de agendamentos
- `emailMarketing` - Email marketing
- `settings` - Configurações
- `chatbot` - Interface do chatbot
- `landing` - Página inicial

## 🔄 Adicionando Novo Idioma

### 1. Adicione o idioma na configuração

**src/i18n.ts:**
```typescript
const locales = ['en', 'pt', 'es'] // Adicione 'es' para espanhol
```

**src/middleware.ts:**
```typescript
locales: ['en', 'pt', 'es'],
```

### 2. Crie o arquivo de tradução

**src/messages/es.json:**
```json
{
  "common": {
    "loading": "Cargando...",
    "error": "Error",
    // ... outras traduções
  }
}
```

### 3. Adicione o idioma no seletor

**src/components/language-switcher.tsx:**
```typescript
const languages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }, // Novo idioma
]
```

## 🎯 URLs Suportadas

- `/` → Redireciona para `/pt`
- `/pt` → Página inicial em português
- `/en` → Página inicial em inglês
- `/pt/dashboard` → Dashboard em português
- `/en/dashboard` → Dashboard em inglês
- E assim por diante...

## ⚡ Performance

- As traduções são carregadas apenas quando necessário
- Suporte completo a Server Components
- Otimizado para SEO com URLs localizadas
- TypeScript nativo com autocompletar

## 🐛 Troubleshooting

### Erro: "useTranslations must be used within a NextIntlClientProvider"

Certifique-se de que o componente está dentro do layout com `NextIntlClientProvider`:

```tsx
// ✅ Correto - dentro do layout [locale]
export default function MyPage() {
  const t = useTranslations('common')
  return <div>{t('welcome')}</div>
}
```

### Erro: "Message not found"

Verifique se a chave existe nos arquivos de tradução e se está sendo usada corretamente:

```tsx
// ✅ Correto
const t = useTranslations('common')
return <p>{t('welcome')}</p>

// ❌ Incorreto - chave não existe
return <p>{t('nonExistentKey')}</p>
```

## 📚 Recursos Adicionais

- [Documentação oficial do next-intl](https://next-intl-docs.vercel.app/)
- [Exemplos de uso](https://next-intl-docs.vercel.app/docs/getting-started/app-router)
- [Configuração avançada](https://next-intl-docs.vercel.app/docs/configuration)
