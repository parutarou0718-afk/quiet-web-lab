import { useMemo, useState } from "react";

type Locale = "en" | "ja";
type EmailType = "Request" | "Apology" | "Thank-you" | "Follow-up" | "Reminder" | "Reschedule" | "Job application" | "Professor / academic email" | "Client reply" | "Polite refusal" | "Other";
type Recipient = "Professor" | "Client" | "Manager" | "Colleague" | "Customer" | "School office" | "Recruiter" | "Friend / casual contact" | "Other";
type Relationship = "Very formal" | "Formal" | "Semi-formal" | "Friendly but polite" | "Casual";
type Tone = "Polite" | "Very polite" | "Friendly" | "Professional" | "Concise" | "Apologetic" | "Firm but respectful" | "Japanese keigo style";
type PreferredLanguage = "English" | "Japanese" | "Chinese";
type OutputPreference = "Draft a new email" | "Rewrite my rough message" | "Make it more polite" | "Make it shorter" | "Make it more natural" | "Create multiple versions";

type FormState = {
  emailType: EmailType;
  recipient: Recipient;
  relationship: Relationship;
  tone: Tone;
  language: PreferredLanguage;
  roughMessage: string;
  extraContext: string;
  outputPreference: OutputPreference;
};

type ExamplePreset = {
  label: string;
  form: FormState;
};

const emailTypes: EmailType[] = ["Request", "Apology", "Thank-you", "Follow-up", "Reminder", "Reschedule", "Job application", "Professor / academic email", "Client reply", "Polite refusal", "Other"];
const recipients: Recipient[] = ["Professor", "Client", "Manager", "Colleague", "Customer", "School office", "Recruiter", "Friend / casual contact", "Other"];
const relationships: Relationship[] = ["Very formal", "Formal", "Semi-formal", "Friendly but polite", "Casual"];
const tones: Tone[] = ["Polite", "Very polite", "Friendly", "Professional", "Concise", "Apologetic", "Firm but respectful", "Japanese keigo style"];
const languages: PreferredLanguage[] = ["English", "Japanese", "Chinese"];
const outputPreferences: OutputPreference[] = ["Draft a new email", "Rewrite my rough message", "Make it more polite", "Make it shorter", "Make it more natural", "Create multiple versions"];

const emailTypeLabels: Record<Locale, Record<EmailType, string>> = {
  en: {
    Request: "Request",
    Apology: "Apology",
    "Thank-you": "Thank-you",
    "Follow-up": "Follow-up",
    Reminder: "Reminder",
    Reschedule: "Reschedule",
    "Job application": "Job application",
    "Professor / academic email": "Professor / academic email",
    "Client reply": "Client reply",
    "Polite refusal": "Polite refusal",
    Other: "Other"
  },
  ja: {
    Request: "依頼",
    Apology: "謝罪",
    "Thank-you": "お礼",
    "Follow-up": "確認・フォローアップ",
    Reminder: "リマインド",
    Reschedule: "日程変更",
    "Job application": "応募・就職関連",
    "Professor / academic email": "教授・大学向けメール",
    "Client reply": "顧客への返信",
    "Polite refusal": "丁寧な断り",
    Other: "その他"
  }
};

const recipientLabels: Record<Locale, Record<Recipient, string>> = {
  en: {
    Professor: "Professor",
    Client: "Client",
    Manager: "Manager",
    Colleague: "Colleague",
    Customer: "Customer",
    "School office": "School office",
    Recruiter: "Recruiter",
    "Friend / casual contact": "Friend / casual contact",
    Other: "Other"
  },
  ja: {
    Professor: "教授",
    Client: "取引先・クライアント",
    Manager: "上司",
    Colleague: "同僚",
    Customer: "顧客",
    "School office": "学校事務",
    Recruiter: "採用担当者",
    "Friend / casual contact": "友人・カジュアルな相手",
    Other: "その他"
  }
};

const relationshipLabels: Record<Locale, Record<Relationship, string>> = {
  en: {
    "Very formal": "Very formal",
    Formal: "Formal",
    "Semi-formal": "Semi-formal",
    "Friendly but polite": "Friendly but polite",
    Casual: "Casual"
  },
  ja: {
    "Very formal": "かなりフォーマル",
    Formal: "フォーマル",
    "Semi-formal": "ややフォーマル",
    "Friendly but polite": "親しみはあるが丁寧",
    Casual: "カジュアル"
  }
};

