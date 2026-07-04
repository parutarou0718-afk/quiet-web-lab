import { useMemo, useState } from "react";

type Locale = "en" | "ja";
type AcademicLevel = "Undergraduate" | "Master's" | "PhD" | "General report" | "Professional research";
type TargetOutput = "Refine my research topic" | "Generate thesis outline" | "Create research questions" | "Suggest methodology" | "Plan literature review" | "Evaluate feasibility" | "Improve my research proposal";
type PreferredLanguage = "English" | "Japanese" | "Chinese";

type FormState = {
  field: string;
  topic: string;
  level: AcademicLevel;
  target: TargetOutput;
  language: PreferredLanguage;
  context: string;
};

const academicLevels: AcademicLevel[] = ["Undergraduate", "Master's", "PhD", "General report", "Professional research"];
const targetOutputs: TargetOutput[] = [
  "Refine my research topic",
  "Generate thesis outline",
  "Create research questions",
  "Suggest methodology",
  "Plan literature review",
  "Evaluate feasibility",
  "Improve my research proposal"
];
const languages: PreferredLanguage[] = ["English", "Japanese", "Chinese"];

const levelLabels: Record<Locale, Record<AcademicLevel, string>> = {
  en: {
    "Undergraduate": "Undergraduate",
    "Master's": "Master's",
    PhD: "PhD",
    "General report": "General report",
    "Professional research": "Professional research"
  },
  ja: {
    "Undergraduate": "学部生",
    "Master's": "修士課程",
    PhD: "博士課程",
    "General report": "一般レポート",
    "Professional research": "実務・専門調査"
  }
};

const targetLabels: Record<Locale, Record<TargetOutput, string>> = {
  en: {
    "Refine my research topic": "Refine my research topic",
    "Generate thesis outline": "Generate thesis outline",
    "Create research questions": "Create research questions",
    "Suggest methodology": "Suggest methodology",
    "Plan literature review": "Plan literature review",
    "Evaluate feasibility": "Evaluate feasibility",
    "Improve my research proposal": "Improve my research proposal"
  },
  ja: {
    "Refine my research topic": "研究テーマを絞り込む",
    "Generate thesis outline": "論文アウトラインを作る",
    "Create research questions": "研究質問を作る",
    "Suggest methodology": "方法論を提案する",
    "Plan literature review": "文献レビューを計画する",
    "Evaluate feasibility": "実現可能性を確認する",
    "Improve my research proposal": "研究計画書を改善する"
  }
};

const languageLabels: Record<Locale, Record<PreferredLanguage, string>> = {
  en: { English: "English", Japanese: "Japanese", Chinese: "Chinese" },
  ja: { English: "英語", Japanese: "日本語", Chinese: "中国語" }
};

const taskMap: Record<TargetOutput, string> = {
  "Refine my research topic": "Help me refine this broad idea into a clear, focused, feasible research topic.",
  "Generate thesis outline": "Create a realistic thesis or report outline based on this topic and academic level.",
  "Create research questions": "Generate specific and researchable questions that match this topic, level, and field.",
  "Suggest methodology": "Suggest suitable research methods, possible data sources, and realistic analysis approaches.",
  "Plan literature review": "Plan a literature review structure, key search themes, and categories of sources to investigate.",
  "Evaluate feasibility": "Evaluate whether this topic is feasible, identify risks, and suggest ways to narrow it.",
  "Improve my research proposal": "Improve the research proposal structure, logic, feasibility, and next steps."
};

const taskMapJa: Record<TargetOutput, string> = {
  "Refine my research topic": "この曖昧なアイデアを、明確で焦点があり、実行可能な研究テーマに絞り込んでください。",
  "Generate thesis outline": "このテーマと学術レベルに合う、現実的な論文またはレポートのアウトラインを作ってください。",
  "Create research questions": "このテーマ、学術レベル、研究分野に合う、具体的で調査可能な研究質問を作ってください。",
  "Suggest methodology": "適切な研究方法、利用できそうなデータや資料、現実的な分析方法を提案してください。",
  "Plan literature review": "文献レビューの構成、検索テーマ、調べるべき資料カテゴリを計画してください。",
  "Evaluate feasibility": "このテーマが実行可能かを評価し、リスクと絞り込み方を提案してください。",
  "Improve my research proposal": "研究計画書の構成、論理、実現可能性、次の作業を改善してください。"
};

