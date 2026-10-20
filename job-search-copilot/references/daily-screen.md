# Daily screening run

Goal: from today's new postings, hand the user a short list worth applying
to, with reasons, already saved where they'll find it. Quality over volume.

## Pick the mode

| Mode | Needs | Good for |
|---|---|---|
| **B. Paste mode** | Nothing | User pastes 5 to 20 links or their saved-jobs list; Claude reads and ranks. Fast, cheap, reliable |
| **A. Browser run** | Claude in Chrome (or another browser tool), user logged into LinkedIn, computer awake | Full daily sweep, Claude searches and saves jobs for them. Takes 20 to 50 minutes and a lot of usage per run |

"Run today's job search" on its own is the whole request; never make the
user add anything to it. Pick the mode yourself:

- `criteria.md` names a mode → use it.
- Otherwise, a browser tool is connected → browser run. The first time,
  mention once that a run takes 20 to 50 minutes and a fair amount of
  usage, and that paste mode is the lighter option.
- No browser tool → paste mode. Ask in one line for today's links (or
  their LinkedIn saved-jobs list), and say once that connecting Claude in
  Chrome lets Claude do the searching.

Record the mode in `criteria.md` after the first run so later runs don't
ask.

## Before you run: three gates

1. **Day off?** If today is a day off or inside a break in `criteria.md`,
   say so in one line and stop unless they insist.
2. **Backlog.** Count postings already picked (saved, "to apply", or
   resumes generated) but not applied. If it's over the backlog limit in
   `criteria.md` (default 8), **don't screen**. Offer an apply session on
   the backlog instead (see "Apply session" below), or clearing it. The
   bottleneck in a job search is almost never finding postings; it's
   finishing applications.
3. **Gap since last run.** Skipped a day → widen to 48 h; two or more → 72 h;
   more than a week → ask how far back to go.

Default daily cap (adjust in `criteria.md`): **5 core-target saves + 5
volume saves**, and never more than what's left of the weekly pace. An
empty day is fine; never pad the list.

## Mode B: paste mode

Read each link (or pasted text). For LinkedIn links, the full description
is at `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/<id>`; if a
page won't load, ask them to paste the text. Then apply the rule filters,
JD reading and company-health checks from Mode A steps 3 to 5, and rank.
No saving step: they already have the links.

## Mode A: browser run

> **Read before running.** Automated searching, fetching and clicking on
> LinkedIn is against LinkedIn's User Agreement, and accounts have been
> restricted for it. Only run this mode when the user has turned it on
> knowingly (`criteria.md` says `browser run`), on their own account, at the
> polite request rates below, and never in parallel. If LinkedIn shows a
> challenge, a captcha, or a warning, stop immediately and tell the user;
> do not work around it. The user carries the risk; make sure they know it
> the first time.

### 1. Build the queries

From `profile.md` and `criteria.md`, group keywords by job family (3 to 6
titles per group, quoted, OR-joined) and pick locations (city + "Canada" /
country with remote). Show the user the query list the first time and save
it to `criteria.md`.

Search URL pattern (past 24 h, newest first):
```
https://www.linkedin.com/jobs/search/?keywords=<urlencoded>&location=<urlencoded>&f_TPR=r86400&sortBy=DD
```
Use `r172800` for 48 h and `r259200` for 72 h (see the gates above). Don't rely on
LinkedIn's experience-level filter (`f_E`); it drops many real junior roles.
Filter by title instead.

### 2. Pull results

Open **your own new tab** (never drive the tab the user is working in).
Two ways, in order of preference:

- **Guest search endpoint, fetched from inside the LinkedIn tab:**
  `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=...&location=...&f_TPR=r86400&sortBy=DD&start=0`
  returns HTML cards, 10 per page; step `start` by 10 until empty (cap ~200
  per query). Parse with regex (the page blocks `innerHTML`/`DOMParser`).
  Pull job id, title, company, location. Be polite: one request at a time,
  0.6 to 0.9 s apart; on HTTP 429 back off (1.5 s, growing) and retry a few
  times. Use default fetch credentials.
- **Fallback:** navigate the search URL and read the page with the
  browser's page-reading tool, scrolling for more.