const toneLabels: Record<Locale, Record<Tone, string>> = {
  en: {
    Polite: "Polite",
    "Very polite": "Very polite",
    Friendly: "Friendly",
    Professional: "Professional",
    Concise: "Concise",
    Apologetic: "Apologetic",
    "Firm but respectful": "Firm but respectful",
    "Japanese keigo style": "Japanese keigo style"
  },
  ja: {
    Polite: "丁寧",
    "Very polite": "とても丁寧",
    Friendly: "親しみやすい",
    Professional: "ビジネス向け",
    Concise: "簡潔",
    Apologetic: "謝罪を含む",
    "Firm but respectful": "丁寧だがはっきり",
    "Japanese keigo style": "自然な敬語"
  }
};

const languageLabels: Record<Locale, Record<PreferredLanguage, string>> = {
  en: { English: "English", Japanese: "Japanese", Chinese: "Chinese" },
  ja: { English: "英語", Japanese: "日本語", Chinese: "中国語" }
};

const outputPreferenceLabels: Record<Locale, Record<OutputPreference, string>> = {
  en: {
    "Draft a new email": "Draft a new email",
    "Rewrite my rough message": "Rewrite my rough message",
    "Make it more polite": "Make it more polite",
    "Make it shorter": "Make it shorter",
    "Make it more natural": "Make it more natural",
    "Create multiple versions": "Create multiple versions"
  },
  ja: {
    "Draft a new email": "新しいメール文を作る",
    "Rewrite my rough message": "ラフな文を整える",
    "Make it more polite": "もっと丁寧にする",
    "Make it shorter": "短くする",
    "Make it more natural": "自然な表現にする",
    "Create multiple versions": "複数案を作る"
  }
};

const taskMap: Record<OutputPreference, string> = {
  "Draft a new email": "Draft a complete email based on my rough situation and context.",
  "Rewrite my rough message": "Rewrite my rough message into a clear, natural, and context-appropriate email.",
  "Make it more polite": "Make the message more polite while keeping it natural and not exaggerated.",
  "Make it shorter": "Create a shorter version that keeps the essential meaning and respectful tone.",
  "Make it more natural": "Make the message sound more natural for the selected recipient, relationship, tone, and language.",
  "Create multiple versions": "Create several usable versions with different levels of directness or formality."
};

const taskMapJa: Record<OutputPreference, string> = {
  "Draft a new email": "ラフな状況と背景に基づいて、完成したメール文を作成してください。",
  "Rewrite my rough message": "ラフな文章を、明確で自然で、状況に合ったメール文に書き換えてください。",
  "Make it more polite": "自然さを保ちながら、より丁寧な表現にしてください。",
  "Make it shorter": "重要な意味と丁寧さを残したまま、短いメール文にしてください。",
  "Make it more natural": "選択した相手、距離感、語調、言語に合わせて、より自然なメール文にしてください。",
  "Create multiple versions": "丁寧さや直接さの違う複数のメール案を作成してください。"
};

const outputFormatMap: Record<OutputPreference, string[]> = {
  "Draft a new email": ["Subject line", "Email body", "Tone notes", "Optional shorter version"],
  "Rewrite my rough message": ["Subject line when appropriate", "Rewritten email body", "Tone notes", "Optional shorter version"],
  "Make it more polite": ["Subject line when appropriate", "More polite email body", "Tone notes", "Optional shorter version"],
  "Make it shorter": ["Subject line when appropriate", "Concise email body", "Tone notes", "Optional fuller version"],
  "Make it more natural": ["Subject line when appropriate", "Natural email body", "Tone notes", "Optional alternative version"],
  "Create multiple versions": ["Subject line options", "Version 1: standard", "Version 2: shorter", "Version 3: softer or more formal", "Tone notes"]
};

