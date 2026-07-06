import type { Locale } from "@/data/i18n";

type StaticPageCopy = {
  title: string;
  description: string;
  h1: string;
  body: string[];
};

export const staticPageCopy = {
  about: {
    en: {
      title: "About",
      description: "About Smart Prompt App and its practical AI workflow tools.",
      h1: "About Smart Prompt App",
      body: [
        "Smart Prompt App is a practical AI implementation studio and resource site for prompt systems, workflow templates, lightweight tools, and static web products.",
        "The site focuses on all-ages, original, lawful examples. It is designed for creators, students, small teams, and businesses that want to turn AI experiments into repeatable workflows."
      ]
    },
    zh: {
      title: "关于本站",
      description: "关于 Smart Prompt App 及其实用 AI 工作流工具。",
      h1: "关于 Smart Prompt App",
      body: [
        "Smart Prompt App 是一个面向 AI 落地应用的工作室与资源站，内容包括提示词系统、工作流模板、轻量工具和静态网站产品。",
        "本站坚持全年龄、原创、合法和可复用的内容方向，适合创作者、学生、小团队和希望把 AI 实验变成稳定流程的业务使用者。"
      ]
    },
    ja: {
      title: "このサイトについて",
      description: "Smart Prompt App と実用的な AI ワークフローツールについて。",
      h1: "Smart Prompt App について",
      body: [
        "Smart Prompt App は、プロンプトシステム、ワークフローテンプレート、軽量ツール、静的 Web プロダクトを扱う実用的な AI 活用サイトです。",
        "全年齢向けで、オリジナルかつ合法的に使える例を中心に、AI の試行錯誤を再利用しやすい作業手順へ整理することを目的としています。"
      ]
    }
  },
  privacy: {
    en: {
      title: "Privacy",
      description: "Privacy policy for Smart Prompt App.",
      h1: "Privacy",
      body: [
        "Smart Prompt App is primarily a static website. Interactive tools may store selected prompt fragments or draft content in your browser using localStorage so the page can remember your current work.",
        "The site does not require an account or a database. If advertising, analytics, or external services are enabled, this policy will describe the relevant providers, cookies, and consent requirements."
      ]
    },
    zh: {
      title: "隐私政策",
      description: "Smart Prompt App 的隐私政策。",
      h1: "隐私政策",
      body: [
        "Smart Prompt App 主要是静态网站。部分交互工具可能会使用浏览器 localStorage 保存您选择的提示词片段或草稿内容，以便页面记住当前工作状态。",
        "本站不要求注册账号，也不使用数据库。如果未来启用广告、分析工具或外部服务，本页面会说明相关服务商、Cookie 和同意要求。"
      ]
    },
    ja: {
      title: "プライバシーポリシー",
      description: "Smart Prompt App のプライバシーポリシー。",
      h1: "プライバシーポリシー",
      body: [
        "Smart Prompt App は主に静的サイトです。一部のツールでは、選択したプロンプト断片や下書きをブラウザの localStorage に保存し、作業状態を保つことがあります。",
        "このサイトはアカウント登録やデータベースを必要としません。広告、分析ツール、外部サービスを利用する場合は、関連する提供元、Cookie、同意事項をこのページで説明します。"
      ]
    }
  },
  terms: {
    en: {
      title: "Terms",
      description: "Terms for using Smart Prompt App.",
      h1: "Terms",
      body: [
        "Smart Prompt App provides educational resources, prompt tools, and workflow examples. Use the content responsibly and adapt it only for lawful, all-ages projects.",
        "The site does not guarantee that any prompt, workflow, or template will produce a specific result. Users are responsible for reviewing outputs and following the rules of the tools and platforms they use."
      ]
    },
    zh: {
      title: "使用条款",
      description: "Smart Prompt App 的使用条款。",
      h1: "使用条款",
      body: [
        "Smart Prompt App 提供学习资源、提示词工具和工作流示例。请负责任地使用本站内容，并仅用于合法、全年龄的项目。",
        "本站不保证任何提示词、工作流或模板一定产生特定结果。用户需要自行检查输出内容，并遵守所使用工具和平台的规则。"
      ]
    },
    ja: {
      title: "利用規約",
      description: "Smart Prompt App の利用規約。",
      h1: "利用規約",
      body: [
        "Smart Prompt App は、学習用リソース、プロンプトツール、ワークフロー例を提供します。内容は責任を持って利用し、合法かつ全年齢向けの用途に合わせて調整してください。",
        "このサイトは、特定のプロンプト、ワークフロー、テンプレートが必ず特定の結果を生むことを保証しません。生成結果の確認と、利用するツールやプラットフォームの規約遵守は利用者の責任です。"
      ]
    }
  },
  disclaimer: {
    en: {
      title: "Disclaimer",
      description: "Safety and content disclaimer for Smart Prompt App.",
      h1: "Disclaimer",
      body: [
        "Examples on this site are fictional, all-ages, and intended for education or workflow planning. They do not encourage explicit content, harassment, impersonation, private data misuse, or copied protected characters.",
        "Always check local laws, platform policies, licensing terms, and academic or workplace rules before publishing AI-assisted content or training models."
      ]
    },
    zh: {
      title: "免责声明",
      description: "Smart Prompt App 的安全与内容免责声明。",
      h1: "免责声明",
      body: [
        "本站示例均为虚构、全年龄内容，用于学习和工作流规划。本站不鼓励生成露骨内容、骚扰内容、身份冒充、滥用私人数据或复刻受保护角色。",
        "在发布 AI 辅助内容或训练模型之前，请自行确认当地法律、平台政策、素材授权条款，以及学校或工作单位的相关规则。"
      ]
    },
    ja: {
      title: "免責事項",
      description: "Smart Prompt App の安全性とコンテンツに関する免責事項。",
      h1: "免責事項",
      body: [
        "このサイトの例は架空で全年齢向けであり、学習やワークフロー設計を目的としています。露骨な内容、嫌がらせ、なりすまし、個人情報の不適切利用、保護されたキャラクターの複製を促すものではありません。",
        "AI 支援コンテンツの公開やモデル学習を行う前に、地域の法律、プラットフォームポリシー、素材ライセンス、学校や職場の規則を確認してください。"
      ]
    }
  },
  contact: {
    en: {
      title: "Contact",
      description: "Contact Smart Prompt App by email.",
      h1: "Contact Smart Prompt App",
      body: [
        "For project inquiries, collaboration notes, feedback, or correction requests, please contact us by email.",
        "Email: parutarou0718@gmail.com"
      ]
    },
    zh: {
      title: "联系方式",
      description: "通过邮箱联系 Smart Prompt App。",
      h1: "联系 Smart Prompt App",
      body: [
        "如果您有项目咨询、合作想法、网站反馈或内容修正建议，请通过邮箱联系。",
        "邮箱：parutarou0718@gmail.com"
      ]
    },
    ja: {
      title: "お問い合わせ",
      description: "Smart Prompt App へのお問い合わせはメールでご連絡ください。",
      h1: "Smart Prompt App へのお問い合わせ",
      body: [
        "プロジェクト相談、協業のご連絡、サイトへのフィードバック、内容修正のご依頼はメールでご連絡ください。",
        "メール: parutarou0718@gmail.com"
      ]
    }
  }
} satisfies Record<string, Record<Locale, StaticPageCopy>>;

export type StaticPageKey = keyof typeof staticPageCopy;
