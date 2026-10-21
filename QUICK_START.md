# Job Search Copilot: Quick Start

A skill that lets Claude run your whole job search with you: fit checks on postings, tailored one-page resumes, an application tracker, a daily screen for new roles, and interview prep and debriefs. It replies in whatever language you write in; resumes and interview answers follow the language of the job posting.

## 1. Install (5 minutes)

1. **Turn on code execution**: Settings → Capabilities → turn on "Code execution and file creation" (on Team / Enterprise plans an admin enables this)
2. **Upload the skill**: Customize → Skills → "+" → "Create skill" → "Upload a skill" → choose `job-search-copilot.zip` (download it from the [repo](https://github.com/IchgehoernurmirZ/job-search-copilot/raw/main/job-search-copilot.zip); don't unzip it)
3. Make sure the skill is **toggled on** in your list

## 2. Create a Claude Project (recommended)

Make a Project called "Job Search" and start every job-search chat inside it. Claude keeps everything it learns about you in **two files** that you add to the Project's files, so every future chat can read them:

- `job-search-workspace.md`: your profile and target roles, your **evidence library** (exact dates, titles, numbers and bullet versions for every role; resumes are built only from this), your rules ("no finance roles", "weekends off"), and reusable answers to application-form questions
- `applications.md`: your application tracker plus notes for each application (assessment, form answers, interview prep, and the full job description)

At the end of a session where something changed, Claude hands you the updated file. Replace the old one in the Project. If you connect Notion or Google Drive, Claude can keep these there instead and you skip this step.

No Project? It still works: attach both files whenever you start a new chat.

## 3. Optional connections (nice to have)

| Connect | What it adds |
|---|---|
| **Notion** or **Google Drive** | Your files and tracker live there and update automatically, no replacing files |
| **Claude in Chrome** (browser extension), logged into LinkedIn | Claude searches LinkedIn for you, filters, and clicks Save. This is what makes "Run today's job search" fully hands-off. Without it, you paste the links and Claude ranks them. A browser run takes 20 to 50 minutes and uses a fair amount of your plan's usage |

## 4. Your first session

Not sure yet? Say **try a demo** first. Claude runs the whole flow for the author, Zoey (companies anonymized, numbers changed), against a real posting she applied to (fit check, how to close the gaps, resume plan, a finished one-page resume) in about two minutes. Nothing about you is used or saved.

When you're ready, in the Project, start a chat and say:

> Set up my job search

Then send your **current resume** and your **LinkedIn experience** (link or paste). Claude reads everything first, asks only what it can't tell from those (target roles, location, salary, industries to avoid, how many applications a week feels sustainable, whether you want help with referrals), then walks through your experience with you to build the evidence library. About 15 to 20 minutes, **once**.

Already have a job you want to look at? Paste it with your resume. Claude asks four quick questions and gives you the fit check right away, then fills in the rest of setup while it builds the resume for that job.

## 5. Everyday use

| You say | Claude does |
|---|---|
| "Run today's job search" | Your most-used command. Finds today's new postings, filters out the ones that don't fit your rules, and gives you a short list (10 max by default). You pick, and it goes straight into an apply session: resumes and form answers for the ones you picked, in one batch. With Claude in Chrome connected it searches LinkedIn itself; without it, it asks you to paste the links |
| Paste a job link / "is this worth applying to?" | Two scores (can you do it / is it worth it), each requirement matched to your experience, gaps flagged with how to close them, company reputation and red flags |
| "Tailor my resume" | Shows a plan for you to approve, then a one-page DOCX + PDF, checked for overflow |
| "Help me with this application form" | Drafts answers from your form answers and your experience, honestly, and saves new ones for next time |
| "I applied" | Logs it in your tracker with the full job description (so you still have it if the posting comes down) |
| "Do I know anyone at X?" / "help me ask for a referral" | Drafts a short message to your contact. Never sends anything. Off unless you turn it on |
| "I have an interview with X on Tuesday" | A prep doc: likely questions, answers built from your real experience, how to handle gaps, how to talk salary |
| "Just finished the interview" + transcript or notes | A debrief: where you got stuck, why, and a better way to say it next time |
| "How are my applications doing?" | Response rates by fit score and effort level, and what to change |

## 6. Habits that make it work

- **It only writes true things.** If something isn't in your library, it asks "have you ever done X?" If yes, it goes in; if not, it's flagged as a gap, never invented. With a short work history your resume may end a little before the bottom of the page; that's on purpose, it won't pad
- **To set a rule for next time, just say "from now on..."** and it's saved with your rules
- **Finishing beats finding.** The bottleneck is usually how many applications you can complete, not how many postings exist. If more than 8 picked jobs are waiting, Claude helps you apply to those before looking for new ones
- **Take the days off.** It respects your weekly pace and days off. Tell it when you're taking a break and it won't schedule job-search work then
- **Check in at 20 applications.** Claude will suggest a quick review of response rates once 20 are logged, then every 20 more. Real numbers beat gut feel for deciding where to put effort
- **Referrals usually beat cold applications.** If you're open to it, set referrals to "ask" and Claude will ask one question per serious application: do you know anyone there?

## Not using Claude?

The same workflow runs on ChatGPT, Gemini, DeepSeek, Kimi and most other capable assistants: paste `PORTABLE_PROMPT.md` from the repo as the assistant's instructions, and use `resume-template.docx` for the resume. You lose the auto-built file and the browser search; everything else works. Details in the README.