const outputFormatMapJa: Record<OutputPreference, string[]> = {
  "Draft a new email": ["件名", "メール本文", "語調メモ", "必要であれば短い版"],
  "Rewrite my rough message": ["必要であれば件名", "書き換えたメール本文", "語調メモ", "必要であれば短い版"],
  "Make it more polite": ["必要であれば件名", "より丁寧なメール本文", "語調メモ", "必要であれば短い版"],
  "Make it shorter": ["必要であれば件名", "簡潔なメール本文", "語調メモ", "必要であれば詳しい版"],
  "Make it more natural": ["必要であれば件名", "自然なメール本文", "語調メモ", "必要であれば別案"],
  "Create multiple versions": ["件名案", "案1: 標準", "案2: 短め", "案3: より柔らかい、またはより丁寧", "語調メモ"]
};

function defaultFormForLocale(locale: Locale): FormState {
  return {
    emailType: "Request",
    recipient: "Professor",
    relationship: "Formal",
    tone: locale === "ja" ? "Japanese keigo style" : "Polite",
    language: locale === "ja" ? "Japanese" : "English",
    roughMessage: "",
    extraContext: "",
    outputPreference: "Draft a new email"
  };
}

function examplesForLocale(locale: Locale): ExamplePreset[] {
  if (locale === "ja") {
    return [
      {
        label: "教授への敬語メール",
        form: {
          emailType: "Professor / academic email",
          recipient: "Professor",
          relationship: "Formal",
          tone: "Japanese keigo style",
          language: "Japanese",
          roughMessage: "体調不良でレポート提出を2日遅らせられるか、教授に相談したいです。",
          extraContext: "ゼミの先生です。丁寧で責任感のある印象にしたいです。",
          outputPreference: "Draft a new email"
        }
      },
      {
        label: "顧客へのフォローアップ",
        form: {
          emailType: "Follow-up",
          recipient: "Client",
          relationship: "Formal",
          tone: "Professional",
          language: "Japanese",
          roughMessage: "提案書を送ってから1週間返信がないので、確認のメールを送りたいです。",
          extraContext: "催促が強すぎる印象にはしたくありません。",
          outputPreference: "Draft a new email"
        }
      },
      {
        label: "丁寧な断り",
        form: {
          emailType: "Polite refusal",
          recipient: "Colleague",
          relationship: "Semi-formal",
          tone: "Firm but respectful",
          language: "Japanese",
          roughMessage: "今週は予定がいっぱいなので、追加の作業を引き受けられないと伝えたいです。",
          extraContext: "丁寧だけれど、はっきり伝えたいです。",
          outputPreference: "Draft a new email"
        }
      }
    ];
  }

  return [
    {
      label: "Japanese professor email",
      form: {
        emailType: "Professor / academic email",
        recipient: "Professor",
        relationship: "Formal",
        tone: "Japanese keigo style",
        language: "Japanese",
        roughMessage: "I want to ask my professor if I can submit my report two days late because I was sick.",
        extraContext: "This is my seminar professor. I want to sound polite and responsible.",
        outputPreference: "Draft a new email"
      }
    },
    {
      label: "Client follow-up email",
      form: {
        emailType: "Follow-up",
        recipient: "Client",
        relationship: "Formal",
        tone: "Professional",
        language: "English",
        roughMessage: "I want to follow up because the client has not replied to my proposal for one week.",
        extraContext: "I do not want to sound pushy.",
        outputPreference: "Draft a new email"
      }
    },
    {
      label: "Polite refusal",
      form: {
        emailType: "Polite refusal",
        recipient: "Colleague",
        relationship: "Semi-formal",
        tone: "Firm but respectful",
        language: "English",
        roughMessage: "I want to say I cannot take on an extra task this week because my schedule is full.",
        extraContext: "I want to be polite but clear.",
        outputPreference: "Draft a new email"
      }
    }
  ];
}

function buildPrompt(form: FormState, locale: Locale): string {
  if (locale === "ja") return buildJapanesePrompt(form);
  return buildEnglishPrompt(form);
}