const outputFormatMap: Record<TargetOutput, string[]> = {
  "Refine my research topic": ["Feasibility analysis", "Refined research topic options", "Possible research questions", "Scope boundaries", "Risks and limitations", "Next steps"],
  "Generate thesis outline": ["Feasibility analysis", "Refined thesis title", "Suggested thesis outline", "Methodology suggestions", "Data/source suggestions", "Risks and limitations", "Next steps"],
  "Create research questions": ["Feasibility analysis", "Refined research topic", "Main research question", "Sub-questions", "Methodology suggestions", "Data/source suggestions", "Risks and limitations"],
  "Suggest methodology": ["Feasibility analysis", "Suitable methodology options", "Data/source suggestions", "Strengths and weaknesses", "Ethical or practical concerns", "Next steps"],
  "Plan literature review": ["Search themes", "Possible keyword groups", "Literature review structure", "Source types to prioritize", "Risks and limitations", "Next steps"],
  "Evaluate feasibility": ["Feasibility analysis", "Main risks", "Ways to narrow the topic", "Data/source availability", "Possible research questions", "Next steps"],
  "Improve my research proposal": ["Proposal diagnosis", "Refined research topic", "Possible research questions", "Suggested thesis outline", "Methodology suggestions", "Risks and limitations", "Next steps"]
};

const outputFormatMapJa: Record<TargetOutput, string[]> = {
  "Refine my research topic": ["実現可能性の分析", "絞り込んだ研究テーマ案", "考えられる研究質問", "研究範囲の境界", "リスクと限界", "次にやること"],
  "Generate thesis outline": ["実現可能性の分析", "改善した論文タイトル案", "論文アウトライン", "方法論の提案", "データ・資料の候補", "リスクと限界", "次にやること"],
  "Create research questions": ["実現可能性の分析", "絞り込んだ研究テーマ", "主研究質問", "副研究質問", "方法論の提案", "データ・資料の候補", "リスクと限界"],
  "Suggest methodology": ["実現可能性の分析", "適した方法論の候補", "データ・資料の候補", "それぞれの強みと弱み", "倫理的・実務的な注意点", "次にやること"],
  "Plan literature review": ["検索テーマ", "キーワード候補", "文献レビューの構成", "優先して読む資料の種類", "リスクと限界", "次にやること"],
  "Evaluate feasibility": ["実現可能性の分析", "主なリスク", "テーマを絞る方法", "データ・資料の入手可能性", "考えられる研究質問", "次にやること"],
  "Improve my research proposal": ["研究計画書の診断", "改善した研究テーマ", "考えられる研究質問", "論文アウトライン案", "方法論の提案", "リスクと限界", "次にやること"]
};

function defaultFormForLocale(locale: Locale): FormState {
  return {
    field: "",
    topic: "",
    level: "Undergraduate",
    target: "Refine my research topic",
    language: locale === "ja" ? "Japanese" : "English",
    context: ""
  };
}

function buildPrompt(form: FormState, locale: Locale): string {
  if (locale === "ja") return buildJapanesePrompt(form);
  return buildEnglishPrompt(form);
}

function buildEnglishPrompt(form: FormState): string {
  const field = form.field.trim() || "the relevant research field";
  const topic = form.topic.trim();
  const context = form.context.trim() || "No extra context was provided. Please ask clarifying questions if important information is missing.";
  const outputItems = outputFormatMap[form.target].map((item, index) => `${index + 1}. ${item}`).join("\n");

  return `Role
You are an academic research advisor specializing in ${field}.

Context
I am working at the ${form.level} level. My rough research topic is: "${topic}".
Additional background or constraints:
${context}

Task
${taskMap[form.target]}

Requirements
- Be specific and practical.
- Point out possible problems in the topic, scope, assumptions, data access, or methodology.
- Suggest realistic research questions that could be investigated with available sources or data.
- Avoid making unsupported claims.
- Do not invent citations, sources, statistics, or data.
- Explain limitations clearly.
- Help me follow academic integrity rules. Do not write a final thesis for submission.
- Use ${form.language} as the response language.

Output Format
Please structure your answer using these sections:
${outputItems}`;
}

