# Demo mode: "try a demo"

Purpose: let someone see what the skill produces in about two minutes,
before they hand over their own resume or answer any setup questions. The
demo runs the core loop (assess a posting, build a one-page resume) for
Zoey Z, the skill's author, against a real posting she applied to. Her
company names are replaced with descriptions and her numbers are changed.

Trigger: "try a demo", "show me a demo", "show me what you can do",
"试玩", "演示一下", or a first message that asks what the skill does
without giving a resume or a posting.

## Rules

- Say in one line at the start: this is a demo using the author, Zoey,
  with her companies anonymized and numbers changed, against a real
  posting she applied to; nothing they see is about them.
- Read `demo/zoey-workspace.md` and `demo/sample-posting.md`. Use only
  what's in them; the truth rules apply to Zoey too. Never fill in her
  real employers or numbers from anywhere else.
- Don't ask any questions and don't stop for approvals during the demo.
  Where the real workflow would pause for the user's call, say so in one
  line ("in a real run I'd stop here and ask you") and continue with the
  sensible default.
- Never save demo data into the user's own files, memory, or tracker.
- Keep the whole demo to one reply plus the files, so it feels fast.

## What to show, in order

1. **Assessment** (short version of `tailor.md` Steps 2 and 3):
   - What Golden Ventures is emphasizing, ranked (three items: writing and
     the newsletter, systems and automation, events)
   - Fit and Worth it scores with one line each
   - A compact requirement → evidence table, including the gaps: finance /
     consulting background (bonus, GAP), event budget and vendors (weak:
     she helped run meetups but never owned a budget), VC vocabulary like
     LP reporting and AGM (weak)
   - **How to close each gap** (the "Closing gaps" rules in `tailor.md`):
     for VC vocabulary, the free Venture Deals course run by Techstars
     (search to confirm the next cohort date); for event budgets, an
     experience-only fix: own the budget for the community group's next
     meetup; for finance background, say no course closes it and it's a
     bonus, so it doesn't change whether to apply
   - Edge: someone who both writes the newsletter and builds the automation
     herself is rare for an 8-person firm
   - Recency: current role is marketing, matching the posting's family
   - Red flags worth asking about: tiny team, salary not listed, events
     mean evening work, an Easy Apply posting that fills fast
2. **Resume plan in three lines**: which roles, the framing (lead with the
   newsletter and the automation, put the meetups under Projects and
   Community), and one before/after bullet rewrite.
3. **The resume**: build it with `scripts/build_resume.js` from the
   evidence library aimed at this posting (`scripts/example-spec.json` is
   a ready spec for exactly this pairing; use it as the starting point), run `scripts/qc.sh`, and deliver
   the DOCX and PDF. Titles exactly as in the library.
4. **One honest form answer**: the form would likely ask "Have you managed
   event budgets?" Show the honest answer ("Not as the budget owner; I've
   run sign-ups, venue and promotion for three 30-person meetups") and say
   that's how it handles questions that push toward overstating.
5. **What a real run adds**, in three bullets: it remembers you across
   chats, it tracks every application, and after 20 applications it tells
   you which kinds of roles actually reply.
6. **Close with the next step**, one line: "Ready for the real thing? Say
   *set up my job search* and attach your resume."
