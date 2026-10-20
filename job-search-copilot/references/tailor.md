# One posting in: assessment, tailored resume, tracker entry

Load `profile.md`, `evidence-library.md` and `criteria.md` first. They
override your instincts about what belongs on a resume.

## Step 1. Get the full job description

**Pasted text?** If the user pasted the JD, use it as is and skip both
fetches; ask for the link only if they have one (the tracker stores "none"
otherwise).

**A link?** Fetch the posting and ask for the **full description including
responsibilities and qualifications**. Then fetch a second time asking only
for terminology, because the first pass summarizes and loses the exact nouns
that matter:

> List the key terminology from this posting as short keyword phrases (under
> 100 characters each), grouped by section: (1) every deliverable or artifact
> named in the responsibilities, (2) every action verb, (3) every tool,
> platform or channel, (4) every skill or trait in the qualifications,
> (5) the exact section headers. Short phrases only.

Short phrases stay under the fetch tool's quoting limits and give you the
vocabulary the ATS and hiring manager use. The second pass routinely
surfaces requirements the summary flattened away.

If the page is behind a login or renders only with JavaScript, ask the user
to paste the text, or (LinkedIn) open
`https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/<jobId>` in the
browser, which renders the complete posting. Keep the full text; it goes
into the tracker.

**Duplicate check.** If the tracker already has a posting with the same
company, salary band, location and near-identical duties under a different
poster (a recruiter re-listing), flag it and prefer the company's own
listing.

## Step 2. Read it as the hiring manager would

Before scoring, list **what the employer is actually emphasizing, ranked**.
Look at repetition, position (title, first paragraph, first responsibility)
and wording strength. "Basic familiarity with X" or "nice to have" is a
threshold to mention once; the one or two things repeated throughout are the
spine the Summary, Skills and each role's first bullet should lean toward.

## Step 3. Assess honestly, in two scores

Score separately, each 0 to 10:

- **Fit**: can they do this job, judged against the evidence library (not
  against how good the tailored resume could look)