function buildJapanesePrompt(form: FormState): string {
  const field = form.field.trim() || "関連する研究分野";
  const topic = form.topic.trim();
  const context = form.context.trim() || "追加の背景はまだありません。重要な情報が不足している場合は、先に確認質問をしてください。";
  const outputItems = outputFormatMapJa[form.target].map((item, index) => `${index + 1}. ${item}`).join("\n");

  return `役割
あなたは「${field}」を専門とする学術研究アドバイザーです。

背景
私は「${levelLabels.ja[form.level]}」レベルで研究・レポート作成を進めています。
現在の大まかな研究テーマは「${topic}」です。
追加の背景・条件:
${context}

タスク
${taskMapJa[form.target]}

要件
- 具体的で実用的に説明してください。
- テーマ、範囲、前提、データ入手、方法論に問題があれば指摘してください。
- 現実的に調査できる研究質問を提案してください。
- 根拠のない断定は避けてください。
- 架空の引用、資料、統計、データを作らないでください。
- 限界を明確に説明してください。
- 学術倫理を守れるように助言してください。提出用の最終論文を代筆しないでください。
- 回答は${languageLabels.ja[form.language]}で書いてください。

出力形式
以下の見出しで整理してください:
${outputItems}`;
}

const examplePromptEn = `Role
You are an academic research advisor specializing in economics.

Context
I am an undergraduate student writing a thesis about AI investment advice and university students. I am interested in how students evaluate AI-generated financial suggestions, but I do not have access to private investment records.

Task
Help me refine this broad idea into a clear, focused, feasible research topic.

Requirements
- Be specific and practical.
- Point out possible problems.
- Suggest realistic research questions.
- Avoid making unsupported claims.
- Do not invent citations, sources, statistics, or data.
- Explain limitations clearly.
- Use English as the response language.

Output Format
1. Feasibility analysis
2. Refined research topic options
3. Possible research questions
4. Suggested methodology
5. Data/source suggestions
6. Risks and limitations
7. Next steps`;

const examplePromptJa = `役割
あなたは経済学を専門とする学術研究アドバイザーです。

背景
私は学部生で、「AIによる投資アドバイスと大学生」について卒論を書こうとしています。学生がAIの金融アドバイスをどのように評価するかに関心がありますが、個人の投資記録にはアクセスできません。

タスク
この曖昧なアイデアを、明確で焦点があり、実行可能な研究テーマに絞り込んでください。

要件
- 具体的で実用的に説明してください。
- 起こりそうな問題点を指摘してください。
- 現実的に調査できる研究質問を提案してください。
- 根拠のない断定は避けてください。
- 架空の引用、資料、統計、データを作らないでください。
- 限界を明確に説明してください。
- 回答は日本語で書いてください。

出力形式
1. 実現可能性の分析
2. 絞り込んだ研究テーマ案
3. 考えられる研究質問
4. 方法論の提案
5. データ・資料の候補
6. リスクと限界
7. 次にやること`;

