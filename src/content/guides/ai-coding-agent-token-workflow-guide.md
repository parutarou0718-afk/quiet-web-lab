---
title: "AI Coding Agent Token Workflow Guide"
description: "A practical guide for using coding agents without wasting tokens: define behavior first, test on real machines, and save engineering rules as reusable Skills."
coverImage: "/images/covers/ai-development-guide-cover.webp"
date: 2026-07-15
author: "Quiet Web Lab"
category: "AI Implementation Guide"
tags: ["AI coding", "Codex", "workflow", "local tools"]
---

This guide comes from building a Windows local FAX monitoring tool with an AI coding agent. The tool watches a shared folder, identifies documents such as AN and DO files, groups them by business number, and reminds operators on the desktop.

The project was not difficult because the code was impossible. It became expensive because product decisions, performance limits, and recovery rules were not clear enough before implementation started.

## 1. Token waste often starts before coding

A common mistake is to ask the coding agent to "make it like the reference image" and then fix the result repeatedly.

Reference images can show layout and visual direction, but they do not define behavior. They do not explain what happens when a button is clicked, which area can be dragged, when unread items become read, whether archive actions can be undone, or whether the main page should show raw files or grouped business records.

If those rules are missing, the agent has to guess. Every wrong guess forces another round of context reading, code editing, testing, and packaging.

A better workflow is:

1. Write the required behaviors in plain language.
2. Separate "must do" from "must not do".
3. Define button actions and recovery rules.
4. Decide what each screen represents.
5. Give the coding agent the fixed scope only after those decisions are stable.

The goal is not to write a perfect PRD. The goal is to stop using the most expensive coding context to discover basic product behavior.

## 2. Local performance is part of the product

The FAX monitoring tool needed OCR, but local OCR changed the real delivery problem.

On a development machine, a heavy OCR setup may still run. On a normal office PC, the same workflow can push memory and CPU too high. A tool that opens on the developer's machine is not necessarily ready for a customer desk.

For local document tools, performance rules should be written into the design:

1. Do not OCR text-based PDFs.
2. Initialize OCR models once and reuse them.
3. Keep network reads, copying, OCR, and history scanning away from the UI thread.
4. Treat historical backfill as a user-triggered task, not part of normal startup.
5. Put uncertain OCR results into a manual confirmation queue.
6. Test on the kind of computer that will actually run the tool.

This avoids discovering too late that the architecture itself is too heavy for the target environment.

## 3. Reusable Skills should preserve engineering rules

After the tool was built, the useful lesson was not "AI can write code." The useful lesson was that repeated engineering rules should be stored somewhere the next project can reuse.

For file monitoring and notification systems, the rules included:

1. Treat shared source folders as read-only inputs.
2. Copy new files into a local staging area before processing.
3. Use real incremental monitoring instead of repeatedly scanning all history.
4. Never let OCR failure silently discard a file.
5. Make notifications visible after the user returns to the computer.
6. Keep archive, complete, and ignore actions reversible.
7. Let submodules output facts, while the main workflow decides the business action.

These rules became the basis of a reusable Codex Skill for perception and notification systems.

GitHub guide repository:

[perception-notification-system-design](https://github.com/parutarou0718-afk/perception-notification-system-design)

## Practical takeaway

Coding agents are most useful after product behavior, safety boundaries, and performance expectations are clear.

Use ordinary conversation and simple documents to shape the idea. Use prototypes or design tools to settle the interface. Then use the coding agent for architecture, implementation, tests, packaging, and review.

That workflow does not make token cost disappear, but it makes the spending more intentional.
