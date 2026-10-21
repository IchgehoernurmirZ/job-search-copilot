# Application tracker

Every application gets one record. Two reasons: the user can find the
original job description weeks later when an interview comes, and after a
few weeks the records show which kinds of applications actually get
responses.

## Pick the backend (once, during setup)

Check what's connected and use the first that fits. Record the choice in
`criteria.md` so later sessions don't ask again.

| Option | Use when | Setup |
|---|---|---|
| **1. Notion** | Notion connector is available | Create a database "Job Applications" with the columns below; long content (JD, assessment, form answers, interview prep) goes in each row's page body |
| **2. Google Sheet** | Google Drive connector is available, no Notion | Create a sheet with the columns below; put the full JD in a linked Google Doc per row (cells cap out) |
| **3. `applications.md` in the Project** | Nothing connected (common) | One file, from `templates/applications.md`: the tracker table at the top, then one `## <date> · <Company> · <Role>` section per application (newest first) holding the long content. Hand back the updated file at the end of the session; they replace it in Project files |
| 3b. Spreadsheet export | They want to sort and filter in Excel / Numbers / Sheets | Keep `applications.md` as the source; on request export the table as `tracker.csv` (template in `templates/`) or `.xlsx` |

Never claim the tracker was updated if the write failed or they still need
to replace a file. Say exactly what they need to do.

## Columns

| Column | Values |
|---|---|
| Company | |
| Role | |
| Status | To apply · Applied · Screening · Interviewing · Offer · Rejected · Withdrew · Not applying |
| Applied on | date |
| Tier | Full · Medium · Quick |
| Fit (0-10) | integer |
| Worth it (0-10) | integer |
| Link | posting URL, or "pasted" if they only had the text |
| Location / arrangement | e.g. "Toronto, hybrid 3 days" |
| Salary | as posted |
| Resume file | filename of the version sent |
| Source | LinkedIn / company site / other |
| Referral | none / contact name + date messaged + submitted yes/no |
| Notes | where the long content lives: Notion page body, linked Doc, or the section heading in `applications.md` |
| Next step | free text, with date if any |

Page body / linked notes: full job description, assessment (requirement →
evidence table, red flags), application-form answers, then later interview
prep and debriefs.

## Updating

- Create the record only after the user confirms they applied (or decided
  not to: status "Not applying" with the reason, useful for calibration).
- "Not applied yet" is different from "not applying". Don't delete
  resumes or records for things they simply haven't gotten to.
- When they report a rejection, screen or interview, update status and add
  a dated line to the notes. If a reason was given (location, years, a
  specific tool), record it in the words used; reasons cluster, and the
  clusters are what calibration acts on.
- If the tracker has its own automation (e.g. a Notion agent watching their
  inbox), let it do that part and say so.

## Calibration: "how are my applications doing?"

Run it when asked, and also proactively at these checkpoints (mention it in
one line at the end of whatever you're doing; don't hijack the session):

- **First checkpoint: 20 applications logged.** Early enough that a wrong
  direction costs weeks, not months. At this size, look for zeros and
  obvious patterns, not percentages.
- Then every 20 more applications, or every two weeks, whichever comes
  first.

Steps:

1. Count applications by status, tier, job family, and referral vs. cold.
2. Response rate (any human reply: screen or interview) by **Fit band**
   (≤5, 6-7, 8-10), by **tier**, and **referral vs. cold**.
3. Remember silence is often a quiet rejection; give the rate at "replied
   at all" and at "got an interview".
4. Look for the two patterns that most often explain a zero:
   - **Recency**: replies come from job families that match the person's
     most recent title, not the ones they want to move into. If the
     wanted family is at zero and the current family is not, say so: the
     fix is a referral or a bridging role, not a better resume.
   - **Edge**: the applications that got a reply despite a middling Fit
     usually had something rare (a language, a domain, being the exact
     user). If so, add a keyword group that targets that edge.
5. Say what the numbers suggest, plainly: e.g. "quick-tier applications
   have 0 replies out of 30; medium tier 3 out of 12. Shift effort to
   medium." Or "fit 6 and below never converts; raise the bar."
6. **Repeating gaps.** Look across the assessments behind these
   applications for a gap that keeps coming back (the same tool, cert or
   kind of experience in several postings). Name the top one or two and the
   closing suggestion already given for them (`tailor.md`, "Closing gaps").
   That's the learning worth the time; one-off gaps aren't.
7. If cold applications have no replies and networking is `off`, mention
   once that referrals are the usual fix (see `networking.md`). Their call.
8. If they agree to change strategy, record it in `criteria.md` with the
   date and the numbers behind it.
