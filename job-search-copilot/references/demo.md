# Demo mode: "try a demo"

Purpose: let someone see what the skill produces in about two minutes,
before they hand over their own resume or answer any setup questions. The
demo runs the core loop (assess a posting, build a one-page resume) for a
fictional person, Alex Chen, against a fictional posting.

Trigger: "try a demo", "show me a demo", "show me what you can do",
"试玩", "演示一下", or a first message that asks what the skill does
without giving a resume or a posting.

## Rules

- Say in one line at the start that this is a demo with a made-up person
  and posting, so nothing they see is about them.
- Read `demo/alex-workspace.md` and `demo/sample-posting.md`. Use only
  what's in them; the truth rules still apply, even to Alex.
- Don't ask any questions and don't stop for approvals during the demo.
  Where the real workflow would pause for the user's call, say so in one
  line ("in a real run I'd stop here and ask you") and continue with the
  sensible default.
- Never save demo data into the user's own files, memory, or tracker.
- Keep the whole demo to one reply plus the files, so it feels fast.

## What to show, in order

1. **Assessment** (short version of `tailor.md` Steps 2 and 3):
   - What Fernleaf is emphasizing, ranked (three items)
   - Fit and Worth it scores with one line each
   - A compact requirement → evidence table that includes the two gaps
     (A/B testing, Figma) marked as nice-to-have gaps, and the healthcare
     match from Northwind's clinic software
   - Edge: Alex has built for clinic staff before, which few applicants
     will have
   - Recency: Alex's current title is Product Analyst, not PM, so say the
     cold application may be filtered on title and a referral would help
   - One red flag worth asking about: the live product case
2. **Resume plan in three lines**: which roles, the framing shift (lead
   with discovery and requirements, not dashboards), and one before/after
   bullet rewrite.
3. **The resume**: build it with `scripts/build_resume.js` from the
   evidence library aimed at this posting, run `scripts/qc.sh`, and deliver
   the DOCX and PDF. Keep Alex's title as Product Analyst.
4. **One honest form answer**: the posting would likely ask "Experience
   designing A/B tests?" Show the honest answer ("No; I've analyzed test
   results but haven't designed one") and say that's how it handles
   questions that push toward overstating.
5. **What a real run adds**, in three bullets: it remembers you across
   chats, it tracks every application, and after 20 applications it tells
   you which kinds of roles actually reply.
6. **Close with the next step**, one line: "Ready for the real thing? Say
   *set up my job search* and attach your resume."
