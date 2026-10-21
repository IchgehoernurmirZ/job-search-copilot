# Job Search Copilot

A Claude skill that runs a job search the same way every time: honest fit
checks on postings, one-page tailored resumes built only from things you've
actually done, an application tracker, a daily screen for new roles, and
interview prep and debriefs.

It came out of one real job search (130+ applications over two months) and
the rules that search settled on. The point isn't any single resume. It's
that every resume is assembled from a fixed library of true facts, every
decision gets recorded, and the rules you set once stick.

## What it does

| You say | Claude does |
|---|---|
| "Run today's job search" | Finds today's new postings, filters by your rules, gives you a short list (10 max by default). You pick, then it builds the resumes and form answers for the ones you picked in one batch. With Claude in Chrome connected it searches LinkedIn itself; without it, you paste links |
| Paste a job link / "is this worth applying to?" | Two scores (can you do it / is it worth your time), every requirement matched to your experience, gaps named with a course or project that would close them, your edge over other applicants, company reputation and red flags |
| "Tailor my resume" | A plan for you to approve, then a one-page DOCX + PDF, checked for overflow, filler words and page fill |
| "Write a cover letter" | One page from your real material, only when a posting requires it |
| "Help me with this application form" | Honest answers drafted from a reusable answer bank that grows with each application |
| "I applied" | Logged with the full job description, so you still have it when the posting comes down |
| "I have an interview Tuesday" | A prep doc: likely questions, answers built from your experience, how to handle gaps, how to talk salary |
| "Just finished the interview" | A debrief: where you got stuck, why, and what to say next time |
| "How are my applications doing?" | Reply rates by fit score, effort level, job family and referral vs cold, and what the numbers say to change |
| "Do I know anyone at X?" | Drafts a referral message to your contact. Never sends anything. Off unless you turn it on |

## Install

1. In Claude, turn on code execution: **Settings → Capabilities → Code execution and file creation**. (On Team / Enterprise plans an admin does this.)
2. Download [`job-search-copilot.zip`](https://github.com/IchgehoernurmirZ/job-search-copilot/raw/main/job-search-copilot.zip) (or zip the `job-search-copilot/` folder yourself).
3. **Customize → Skills → + → Create skill → Upload a skill**, choose the zip.
4. Toggle it on.

Want to see it work first? Start a chat and say **"try a demo"**. Claude runs a full fit check and builds a one-page resume for the author (companies anonymized, numbers changed) against a real posting she applied to, in about two minutes, without asking you anything.

When you're ready, start a chat and say **"set up my job search"** with your current resume attached. Setup takes about 15 to 20 minutes, once. Already have a posting you want to look at? Paste it with your resume and Claude gives you a provisional fit check first.

A Claude **Project** is recommended: Claude keeps what it learns about you in two files you add to the Project, so every future chat can read them. Without a Project it still works; you attach the two files when you start a chat.

Optional connections that make it better:

- **Notion** or **Google Drive**: your files and tracker live there and update automatically.
- **Claude in Chrome**, logged into LinkedIn: makes "Run today's job search" fully hands-off. Read the disclaimer below first.

The full user guide is in [QUICK_START.md](QUICK_START.md).

## Using without Claude (ChatGPT, Gemini, DeepSeek, Kimi, others)

The workflow is a set of rules, not Claude-specific code, so most of it
runs on any capable chat model. The repo ships a portable version:

1. Open [PORTABLE_PROMPT.md](PORTABLE_PROMPT.md) and copy everything below
   the line.
2. Paste it as the instructions of a **ChatGPT Project** or **custom GPT**,
   a **Gemini Gem**, or the system prompt of any assistant that lets you set
   one (DeepSeek, Kimi, Qwen and similar work too). Start a chat and say
   "set up my job search" with your resume.
3. Your data lives in one document the assistant prints at the end of each
   session; save it and paste it back at the start of the next one. Models
   with their own project memory can keep it there instead.
4. For the resume, the assistant writes it in a fixed Markdown shape; paste
   that into [`resume-template.docx`](job-search-copilot/templates/resume-template.docx),
   a blank one-page template with the same look the Claude version produces.

What you get: setup and the evidence library, honest fit checks with the
edge and recency reads, tailored resumes and cover letters, the form-answer
bank, the tracker, interview prep and debriefs, calibration.

What you don't: the auto-built DOCX and its programmatic checks, and the
browser-based daily screen (you paste links instead). The prompt is also
exactly what you'd paste to publish a custom GPT or Gem of your own.

## How it keeps you honest

- It only writes true things. If something isn't in your evidence library it asks "have you ever done X?". Yes goes in; no gets flagged as a gap, never invented.
- Job titles stay exactly as your employer gave them.
- A short work history means a resume that ends before the bottom of the page. It won't pad.
- Form questions that push you to overstate get the honest option first. If you round up anyway, it's recorded so your interview answer matches.
- It never sends a message, submits an application, or logs something you haven't confirmed.

## What's in the box

```
job-search-copilot/
  SKILL.md                 what Claude reads first
  references/              one file per module: setup, tailor, daily screen,
                           tracker, interview, networking, demo
  demo/                    the author's anonymized profile and a real posting, for "try a demo"
  templates/               the files Claude creates for you, plus a blank
                           one-page resume-template.docx for non-Claude use
  scripts/build_resume.js  one-page resume renderer (JSON spec in, DOCX out)
  scripts/qc.sh            resume checks: page count, filler words, page fill
  scripts/example-spec.json
PORTABLE_PROMPT.md         the whole workflow as one prompt for other assistants
QUICK_START.md             user guide
site/index.html            landing page source
```

The resume renderer needs Node with the `docx` package and LibreOffice for the PDF step. Both are present in Claude's code execution environment.

## Disclaimer, please read

**LinkedIn automation.** The optional browser mode has Claude search LinkedIn, fetch postings and click Save on your account. Automated access like this is against [LinkedIn's User Agreement](https://www.linkedin.com/legal/user-agreement), and accounts have been restricted or banned for it. It is off by default and only runs when you turn it on. If you do, you do so on your own account, at your own risk, and you should expect that LinkedIn may act on it. The paste mode (you give Claude links) involves no automation and is the safe default.

**Not career, legal or financial advice.** The fit scores, company research and recommendations are an AI's reading of public information and your own notes. They can be wrong. Company ratings come from third-party review sites with their own biases. You decide where to apply, what to submit and what to say.

**You own what you submit.** The skill is built to stay truthful, but it works from what you tell it. Check every resume, cover letter and form answer before it goes out. Claims on an application are yours, not the tool's.

**Your data.** Your profile, evidence library and tracker are ordinary text files that live in your Claude Project (or your Notion / Drive if you connect them). The skill sends nothing anywhere else. Don't put government ID numbers, bank details or a date of birth in those files; nothing in the workflow needs them.

## Contributing

Issues and pull requests welcome, especially: fixes for sites other than LinkedIn in paste mode, better base-resume handling for other fields, and translations of QUICK_START.md. Keep the truth rules intact in any change.

## License

MIT, see [LICENSE](LICENSE). Made by zoey z.