- **Worth it**: is it worth their time (pay vs. their range, company
  health, commute or remote, growth, how much they'd enjoy the work)

They come apart constantly and collapsing them hides the real decision.

Build a **JD requirement → evidence** table. Every row: one requirement,
must-have or nice-to-have (based on "required / minimum" vs "preferred /
asset" wording), the matching evidence, and strength. Requirements with no
match get a row marked **GAP**. A gap on a must-have caps the Fit score and
is named plainly.

**Edge and recency.** Two things a match score does not capture, and
that in practice predict replies better than the score:

- **Edge**: the one thing this person has that most applicants for this
  posting will not (a language, a rare domain, having been the exact user
  of the product, a scarce tool). One line. If there is none, say "no
  particular edge", which is useful information, not a failure. A posting
  where the edge is real can be worth applying to at a Fit of 6.
- **Recency**: does their most recent role's family match the posting's
  family? Screeners often filter on the latest title before reading
  anything else. If the match comes from an older role, say so: a
  beautifully tailored resume will not get around that filter, so this
  application belongs in a lower tier, or it needs a referral.

**Years of experience.** Count months in roles that do the same kind of
work the JD asks for (adjacent roles count when the JD says "or a related
role"; internships count if the JD says so or doesn't exclude them). Say
which roles you counted. Overlapping roles count once.

Research the company (needs web search; Glassdoor pages often block
fetching, so search for the rating snippets and Indeed / news instead):
Glassdoor or Indeed overall rating, recommend-to-friend
rate, work-life balance and senior leadership sub-scores, recent layoffs,
anything odd in the posting. Report red flags with evidence, and say when a
signal is weak (11 reviews is not data; a parent company's score can hide a
subsidiary's). Check against the hard exclusions in `criteria.md` and lead
with any hit.

If you can't research (no web access, nothing found), say so in one line
and mark **Worth it** as provisional.

**Salary.** Compare the posted band with their range. If the band sits
above their range, the form number is at least the band's midpoint, not
their old floor; if it sits below, say so in the assessment and let them
decide whether to apply.

Close with a recommendation and up to three interview questions: aimed at
the red flags if there are any, otherwise at the things the JD leaves
unclear (team size, how success is measured, what the first 90 days look
like).

## Step 4. Choose the tier

Not every application deserves a custom build. Use the tiers in
`criteria.md`; the defaults are:

| Tier | When | What you do |
|---|---|---|
| **Full tailor** | High fit, they really want it | Steps 5 to 7 in full, ask about every gap, fact-check anything fuzzy |
| **Medium** | Solid fit, core target family | Start from the closest base resume, rewrite the Summary, move or rewrite the 3 or 4 most relevant bullets, swap the Projects section if needed. Ask only about obvious gaps |
| **Quick** | Volume / backup applications | Base resume with only the Summary changed. No questions |

**Core** means a posting in one of their first-choice job families (Full
or Medium tier); **volume** means a backup family (Quick tier).

**Warm contact check.** If networking is `ask` or `active` in
`criteria.md` and the tier is Full or Medium, ask the one question in
`networking.md` now; a referral can change the plan.

**Base resumes.** After the first few full tailors, keep one finished
resume per job family as a base (e.g. "PM base", "Marketing Ops base") and
record them in `criteria.md`. Medium and quick tiers start from a base.

## Step 5. Propose the resume plan before building

Do not go straight to a file. The assessment is already on screen, so
don't repeat it. Present only what's new, in plain text:

1. Which roles go in, in what order, and why, plus what is left out and what
   that costs
2. Any framing shift you propose
3. Two or three before/after bullet rewrites so they can feel the register
4. The questions you need answered to fill gaps (concrete: "did you write
   release notes there?")
5. The two or three judgment calls you want them to make

Then stop and wait. Structural mistakes are cheap to fix here and expensive
in a file. (Skip this step for quick tier.)

## Step 6. House rules for the resume

Defaults; `criteria.md` overrides them.

**Content**
- Prefer bullets carrying a verified number. When cutting for space, cut
  bullets without numbers first. Bold the numbers.
- Each role gets at least three bullets; fewer reads as thin. Formal jobs
  outweigh side projects; side projects and volunteer work go in their own
  section.
- Map JD requirements onto paid-work scenarios before volunteer ones.
- Job titles exactly as the employer gave them; reframe the work in the
  bullets, not the title.
- No self-deprecating parentheticals ("first time doing X").
- No AI-flavored filler: leverage, seamless, robust, delve, realm,
  spearhead, synergy, cutting-edge, passionate.

**Form**
- One page, filled. Not one page plus three lines, and not half a page of
  white space at the bottom. If the library runs out, ask for more material
  rather than shipping blank space.
- Dates and locations right-aligned to the margin.

## Step 7. Build and verify

Write a spec JSON and render with the bundled script. Typography is solved
there; put the effort into the words. Read the header comment in
`scripts/build_resume.js` for the spec shape (sections: summary, skills,
experience, projects, education, certifications) and density presets
(relaxed / roomy / normal / tight / tighter), and look at
`scripts/example-spec.json`.

`$SKILL` below means this skill's folder (wherever this file was loaded
from); use absolute paths, and keep outputs in a working folder.

```bash
node "$SKILL/scripts/build_resume.js" spec.json out/<Name>_Resume_<Company>_<Role>.docx
soffice --headless --convert-to pdf --outdir out out/<Name>_Resume_<Company>_<Role>.docx
bash "$SKILL/scripts/qc.sh" out/<Name>_Resume_<Company>_<Role>.pdf "<Name as on resume>" "<email>"
```

If the `docx` npm package is missing, `npm install docx` (in the working
folder). If `soffice` isn't on PATH, look for the docx skill's
`scripts/office/soffice.py`. If neither can run (no code execution), write
the resume as clean text in the reply and say the file build needs
"Code execution and file creation" turned on. The script uses Calibri; a
machine without it substitutes a look-alike, which is fine.

`qc.sh` checks page count, em dashes (en dashes are allowed only in date
ranges), filler words, that the header survived, and how full the page is.
Any FAIL is a bug to fix, not a note to mention. A fill WARN means: add true
material, then loosen density; if nothing true is left, deliver it and say
how full the page is. Also render a
page image (`pdftoppm -jpeg -r 100 file.pdf page`) and look at it: one page,
dates flush right, even spacing between roles, no single orphaned word on a
line, bottom of the page used.

**Short page** (fill under ~85%), in order: a Projects or Certifications
section from the library, a supported fourth bullet on the most relevant
role, a fuller Skills line, then loosen density one step at a time
(`roomy`, then `relaxed`; re-check for overflow after each). Never pad.

To fix an overflow, in order: bump `density` one step, trim flabby clauses,
drop numberless bullets. Shrinking the font is a last resort.

If the user already has a resume DOCX they love the look of, you may edit
that file's text in place instead (keep each paragraph's formatting XML,
replace only the text runs), then run the same QC.

Deliver DOCX and PDF with a one-line caption. Don't narrate the contents.

## Step 7b. Cover letter (only when asked for)

Write one only when the posting requires it or the user asks. One page,
four short paragraphs: why this role at this company (one specific thing
about them), the two or three experiences from the evidence library that
answer what Step 2 found they emphasize, the honest gap and how they would
close it, and a plain close. No restating the resume, no filler words, no
em dashes. Build it as a DOCX with plain formatting (a short script with
`python-docx` or the same `docx` npm package), convert to PDF, and run the
same `qc.sh` checks except page fill. Anything promised in a cover letter
(relocation, start date) goes on the tracker record so interview answers
match it.

## Step 8. Application form questions

If the application has questions beyond the resume:

1. Start from `form-answers.md`. Reuse the fixed facts as-is; adapt the
   closest short answer and rewrite its last line for this company.
2. New question type → write the answer from the evidence library, then add
   a general version (no company specifics) to `form-answers.md`.
3. **Character limits:** count characters (code if available), aim for
   90% of the limit, and show the count.
4. Yes/No or "N years of X" questions: answer honestly. If a character
   limit or the options push toward overstating, say so and give the honest
   option; if the user still rounds up, log it under "Answers that need
   walking back" so the interview answer stays consistent.
5. Keep the exact answers submitted on the tracker record.

## Step 9. Stop, then log

Wait for the user to say they applied (or decided not to). Then follow
`tracker.md`: create the entry with the dates, both scores, tier, resume
filename, link, salary, location, red flags, and the **full job
description** (postings get taken down; weeks later in interview prep the
original text is what they need most and can least easily recover). Save any
application-form answers they wrote on the same entry.

If a new durable rule came up during the session, add it to `criteria.md`.