function buildEnglishPrompt(form: FormState): string {
  const roughMessage = form.roughMessage.trim();
  const extraContext = form.extraContext.trim() || "No extra context was provided. Please ask clarifying questions if important details are missing.";
  const outputItems = outputFormatMap[form.outputPreference].map((item, index) => `${index + 1}. ${item}`).join("\n");

  return `Role
You are a professional email writing assistant specializing in clear, natural, and context-appropriate communication.

Context
Email type: ${form.emailType}
Recipient: ${form.recipient}
Relationship / distance: ${form.relationship}
Tone: ${form.tone}
Preferred language: ${form.language}
Rough message:
${roughMessage}
Extra context:
${extraContext}

Task
${taskMap[form.outputPreference]} Make the email suitable for a ${form.recipient} in a ${form.relationship.toLowerCase()} relationship. The email should match a ${form.tone.toLowerCase()} tone.

Requirements
- Use ${form.language} as the email language.
- Match the recipient and relationship.
- Use the selected tone: ${form.tone}.
- Do not invent facts, promises, dates, attachments, qualifications, or personal details.
- Keep the message clear and natural.
- Avoid overly dramatic or exaggerated expressions.
- Include a subject line when appropriate.
- If writing in Japanese, use natural and appropriate politeness.
- If the situation is academic or professional, keep the wording respectful.
- Do not help with phishing, impersonation, harassment, threats, discrimination, or rule-breaking.
- If the rough message is unclear, ask concise clarifying questions before making risky assumptions.

Output Format
Please structure your answer using these sections:
${outputItems}`;
}

function buildJapanesePrompt(form: FormState): string {
  const roughMessage = form.roughMessage.trim();
  const extraContext = form.extraContext.trim() || "追加の背景はまだありません。重要な情報が不足している場合は、先に確認質問をしてください。";
  const outputItems = outputFormatMapJa[form.outputPreference].map((item, index) => `${index + 1}. ${item}`).join("\n");

  return `役割
あなたは、明確で自然で、状況に合ったメール作成を支援するプロのメール作成アシスタントです。

背景
メールの種類: ${emailTypeLabels.ja[form.emailType]}
相手: ${recipientLabels.ja[form.recipient]}
距離感: ${relationshipLabels.ja[form.relationship]}
語調: ${toneLabels.ja[form.tone]}
希望するメール言語: ${languageLabels.ja[form.language]}
ラフな内容:
${roughMessage}
追加の背景:
${extraContext}

タスク
${taskMapJa[form.outputPreference]} 相手が「${recipientLabels.ja[form.recipient]}」で、距離感が「${relationshipLabels.ja[form.relationship]}」であることを前提にしてください。語調は「${toneLabels.ja[form.tone]}」に合わせてください。

要件
- メール本文は${languageLabels.ja[form.language]}で書いてください。
- 相手と距離感に合う表現にしてください。
- 選択した語調「${toneLabels.ja[form.tone]}」に合わせてください。
- 事実、約束、日付、添付資料、資格、個人情報を勝手に作らないでください。
- 明確で自然な文章にしてください。
- 大げさすぎる表現や芝居がかった表現は避けてください。
- 必要であれば件名を含めてください。
- 日本語で書く場合は、自然で適切な敬語を使ってください。
- 学術的・ビジネス的な場面では、失礼のない表現にしてください。
- フィッシング、なりすまし、嫌がらせ、脅迫、差別、ルール違反につながる内容は作らないでください。
- ラフな内容が不明確な場合は、危険な推測をせず、簡潔な確認質問をしてください。

出力形式
以下の見出しで整理してください:
${outputItems}`;
}

const examplePromptEn = `Role
You are a professional email writing assistant specializing in clear, natural, and context-appropriate communication.

Context
Email type: Professor / academic email
Recipient: Professor
Relationship / distance: Formal
Tone: Japanese keigo style
Preferred language: Japanese
Rough message:
I want to ask my professor if I can submit my report two days late because I was sick.
Extra context:
This is my seminar professor. I want to sound polite and responsible.

Task
Draft a complete email based on my rough situation and context. Make the email suitable for a professor in a formal relationship.

Requirements
- Use Japanese as the email language.
- Match the recipient and relationship.
- Use natural and appropriate Japanese politeness.
- Do not invent facts.
- Keep the message clear and natural.
- Avoid overly dramatic or exaggerated expressions.
- Include a subject line when appropriate.
- Keep the wording respectful.

Output Format
1. Subject line
2. Email body
3. Tone notes
4. Optional shorter version`;

