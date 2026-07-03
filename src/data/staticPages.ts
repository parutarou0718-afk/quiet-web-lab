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
      description: "About Smart Prompt App and the Prompt Builder.",
      h1: "About Smart Prompt App",
      body: [
        "Smart Prompt App is a practical tutorial site for building cleaner AI image prompts from reusable recipe fragments. It focuses on all-ages examples, original concepts, and transparent prompt structure.",
        "The Prompt Builder stores selected fragments in your browser with localStorage, then helps you compose positive prompts, negative prompts, and parameters."
      ]
    },
    zh: {
      title: "关于本站",
      description: "关于 Smart Prompt App 和提示词构建器。",
      h1: "关于 Smart Prompt App",
      body: [
        "Smart Prompt App 是一个实用型 AI 图片提示词网站，重点是把提示词拆成可复用片段，让用户更容易理解姿势、镜头、光线、服装、质量词和负向词之间的关系。",
        "提示词构建器会把你选择的片段保存在浏览器本地，并帮助你组合正向提示词、负向提示词和参数。页面界面支持多语言，但最终复制给模型使用的提示词保持英文。"
      ]
    },
    ja: {
      title: "このサイトについて",
      description: "Smart Prompt App とプロンプトビルダーについて。",
      h1: "Smart Prompt App について",
      body: [
        "Smart Prompt App は、AI 画像プロンプトを再利用できる断片に分けて学べる実用サイトです。ポーズ、カメラ、光、服装、品質タグ、ネガティブ要素の関係をわかりやすく整理します。",
        "プロンプトビルダーは選択した断片をブラウザ内に保存し、ポジティブ、ネガティブ、パラメータの組み立てを補助します。画面は多言語対応ですが、モデルに渡す最終プロンプトは英語で出力します。"
      ]
    }
  },
  privacy: {
    en: {
      title: "Privacy",
      description: "Privacy policy for Smart Prompt App.",
      h1: "Privacy",
      body: [
        "The Prompt Cart uses localStorage in your browser. Fragment selections are not sent to a server by this static site.",
        "AdSense and analytics IDs are empty by default. If enabled later, this page should be updated with the relevant provider disclosures and consent requirements."
      ]
    },
    zh: {
      title: "隐私政策",
      description: "Smart Prompt App 的隐私政策。",
      h1: "隐私政策",
      body: [
        "提示词篮子使用浏览器本地存储。这个静态网站不会把你选择的提示词片段发送到服务器。",
        "AdSense 和 Google Analytics 默认关闭。如果以后启用广告或统计，需要在本页补充相关服务商说明、Cookie 说明和同意要求。"
      ]
    },
    ja: {
      title: "プライバシー",
      description: "Smart Prompt App のプライバシーポリシー。",
      h1: "プライバシー",
      body: [
        "プロンプトカートはブラウザの localStorage を使います。この静的サイト自体は、選択した断片をサーバーへ送信しません。",
        "AdSense と Google Analytics は初期状態では無効です。将来有効にする場合は、関連するサービス説明、Cookie、同意要件をこのページに追記します。"
      ]
    }
  },
  terms: {
    en: {
      title: "Terms",
      description: "Terms for using Smart Prompt App.",
      h1: "Terms",
      body: [
        "Smart Prompt App is an educational prompt-writing resource. Use the examples responsibly and adapt them for lawful, all-ages projects.",
        "The site provides no warranty that a prompt will produce a specific result in any image model. You are responsible for reviewing generated outputs and following the policies of the tools you use."
      ]
    },
    zh: {
      title: "使用条款",
      description: "Smart Prompt App 的使用条款。",
      h1: "使用条款",
      body: [
        "Smart Prompt App 是提示词写作学习资源。请负责任地使用示例，并把它们改写到合法、全年龄的项目中。",
        "本站不保证任何提示词一定能在某个模型中产生指定结果。你需要自行检查生成结果，并遵守所使用工具和平台的政策。"
      ]
    },
    ja: {
      title: "利用規約",
      description: "Smart Prompt App の利用規約。",
      h1: "利用規約",
      body: [
        "Smart Prompt App はプロンプト作成の学習リソースです。例は責任を持って使用し、合法で全年齢向けの用途に合わせて調整してください。",
        "本サイトは、特定のモデルで特定の結果が得られることを保証しません。生成結果の確認と、利用するツールやプラットフォームのポリシー遵守は利用者の責任です。"
      ]
    }
  },
  disclaimer: {
    en: {
      title: "Disclaimer",
      description: "Safety and content disclaimer for Smart Prompt App.",
      h1: "Disclaimer",
      body: [
        "The recipes are fictional, all-ages examples for prompt education. They do not instruct users to generate explicit, violent, private, celebrity, or protected-character impersonation content.",
        "Always check local laws, platform policies, and licensing terms before training models or publishing generated images."
      ]
    },
    zh: {
      title: "免责声明",
      description: "Smart Prompt App 的安全与内容免责声明。",
      h1: "免责声明",
      body: [
        "本站配方是用于提示词学习的虚构、全年龄示例，不用于指导生成成人、暴力、私人身份、名人仿冒或受保护角色仿冒内容。",
        "在训练模型或发布生成图片之前，请自行确认当地法律、平台政策和素材许可条款。"
      ]
    },
    ja: {
      title: "免責事項",
      description: "Smart Prompt App の安全とコンテンツに関する免責事項。",
      h1: "免責事項",
      body: [
        "本サイトのレシピは、プロンプト学習用の架空かつ全年齢向けの例です。成人向け、暴力的、私的身元、著名人、保護されたキャラクターのなりすまし生成を促すものではありません。",
        "モデル学習や生成画像の公開前に、地域の法律、プラットフォームポリシー、素材ライセンスを確認してください。"
      ]
    }
  },
  contact: {
    en: {
      title: "Contact",
      description: "Contact page for Smart Prompt App.",
      h1: "Contact",
      body: [
        "For feedback, recipe corrections, or collaboration notes, add your preferred contact method here before deployment.",
        "Suggested inbox label: Smart Prompt App editorial."
      ]
    },
    zh: {
      title: "联系方式",
      description: "Smart Prompt App 联系页面。",
      h1: "联系方式",
      body: [
        "如果需要接收反馈、配方修正或合作信息，可以在正式上线前把你的邮箱或表单链接放在这里。",
        "建议邮箱标签：Smart Prompt App editorial。"
      ]
    },
    ja: {
      title: "連絡先",
      description: "Smart Prompt App の連絡先ページ。",
      h1: "連絡先",
      body: [
        "フィードバック、レシピ修正、協力の相談を受け付ける場合は、公開前にメールアドレスやフォームリンクをここに追加してください。",
        "推奨ラベル: Smart Prompt App editorial。"
      ]
    }
  }
} satisfies Record<string, Record<Locale, StaticPageCopy>>;

export type StaticPageKey = keyof typeof staticPageCopy;
