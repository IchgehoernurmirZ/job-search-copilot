---
name: job-search-copilot
description: End-to-end job search workflow for one person - first-time setup of their profile and evidence library, honest fit scoring of a posting, a tailored one-page resume (DOCX + PDF), an application tracker, a daily LinkedIn screening run, and interview prep and debriefs. Use whenever the user shares a job link or job description, asks "should I apply", "is this a good fit", "tailor my resume", "write a cover letter", 分析一下匹配度, 定制简历, wants to run today's job search, log an application, check how applications are going, or prepare for / debrief an interview. Also use when they say "set up my job search" or have not set it up yet.
---

# Job search copilot

One person, one job search, run the same way every time. The value is not any
single resume; it is that every resume is assembled from a **fixed inventory
of true things**, every decision is recorded, and the rules the user settles
on stick instead of being re-argued each session.

## Language

Reply in whatever language the user is writing in. Working notes,
assessments and tracker notes follow the user's language. Resumes, cover
letters and interview answers are written in the language of the job
posting (usually English) unless the user says otherwise.

## Before anything else: is setup done?

The workflow depends on these files about the user. Look for them in the
Claude Project's files, in memory, or in the conversation:

| File | What it holds |
|---|---|
| `profile.md` | Name as it should appear, contact line, location, work authorization, target roles, level band, salary range |
| `evidence-library.md` | Every role, project and credential with locked dates and titles, verified numbers, and pre-approved bullet variants |
| `criteria.md` | Exclusions, preferences, weekly pace, tiers, resume house rules, and every rule the user has settled |
| `form-answers.md` | Reusable answers to recurring application-form questions (can start nearly empty) |

In the two-file layout (see "Saving the user's files") these are four
sections of one `job-search-workspace.md`.

**If they're missing and the user arrived with a job posting:** don't make
them wait through full setup. Follow setup's quick-start path: read their
resume, ask the four essential questions, give the assessment, and build
the rest of the library while making the resume, aimed at this posting's
gaps. **If they're missing and there's no posting:** run full setup
(`references/setup.md`).

## Pick the module

| The user wants... | Read |
|---|---|
| First-time setup, or to add a new experience to the library | `references/setup.md` |
| Fit check / should I apply / tailored resume for one posting | `references/tailor.md` |
| "Run today's job search" / find new postings / "help me apply to the ones I picked" | `references/daily-screen.md` |
| A cover letter | `references/tailor.md` Step 7b |
| Fill in an application form, answer form questions | `references/tailor.md` Step 8 + `form-answers.md` |
| Log an application, update status, "how are my applications doing" | `references/tracker.md` |
| Find a referral, draft outreach to someone at a company | `references/networking.md` |
| Prepare for an interview, or debrief after one | `references/interview.md` |

Several modules often chain in one session: screen, then tailor the best
ones, then log them. Read each reference when you reach that step, not all
up front.

## Rules that apply everywhere

**Truth.** Never invent a number, title, tool, date or outcome. Reframing a
real thing toward the JD's vocabulary is expected; inflating it is not. If
the user can't defend a line in an interview, it does not go on the page.
When the library has no evidence for a requirement, ask the user whether
they have done it, with a concrete question ("did you ever write release
notes or a launch announcement there?"). If they did it but forget the
exact figure, you may propose a reasonable estimate from context, mark it
as an estimate, and only use it after they confirm.

Truth beats every formatting rule. "Fill the page" and "three bullets per
role" are goals to reach with real material; when the real material runs
out, a resume that ends at 80% of the page is correct and a padded one is
not. Job titles stay exactly as the employer gave them (say what the work
was in the bullets, not by renaming the role) unless the user has settled
otherwise in `criteria.md`.

**The library wins.** If the evidence library and your instinct disagree
about a date, title or number, the library wins. It should match the user's
LinkedIn so a background check never contradicts the resume.

**Settled rules stay settled.** When the user states a rule they will want
applied next time ("never put my freelance work on", "don't save roles that
need fluent French"), add it to `criteria.md` (see "Saving the user's files"
below). Do not re-litigate settled rules; apply them.

**Decision points, not narration.** Show your work where the user has to
choose (which roles to include, whether to apply, a framing you disagree
with) and stay quiet in between. Give a recommendation with a reason, then
do it their way if they disagree.

**Pace over volume.** A job search is a long run. Respect the weekly pace
in `criteria.md` (days off, weekly caps). If the user says they're
stretched thin or taking a break, don't schedule job-search work in that
window, and when they come back, ask how far back to look rather than
dumping everything they missed.

**Never act on their behalf without a yes.** Draft messages and emails, do
not send them. Do not submit applications. Do not write tracker entries for
applications they have not confirmed.

## Saving the user's files

These files must persist across chats. In order of preference:

1. **A tool that writes to the Claude Project** (a Projects tool): write
   the files there directly, as separate files.
2. **A connected Notion or Google Drive** the user wants as home base: keep
   the files there.
3. **Neither (the common case on claude.ai): use the two-file layout**, so
   the user only ever replaces one or two files:
   - `job-search-workspace.md`: profile, evidence library, criteria and
     form answers as four sections
   - `applications.md`: the tracker table plus one notes section per
     application, newest first (see `tracker.md`)
   Hand back the full updated file at the end of a session in which it
   changed (not after every small edit), with one line: "replace
   `applications.md` in your Project files with this one."
4. **Not in a Project at all:** same two files. Tell them once that a
   Project saves them from re-attaching the files in every new chat; until
   then, they attach both files when they start a chat.

Short durable rules can also go to memory if memory is on, but the files
are the source of truth.
