# Setup: profile, evidence library, criteria

Goal: files that let every later session start from facts instead of from a
conversation. Templates are in `templates/`. Ask in batches, not one
question per turn. Use the multiple-choice question tool if available.

There are two paths. Pick by what the user brought.

## Quick-start path (user arrived with a job posting, the default)

The user wants an answer on the job. Give it to them in the second reply,
not the fifth.

1. **Read** the resume (and anything else they pasted). If there's no
   resume, ask for it; that's the only blocker.
2. **Ask the four essentials** in one message: target roles and level;
   location (home city, would they relocate, remote OK) and work
   authorization; salary range; hard no's (industries, role types). Skip
   any the documents already answer. Fill the location tiers properly
   in step 6.
3. **Assess the posting** (`tailor.md` Steps 1 to 4), treating the resume as
   a provisional library. Say once that scores may move a little after
   setup.
4. **If they want to apply:** build the evidence library *for this
   posting*. Ask about the gaps and partial matches the assessment found,
   plus the roles that will go on the page, with concrete questions (see
   Step 3 below). Don't mine every role exhaustively yet.
5. Build the resume (`tailor.md` Steps 5 to 7).
6. **After the resume is delivered**, ask the remaining setup questions
   (pace, referrals, form facts, never-include list) in one message, and
   save the files.

The library grows with every posting this way, aimed at what employers
actually ask for.

## Full path (no posting yet)

### Step 1. Collect raw material

Ask for whatever they already have, all at once:

- Their current resume (any version) and any past tailored ones
- Their LinkedIn Experience section (paste or link), for exact titles and
  dates. If you can't open LinkedIn, ask them to confirm the resume's titles
  and dates match it.
- One or two postings they'd love to get (calibrates targets)

Read everything before asking anything else.

### Step 2. Ask only what the documents can't answer

One message, about six questions, skipping any already answered:

1. Target roles (2 to 4 job families) and level
2. Location as tiers (see the table in `templates/profile.md`): where
   they live, how far they'd commute, where they'd relocate for the right
   role, remote-only regions, and places to always ask about. Plus work
   authorization and sponsorship
3. Salary: the range they'd accept, and the single number to put in form
   fields
4. Hard no's: industries, companies, role types (quota sales, call
   center...), requirements they can't meet (e.g. fluent spoken French)
5. Resume identity: name as shown, which email and links, anything never
   to include
6. Pace and referrals: applications per week that feel sustainable, days
   off, and whether they want help with referrals (off / ask / active; see
   `networking.md`, explain the trade-off in one line)

Also note notice period / start date if they mention it; otherwise ask the
first time a form needs it.

### Step 3. Build the evidence library with them

For each role (most recent and most relevant first):

- Lock company name, title and dates as on LinkedIn.
- One-line context ("B2B scheduling SaaS, 40 people").
- 3 to 6 bullet variants, tagged with the job family each serves best
  (e.g. `[PM]`, `[Ops]`). Different framings of the same true fact for
  different audiences are the point.
- Every number goes in the **fact table** with its source. Estimates are
  marked `(estimate, confirmed by user on <date>)`.

Mine for material the resume left out, with concrete questions, a few at a
time, and no more than two rounds per sitting:

- "What did you hand off to other teams there: docs, dashboards, decks?"
- "Did anything you built get used after you left?"
- "Who were your stakeholders, and how often did you present to them?"
- "What did you automate or make repeatable?"
- "What went wrong once, and what did you change?" (feeds interview prep)
- Side projects, volunteering, certifications, coursework: these fill a
  page honestly for people with short histories.

Stop when each target job family could fill most of a page. The rest gets
added as postings surface new angles.

### Step 4. Criteria, tiers and form answers

Fill `templates/criteria.md`. For the **tiers table**, set a starting
default per job family: their first-choice family → Full tailor for now;
other target families → Medium; backup / volume families → Quick. Once a
couple of full tailors exist in a family, save one as that family's base
resume and switch it to Medium.

Start `templates/form-answers.md` with the fixed facts (work authorization,
sponsorship, salary number, notice period, location preference).

### Step 5. Pick the tracker

Read `tracker.md` and set it up, so the first application has a home.

### Step 6. Save and confirm

Save per "Saving the user's files" in SKILL.md. Then one or two lines:
what's set up and what to do next ("paste a job whenever you're ready").