Tool return values get truncated around 1 KB. For big results, store them
in `localStorage` (keep it small: LinkedIn's origin has ~5 MB and a full
day's raw results can be several hundred KB; delete old days and keep only a
compact list of seen job ids for de-duplication). Read back the stored
length after writing, because a `try/catch` can silently swallow a
quota error.

For long loops, start them as an async function that returns immediately,
then check progress periodically. Background tabs throttle `setTimeout`;
a Web Worker timer avoids that.

### 3. Filter by rules, cheaply

Before reading any job description:

- Drop job ids already seen on previous days.
- Title exclusions from `criteria.md` (seniority words like senior, lead,
  principal, director, head, VP; intern / co-op if not wanted; sales quota
  titles; whatever else they've excluded). Run every title against **all**
  keyword groups' patterns, not just the group that found it.
- Company exclusions: excluded industries, staffing agencies and job
  aggregators that re-post (keep a growing list in `criteria.md`), and
  companies the user has ruled out. Unescape `&amp;` before matching.
- Location: keep only places they'd actually go.

### 4. Read the survivors

For each, open `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/<id>`
(renders the full description; the search-card snippet and some API
responses are truncated, and years-of-experience or salary often sit at the
end). Extract: required years, salary, applicant count, work arrangement,
language requirements, any technical test in the hiring process. Judge each
against `criteria.md`, and give it a tier (core / volume / skip).

Look for junk posts: generic templates, keyword-stuffed duties, the same
JD posted by several unrelated "companies", identical text re-posted by a
recruiter.

### 5. Company health

For anything you're about to save, look up Glassdoor / Indeed: overall,
recommend rate, recent layoffs. Default: under ~3.3 with negatives
concentrated in the last year → don't save, list it under "skipped for
reputation" so the user can override. Many companies at once → fan out to
parallel sub-agents.

### 6. Save

On each chosen job's page (`https://www.linkedin.com/jobs/view/<id>`), click
Save via a short page script: find the button whose text is exactly "Save",
click, wait, confirm it now reads "Saved". If it already says "Saved", it's a
repost of something handled before, not a new save. Do this in a second tab
so the results tab keeps its state.

## Output

A short report (in the user's language), shown in chat. With a Project
write tool or Notion, also save it as a dated note; in the two-file layout
don't create daily files, just add the kept postings to `applications.md`
as "To apply" rows (the daily note would pile up and nobody rereads it).

- **Saved: core** (≤5): title, company, location / arrangement, salary,
  years asked, applicant count, Fit estimate, tier, which base resume, one
  line of why
- **Saved: volume** (≤5): same, shorter
- **You decide**: borderline ones and why they're borderline (a language
  requirement, an industry edge case, a long commute, a stretch on years)
- **Looked at, didn't save**: one line each with the reason (keeps them
  from wondering "did it miss X?")
- Run stats in one line: raw results → after filters → JDs read → saved

Then stop and ask which ones they'll actually apply to. Anything they
strike is "not applying"; anything kept goes straight into an apply session.
Add any new exclusions or rules they state to `criteria.md`.

## Apply session

Screening only pays off if applications get finished, so the run ends here,
not at the list.

1. Take the kept postings in order of Worth-it score.
2. For each: tier it (`tailor.md` Step 4), build the resume (quick and
   medium tiers in a batch, without a per-posting plan for quick tier), and
   draft any form answers from `form-answers.md`.
3. Hand them over as a batch: one line per posting with the apply link,
   the resume file, and the form answers to paste.
4. Ask them to say "applied" for each one as they go (or at the end). Log
   each per `tracker.md`. What they didn't get to stays as backlog and counts
   toward the backlog limit tomorrow.

If they only have time for two, do the two best, not a rushed ten.

## Optional: schedule it

If scheduling tools are available and they want it daily, offer once to set
up a scheduled task with a self-contained prompt ("Use the
job-search-copilot skill to run today's daily screen..."). Schedule it only
on their working days from `criteria.md`. Note that a browser run needs
their computer awake with Chrome open; in paste mode, a scheduled run can
instead just remind them to drop in links.
