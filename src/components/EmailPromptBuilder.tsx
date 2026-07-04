import { useMemo, useState } from "react";

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

const defaultForm: FormState = {
  emailType: "Request",
  recipient: "Professor",
  relationship: "Formal",
  tone: "Polite",
  language: "English",
  roughMessage: "",
  extraContext: "",
  outputPreference: "Draft a new email"
};

const emailTypes: EmailType[] = ["Request", "Apology", "Thank-you", "Follow-up", "Reminder", "Reschedule", "Job application", "Professor / academic email", "Client reply", "Polite refusal", "Other"];
const recipients: Recipient[] = ["Professor", "Client", "Manager", "Colleague", "Customer", "School office", "Recruiter", "Friend / casual contact", "Other"];
const relationships: Relationship[] = ["Very formal", "Formal", "Semi-formal", "Friendly but polite", "Casual"];
const tones: Tone[] = ["Polite", "Very polite", "Friendly", "Professional", "Concise", "Apologetic", "Firm but respectful", "Japanese keigo style"];
const languages: PreferredLanguage[] = ["English", "Japanese", "Chinese"];
const outputPreferences: OutputPreference[] = ["Draft a new email", "Rewrite my rough message", "Make it more polite", "Make it shorter", "Make it more natural", "Create multiple versions"];

const taskMap: Record<OutputPreference, string> = {
  "Draft a new email": "Draft a complete email based on my rough situation and context.",
  "Rewrite my rough message": "Rewrite my rough message into a clear, natural, and context-appropriate email.",
  "Make it more polite": "Make the message more polite while keeping it natural and not exaggerated.",
  "Make it shorter": "Create a shorter version that keeps the essential meaning and respectful tone.",
  "Make it more natural": "Make the message sound more natural for the selected recipient, relationship, tone, and language.",
  "Create multiple versions": "Create several usable versions with different levels of directness or formality."
};

const outputFormatMap: Record<OutputPreference, string[]> = {
  "Draft a new email": ["Subject line", "Email body", "Tone notes", "Optional shorter version"],
  "Rewrite my rough message": ["Subject line when appropriate", "Rewritten email body", "Tone notes", "Optional shorter version"],
  "Make it more polite": ["Subject line when appropriate", "More polite email body", "Tone notes", "Optional shorter version"],
  "Make it shorter": ["Subject line when appropriate", "Concise email body", "Tone notes", "Optional fuller version"],
  "Make it more natural": ["Subject line when appropriate", "Natural email body", "Tone notes", "Optional alternative version"],
  "Create multiple versions": ["Subject line options", "Version 1: standard", "Version 2: shorter", "Version 3: softer or more formal", "Tone notes"]
};

const examples: ExamplePreset[] = [
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

function buildPrompt(form: FormState): string {
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

const examplePrompt = `Role
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

export default function EmailPromptBuilder() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const canCopy = useMemo(() => prompt.trim().length > 0, [prompt]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "roughMessage" && value.trim()) setError("");
  };

  const applyExample = (example: ExamplePreset) => {
    setForm(example.form);
    setPrompt("");
    setError("");
    setCopyStatus(`${example.label} loaded.`);
  };

  const generatePrompt = () => {
    if (!form.roughMessage.trim()) {
      setError("Please enter your rough message first.");
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
      setCopyStatus("Copy failed. Please select the text and copy it manually.");
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
      <section className="research-tool-form" aria-label="Email prompt form">
        <div className="example-fill-buttons research-tool-form__wide" aria-label="Example presets">
          {examples.map((example) => (
            <button type="button" key={example.label} onClick={() => applyExample(example)}>{example.label}</button>
          ))}
        </div>

        <label>
          <span>Email type</span>
          <select value={form.emailType} onChange={(event) => updateField("emailType", event.target.value)}>
            {emailTypes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Recipient</span>
          <select value={form.recipient} onChange={(event) => updateField("recipient", event.target.value)}>
            {recipients.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Relationship / distance</span>
          <select value={form.relationship} onChange={(event) => updateField("relationship", event.target.value)}>
            {relationships.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Tone</span>
          <select value={form.tone} onChange={(event) => updateField("tone", event.target.value)}>
            {tones.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Preferred language</span>
          <select value={form.language} onChange={(event) => updateField("language", event.target.value)}>
            {languages.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label>
          <span>Output preference</span>
          <select value={form.outputPreference} onChange={(event) => updateField("outputPreference", event.target.value)}>
            {outputPreferences.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="research-tool-form__wide">
          <span>Rough message <strong aria-hidden="true">*</strong></span>
          <textarea
            value={form.roughMessage}
            onChange={(event) => updateField("roughMessage", event.target.value)}
            placeholder="Example: I want to ask my professor if I can submit the report two days late because I was sick."
            rows={5}
            aria-invalid={error ? "true" : "false"}
          />
        </label>

        <label className="research-tool-form__wide">
          <span>Extra context</span>
          <textarea
            value={form.extraContext}
            onChange={(event) => updateField("extraContext", event.target.value)}
            placeholder="Example: This is my seminar professor. I want to sound polite, responsible, and not too casual."
            rows={5}
          />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="research-tool-actions">
          <button type="button" onClick={generatePrompt}>Generate Prompt</button>
          <button type="button" onClick={() => canCopy && copyText(prompt, "Prompt copied.")} disabled={!canCopy}>Copy Prompt</button>
          <button type="button" onClick={clearForm}>Clear Form</button>
          <button type="button" onClick={() => copyText(examplePrompt, "Example prompt copied.")}>Copy Example Prompt</button>
        </div>
      </section>

      <section className="research-tool-output" aria-label="Generated prompt">
        <div className="research-tool-output__head">
          <div>
            <p className="eyebrow">Generated Prompt</p>
            <h2>Copy this into your AI tool</h2>
          </div>
          {copyStatus && <span role="status">{copyStatus}</span>}
        </div>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Your generated structured email prompt will appear here. You can edit it before copying."
          rows={20}
        />
      </section>
    </div>
  );
}
