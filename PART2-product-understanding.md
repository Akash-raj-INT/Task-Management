# Part 2 — Product Understanding: AbleSpace Caseload → Take Data

> **Note on scope:** I was given one screenshot of the **Caseload** list screen, with the
> "Take Data" entry point highlighted. I was not able to click through into the actual data
> capture screen itself, so this write-up covers the Caseload screen and the "Take Data" entry
> point in detail, and flags where the deeper workflow needs to be documented from the live app
> before final submission. **Before submitting, log into AbleSpace, click an actual "Take Data"
> button, and extend this doc with screenshots of that flow** — I've structured it so that's a
> drop-in addition (see the "To complete" section at the end).

## What the screen is

The **Caseload** tab (left sidebar, under "Capture") is a clinician's/therapist's roster of
students they manage. It's the hub screen a provider lands on to see who's on their caseload and
jump into daily work — most importantly, **logging a therapy or service session ("Take Data")**
for a given student.

## Walkthrough, in my own words

1. **Navigation** — The left rail is grouped into three sections: **Capture** (Calendar,
   Caseload, Data, Accommodations, Service Time), **Track** (Report, Billing, Collaborators,
   History), and **Misc**. "Caseload" is currently active, shown with a highlighted background.
   This grouping suggests the product separates day-to-day capture work from longer-term
   tracking/admin work, which is a sensible mental model for a special-education/therapy
   caseload tool.

2. **Header summary** — At the top, "Caseload" is followed by three counts: **Students (15)**,
   **Groups (12)**, **Unassigned (39)**. This gives the clinician an at-a-glance sense of their
   total workload and how much is still unassigned, without needing to open anything.

3. **The student table** — The main content area is a data table with one row per student and
   these columns: **Full Name** (a clickable link, presumably opening the student's profile),
   **Last Name**, **IEP Due**, **Eval Due**, **Collaborators** (a stack of avatar icons, likely
   other providers/teachers on that student's team, with a "+N" overflow indicator), **Service
   Time** (e.g. "OT - 30mins/Wk"), **School**, and **Actions**.

4. **The "Take Data" action** — In the **Actions** column, every row has a **Take Data** button
   (highlighted in the screenshot). This is clearly the primary action a clinician takes from
   this screen: instead of navigating elsewhere, they can jump straight from "here's my list of
   students" into "start logging a session" for any one of them, inline, from a single row. A
   three-dot overflow menu next to each button likely holds secondary actions (edit, remove,
   view history, etc.).

5. **Selection and search** — Checkboxes on each row (and a header checkbox) suggest bulk
   actions are possible, though none are visible in this view. A search bar ("Search students…")
   with a keyboard shortcut (⌘K) lets a provider jump to a specific student quickly, which
   matters once a caseload grows beyond what fits on screen.

6. **Empty/missing data states** — Several rows show a dash ("–") for Eval Due, or "0" for
   Service Time. This tells me the table renders gracefully even when a student record is
   incomplete, rather than breaking or hiding the row.

## UX / UI observations and suggested improvements

- **"Take Data" button is disabled-looking by default.** In the screenshot, most "Take Data"
  buttons appear in a muted/light-blue state rather than the solid blue of the first row (which
  is also the one with the red highlight box, so it's ambiguous whether that's a hover state, a
  "recommended next action" state, or simply the cursor's current position). If the muted state
  means "disabled" (e.g., because Service Time is 0 for that student), the button should
  communicate *why* — a tooltip like "Add service time to enable data capture" — rather than
  just looking inactive. If it's not disabled, the visual weight should probably be more
  consistent across rows so users don't hesitate before clicking.

- **Rows with "Service Time: 0" are a caseload health signal.** Several students (Albert
  Einstein, Tim David, Charles Darwin, Marie Curie) show 0 service time. That's arguably the most
  urgent information on the page — a student with no scheduled service can't be getting sessions
  logged against it in a meaningful way — but it's visually no more prominent than any other
  cell. A small warning indicator or a "0 mins — needs scheduling" chip would surface this
  instead of requiring the clinician to scan every row.

- **IEP Due / Eval Due dates aren't triaged by urgency.** Dates like "09/19/2024" are already
  past relative to today, sitting next to "–" (not set) with the same visual treatment. Color-
  coding (e.g., overdue in red, due soon in amber) would let a provider immediately see which
  students need paperwork attention without reading every date.

- **Collaborators column is avatar-only.** The stacked avatar icons (with initials/colors) don't
  identify the person's *role* (e.g., SLP, OT, teacher) at a glance — a hover tooltip likely
  exists, but a small role-letter badge on the avatar itself would reduce the need to hover at
  all.

- **The "Take Data" action being row-level only** means a clinician who wants to log data for
  several students back-to-back (a very common real workflow — e.g., seeing five kids in a row
  during a push-in session block) has to return to this table and re-find each name after each
  session. A "Take Data" flow that, once finished, offers "Next student" (from the same group/
  session block) would remove repeated navigation.

- **No visible session/group context.** The header shows "Groups (12)," implying data is often
  taken for a group of students together (common in school-based OT/speech services), but the
  table itself is only organized by individual student rows. It's not clear from this screen how
  a clinician would start a **group** Take Data session (e.g., logging the same session note
  across 4 students seen together) versus one at a time. If that flow exists elsewhere, surfacing
  a "Take Group Data" action here — or a toggle between "By Student" and "By Group" views — would
  make the grouped-session workflow (which is likely very common) more discoverable.

## To complete (needs the live click-through)

To fully satisfy the assignment brief, extend this document with:

1. A screenshot of the actual **Take Data** screen after clicking the button (what fields/inputs
   it shows — e.g., goal selection, trial data entry, session notes, duration).
2. Notes on how data entry works (manual counters? trial-by-trial logging? free text?).
3. Whether "Take Data" supports the group-session workflow described above, and how.
4. Any validation, save/submit behavior, and what happens after a session is logged (does it
   update the row in this table — e.g., a "last session" timestamp?).
