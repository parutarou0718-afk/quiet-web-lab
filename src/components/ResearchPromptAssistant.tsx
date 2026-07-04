import { useMemo, useState } from "react";

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

const defaultForm: FormState = {
  field: "",
  topic: "",
  level: "Undergraduate",
  target: "Refine my research topic",
  language: "English",
  context: ""
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

const taskMap: Record<TargetOutput, string> = {
  "Refine my research topic": "Help me refine this broad idea into a clear, focused, feasible research topic.",
  "Generate thesis outline": "Create a realistic thesis or report outline based on this topic and academic level.",
  "Create research questions": "Generate specific and researchable questions that match this topic, level, and field.",
  "Suggest methodology": "Suggest suitable research methods, possible data sources, and realistic analysis approaches.",
  "Plan literature review": "Plan a literature review structure, key search themes, and categories of sources to investigate.",
  "Evaluate feasibility": "Evaluate whether this topic is feasible, identify risks, and suggest ways to narrow it.",
  "Improve my research proposal": "Improve the research proposal structure, logic, feasibility, and next steps."
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

function buildPrompt(form: FormState): string {
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

const examplePrompt = `Role
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

export default function ResearchPromptAssistant({ locale = "en" }: { locale?: "en" | "ja" }) {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const canCopy = useMemo(() => prompt.trim().length > 0, [prompt]);
  const ui = locale === "ja" ? {
    formAria: "研究プロンプトフォーム",
    field: "研究分野",
    fieldPlaceholder: "Economics, Education, Linguistics, Sociology, Business, Media Studies...",
    topic: "研究テーマ",
    topicPlaceholder: "AI investment advice and university students",
    level: "学術レベル",
    target: "目的",
    language: "回答言語",
    context: "背景・条件",
    contextPlaceholder: "授業の条件、使えるデータ、締切、AIに考慮してほしいことを書いてください。",
    generate: "Promptを生成",
    copy: "Promptをコピー",
    clear: "フォームをクリア",
    copyExample: "例をコピー",
    outputEyebrow: "生成されたPrompt",
    outputTitle: "AIツールにコピーして使えます",
    outputPlaceholder: "生成された構造化プロンプトがここに表示されます。コピー前に編集できます。",
    topicError: "研究テーマを入力してください。",
    copied: "Promptをコピーしました。",
    exampleCopied: "例のPromptをコピーしました。",
    copyFailed: "コピーに失敗しました。テキストを選択して手動でコピーしてください。"
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
    outputEyebrow: "Generated Prompt",
    outputTitle: "Copy this into your AI tool",
    outputPlaceholder: "Your generated structured prompt will appear here. You can edit it before copying.",
    topicError: "Please enter a research topic first.",
    copied: "Prompt copied.",
    exampleCopied: "Example prompt copied.",
    copyFailed: "Copy failed. Please select the text and copy it manually."
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
    setPrompt(buildPrompt(form));
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
    setForm(defaultForm);
    setPrompt("");
    setError("");
    setCopyStatus("");
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
            {academicLevels.map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.target}</span>
          <select value={form.target} onChange={(event) => updateField("target", event.target.value)}>
            {targetOutputs.map((target) => <option key={target} value={target}>{target}</option>)}
          </select>
        </label>

        <label>
          <span>{ui.language}</span>
          <select value={form.language} onChange={(event) => updateField("language", event.target.value)}>
            {languages.map((language) => <option key={language} value={language}>{language}</option>)}
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
          <button type="button" onClick={() => copyText(examplePrompt, ui.exampleCopied)}>{ui.copyExample}</button>
        </div>
      </section>

      <section className="research-tool-output" aria-label="Generated prompt">
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
      </section>
    </div>
  );
}