export default function ResearchPromptAssistant({ locale = "en" }: { locale?: Locale }) {
  const normalizedLocale: Locale = locale === "ja" ? "ja" : "en";
  const [form, setForm] = useState<FormState>(() => defaultFormForLocale(normalizedLocale));
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const canCopy = useMemo(() => prompt.trim().length > 0, [prompt]);
  const ui = normalizedLocale === "ja" ? {
    formAria: "研究プロンプトフォーム",
    field: "研究分野",
    fieldPlaceholder: "例: 経済学、教育学、言語学、社会学、経営学、メディア研究...",
    topic: "研究テーマ",
    topicPlaceholder: "例: AI投資アドバイスと大学生",
    level: "学術レベル",
    target: "目的",
    language: "回答言語",
    context: "背景・条件",
    contextPlaceholder: "授業の条件、使えるデータ、締切、AIに考慮してほしいことを書いてください。",
    generate: "Promptを生成",
    copy: "Promptをコピー",
    clear: "フォームをクリア",
    copyExample: "例をコピー",
    outputAria: "生成されたプロンプト",
    outputEyebrow: "生成されたPrompt",
    outputTitle: "AIツールにコピーして使えます",
    outputPlaceholder: "生成された構造化プロンプトがここに表示されます。コピー前に編集できます。",
    topicError: "研究テーマを入力してください。",
    copied: "Promptをコピーしました。",
    exampleCopied: "例のPromptをコピーしました。",
    copyFailed: "コピーに失敗しました。テキストを選択して手動でコピーしてください。",
    templateTools: "テンプレート言語",
    englishTemplate: "英語テンプレート",
    japaneseTemplate: "日本語テンプレート"
  } : {
    formAria: "Research prompt form",
    field: "Research field",
    fieldPlaceholder: "Economics, Education, Linguistics, Sociology, Business, Media Studies...",
    topic: "Research topic",
    topicPlaceholder: "AI investment advice and university students",
    level: "Academic level",
    target: "Target output",
    language: "Preferred language",
    context: "User background / extra context",
    contextPlaceholder: "Describe your current idea, course requirements, data access, deadline, or anything the AI should consider.",
    generate: "Generate Prompt",
    copy: "Copy Prompt",
    clear: "Clear Form",
    copyExample: "Copy Example Prompt",
    outputAria: "Generated prompt",
    outputEyebrow: "Generated Prompt",
    outputTitle: "Copy this into your AI tool",
    outputPlaceholder: "Your generated structured prompt will appear here. You can edit it before copying.",
    topicError: "Please enter a research topic first.",
    copied: "Prompt copied.",
    exampleCopied: "Example prompt copied.",
    copyFailed: "Copy failed. Please select the text and copy it manually.",
    templateTools: "Template language",
    englishTemplate: "English template",
    japaneseTemplate: "Japanese template"
  };

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "topic" && value.trim()) setError("");
  };

  const generatePrompt = () => {
    if (!form.topic.trim()) {
      setError(ui.topicError);
      return;
    }
    setError("");
    setCopyStatus("");
    setPrompt(buildPrompt(form, normalizedLocale));
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

  const generateTemplate = (templateLocale: Locale, responseLanguage: PreferredLanguage) => {
    if (!form.topic.trim()) {
      setError(ui.topicError);
      return;
    }
    const nextForm = { ...form, language: responseLanguage };
    setForm(nextForm);
    setError("");
    setCopyStatus("");
    setPrompt(buildPrompt(nextForm, templateLocale));
  };

  return (
    <div className="research-tool-shell">
      <section className="research-tool-form" aria-label={ui.formAria}>
        <label>
          <span>{ui.field}</span>
          <input
            value={form.field}
            onChange={(event) => updateField("field", event.target.value)}
            placeholder={ui.fieldPlaceholder}
          />
        </label>

        <label>
          <span>{ui.topic} <strong aria-hidden="true">*</strong></span>
          <input
            value={form.topic}
            onChange={(event) => updateField("topic", event.target.value)}
            placeholder={ui.topicPlaceholder}
            aria-invalid={error ? "true" : "false"}
          />
        </label>

        <label>
          <span>{ui.level}</span>
          <select value={form.level} onChange={(event) => updateField("level", event.target.value)}>
            {academicLevels.map((level) => <option key={level} value={level}>{levelLabels[normalizedLocale][level]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.target}</span>
          <select value={form.target} onChange={(event) => updateField("target", event.target.value)}>
            {targetOutputs.map((target) => <option key={target} value={target}>{targetLabels[normalizedLocale][target]}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.language}</span>
          <select value={form.language} onChange={(event) => updateField("language", event.target.value)}>
            {languages.map((language) => <option key={language} value={language}>{languageLabels[normalizedLocale][language]}</option>)}
          </select>
        </label>

        <label className="research-tool-form__wide">
          <span>{ui.context}</span>
          <textarea
            value={form.context}
            onChange={(event) => updateField("context", event.target.value)}
            placeholder={ui.contextPlaceholder}
            rows={6}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="research-tool-actions">
          <button type="button" onClick={generatePrompt}>{ui.generate}</button>
          <button type="button" onClick={() => canCopy && copyText(prompt, ui.copied)} disabled={!canCopy}>{ui.copy}</button>
          <button type="button" onClick={clearForm}>{ui.clear}</button>
          <button type="button" onClick={() => copyText(normalizedLocale === "ja" ? examplePromptJa : examplePromptEn, ui.exampleCopied)}>{ui.copyExample}</button>
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
        <div className="template-switch-actions" aria-label={ui.templateTools}>
          <button type="button" onClick={() => generateTemplate("ja", "Japanese")}>{ui.japaneseTemplate}</button>
          <button type="button" onClick={() => generateTemplate("en", "English")}>{ui.englishTemplate}</button>
        </div>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={ui.outputPlaceholder}
          rows={20}
        />
      </section>
    </div>
  );
}