const examplePromptJa = `役割
あなたは、明確で自然で、状況に合ったメール作成を支援するプロのメール作成アシスタントです。

背景
メールの種類: 教授・大学向けメール
相手: 教授
距離感: フォーマル
語調: 自然な敬語
希望するメール言語: 日本語
ラフな内容:
体調不良でレポート提出を2日遅らせられるか、教授に相談したいです。
追加の背景:
ゼミの先生です。丁寧で責任感のある印象にしたいです。

タスク
ラフな状況と背景に基づいて、完成したメール文を作成してください。

要件
- メール本文は日本語で書いてください。
- 相手と距離感に合う表現にしてください。
- 自然で適切な敬語を使ってください。
- 事実を勝手に作らないでください。
- 明確で自然な文章にしてください。
- 大げさすぎる表現は避けてください。
- 件名を含めてください。

出力形式
1. 件名
2. メール本文
3. 語調メモ
4. 必要であれば短い版`;

export default function EmailPromptBuilder({ locale = "en" }: { locale?: Locale }) {
  const normalizedLocale: Locale = locale === "ja" ? "ja" : "en";
  const [form, setForm] = useState<FormState>(() => defaultFormForLocale(normalizedLocale));
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const canCopy = useMemo(() => prompt.trim().length > 0, [prompt]);
  const examples = useMemo(() => examplesForLocale(normalizedLocale), [normalizedLocale]);
  const ui = normalizedLocale === "ja" ? {
    formAria: "メールプロンプトフォーム",
    exampleAria: "入力例",
    emailType: "メールの種類",
    recipient: "相手",
    relationship: "距離感",
    tone: "語調",
    language: "出力言語",
    outputPreference: "出力の目的",
    roughMessage: "ラフな内容",
    roughPlaceholder: "例: 体調不良でレポート提出を2日遅らせられるか、教授に相談したい。",
    extraContext: "追加の背景",
    extraPlaceholder: "例: ゼミの先生です。丁寧で責任感のある印象にしたいです。",
    generate: "Promptを生成",
    copy: "生成結果をコピー",
    clear: "フォームをクリア",
    copyExample: "例文をコピー",
    outputAria: "生成されたプロンプト",
    outputEyebrow: "生成されたPrompt",
    outputTitle: "AIツールにコピーして使えます",
    outputPlaceholder: "生成されたメール用プロンプトがここに表示されます。コピー前に編集できます。",
    roughError: "ラフな内容を入力してください。",
    copied: "Promptをコピーしました。",
    exampleCopied: "例のPromptをコピーしました。",
    copyFailed: "コピーに失敗しました。テキストを選択して手動でコピーしてください。",
    loadedSuffix: "を読み込みました。",
    templateTools: "テンプレート言語",
    englishTemplate: "英語テンプレート",
    japaneseTemplate: "日本語テンプレート"
  } : {
    formAria: "Email prompt form",
    exampleAria: "Example presets",
    emailType: "Email type",
    recipient: "Recipient",
    relationship: "Relationship / distance",
    tone: "Tone",
    language: "Preferred language",
    outputPreference: "Output preference",
    roughMessage: "Rough message",
    roughPlaceholder: "Example: I want to ask my professor if I can submit the report two days late because I was sick.",
    extraContext: "Extra context",
    extraPlaceholder: "Example: This is my seminar professor. I want to sound polite, responsible, and not too casual.",
    generate: "Generate Prompt",
    copy: "Copy generated prompt",
    clear: "Clear Form",
    copyExample: "Copy example",
    outputAria: "Generated prompt",
    outputEyebrow: "Generated Prompt",
    outputTitle: "Copy this into your AI tool",
    outputPlaceholder: "Your generated structured email prompt will appear here. You can edit it before copying.",
    roughError: "Please enter your rough message first.",
    copied: "Prompt copied.",
    exampleCopied: "Example prompt copied.",
    copyFailed: "Copy failed. Please select the text and copy it manually.",
    loadedSuffix: " loaded.",
    templateTools: "Template language",
    englishTemplate: "English template",
    japaneseTemplate: "Japanese template"
  };

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "roughMessage" && value.trim()) setError("");
  };

  const applyExample = (example: ExamplePreset) => {
    setForm(example.form);
    setPrompt("");
    setError("");
    setCopyStatus(`${example.label}${ui.loadedSuffix}`);
  };

  const generatePrompt = () => {
    if (!form.roughMessage.trim()) {
      setError(ui.roughError);
      return;
    }
    setError("");
    setCopyStatus("");
    setPrompt(buildPrompt(form, normalizedLocale));
  };

  const generateTemplate = (templateLocale: Locale, responseLanguage: PreferredLanguage) => {
    if (!form.roughMessage.trim()) {
      setError(ui.roughError);
      return;
    }
    const nextForm = { ...form, language: responseLanguage };
    setForm(nextForm);
    setError("");
    setCopyStatus("");
    setPrompt(buildPrompt(nextForm, templateLocale));
  };

  const copyText = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(message);
    } catch {
      setCopyStatus(ui.copyFailed);
    }
  };

  const clearForm = () => {
    setForm(defaultFormForLocale(normalizedLocale));
    setPrompt("");
    setError("");
    setCopyStatus("");
  };

  return (
    <div className="research-tool-shell">
      <section className="research-tool-form" aria-label={ui.formAria}>
        <div className="example-fill-buttons research-tool-form__wide" aria-label={ui.exampleAria}>
          {examples.map((example) => (
            <button type="button" key={example.label} onClick={() => applyExample(example)}>{example.label}</button>
          ))}
        </div>

        <label>
          <span>{ui.emailType}</span>
          <select value={form.emailType} onChange={(event) => updateField("emailType", event.target.value)}>
            {emailTypes.map((item) => <option key={item} value={item}>{emailTypeLabels[normalizedLocale][item]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.recipient}</span>
          <select value={form.recipient} onChange={(event) => updateField("recipient", event.target.value)}>
            {recipients.map((item) => <option key={item} value={item}>{recipientLabels[normalizedLocale][item]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.relationship}</span>
          <select value={form.relationship} onChange={(event) => updateField("relationship", event.target.value)}>
            {relationships.map((item) => <option key={item} value={item}>{relationshipLabels[normalizedLocale][item]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.tone}</span>
          <select value={form.tone} onChange={(event) => updateField("tone", event.target.value)}>
            {tones.map((item) => <option key={item} value={item}>{toneLabels[normalizedLocale][item]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.language}</span>
          <select value={form.language} onChange={(event) => updateField("language", event.target.value)}>
            {languages.map((item) => <option key={item} value={item}>{languageLabels[normalizedLocale][item]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.outputPreference}</span>
          <select value={form.outputPreference} onChange={(event) => updateField("outputPreference", event.target.value)}>
            {outputPreferences.map((item) => <option key={item} value={item}>{outputPreferenceLabels[normalizedLocale][item]}</option>)}
          </select>
        </label>

        <label className="research-tool-form__wide">
          <span>{ui.roughMessage} <strong aria-hidden="true">*</strong></span>
          <textarea
            value={form.roughMessage}
            onChange={(event) => updateField("roughMessage", event.target.value)}
            placeholder={ui.roughPlaceholder}
            rows={5}
            aria-invalid={error ? "true" : "false"}
          />
        </label>

        <label className="research-tool-form__wide">
          <span>{ui.extraContext}</span>
          <textarea
            value={form.extraContext}
            onChange={(event) => updateField("extraContext", event.target.value)}
            placeholder={ui.extraPlaceholder}
            rows={5}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="research-tool-actions">
          <button type="button" onClick={generatePrompt}>{ui.generate}</button>
          <button type="button" onClick={clearForm}>{ui.clear}</button>
        </div>
      </section>

      <section className="research-tool-output" aria-label={ui.outputAria}>
        <div className="research-tool-output__head">
          <div>
            <p className="eyebrow">{ui.outputEyebrow}</p>
            <h2>{ui.outputTitle}</h2>
          </div>
          {copyStatus && <span role="status">{copyStatus}</span>}
        </div>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={ui.outputPlaceholder}
          rows={20}
        />
        <div className='result-tool-actions' aria-label={ui.templateTools}>
          <button className='is-primary' type='button' onClick={() => canCopy && copyText(prompt, ui.copied)} disabled={!canCopy}>{ui.copy}</button>
          <button type='button' onClick={() => copyText(normalizedLocale === 'ja' ? examplePromptJa : examplePromptEn, ui.exampleCopied)}>{ui.copyExample}</button>
          <button type='button' onClick={() => generateTemplate('ja', 'Japanese')}>{ui.japaneseTemplate}</button>
          <button type='button' onClick={() => generateTemplate('en', 'English')}>{ui.englishTemplate}</button>
        </div>
      </section>
    </div>
  );
}



