#!/usr/bin/env node
/**
 * build_resume.js — render a one-page resume DOCX from a JSON spec.
 *
 *   node build_resume.js spec.json out.docx
 *
 * The point of this script is that the typography is already solved. Do not
 * rebuild it per job — write a new spec.json, run this, and spend your effort
 * on the words instead.
 *
 * Spec shape (all fields optional except name/sections you want to appear):
 * {
 *   "name": "ALEX CHEN",
 *   "contact": ["Toronto, ON  ·  555-010-0199  ·  alex@example.com",
 *               "linkedin.com/in/alexchen  ·  alexchen.dev"],
 *   "summary": "Product analyst ... **40+** dashboards ...",
 *   "skills": [["Writing & Editing", "Briefing notes, key messages, ..."], ...],
 *   "experience": [
 *     { "company": "Northwind Labs",
 *       "role": "Product Analyst",
 *       "dates": "Jan 2024 – Present",
 *       "context": "B2B scheduling software",   // optional but keep it
 *       "location": "Remote",                          //   non-empty for even
 *       "bullets": ["Built ...", ...] }       //   vertical rhythm
 *   ],
 *   "education": [
 *     { "school": "University of Example, Toronto, ON",
 *       "degree": "B.Sc. Computer Science  ·  Dean's List",
 *       "dates": "Sep 2019 – Apr 2023" }
 *   ],
 *   "projects": [   // same shape as experience; "role" optional
 *     { "company": "Clinic Wait-Time Tracker", "role": "Side project",
 *       "dates": "2025", "context": "No-code prototype", "location": "",
 *       "bullets": ["..."] }
 *   ],
 *   "certifications": ["Certified Scrum Product Owner (PSPO I), 2025"],
 *   "order": ["summary","skills","experience","projects","education","certifications"],
 *   "density": "normal"   // "relaxed" | "roomy" | "normal" | "tight" | "tighter"; see FITTING
 * }
 *
 * Wrap any substring in **double asterisks** to bold it. Use this for the
 * metrics (**90+**, **26**, **50+**) so a skimming recruiter's eye lands on
 * evidence rather than adjectives.
 *
 * FITTING TO ONE PAGE
 * Render, then run qc.sh (checks page count AND how full the page is).
 * Too empty (short history): add true material (projects, certifications,
 * a fourth bullet the library supports), then loosen one step at a time:
 * "normal" -> "roomy" -> "relaxed". Never pad.
 * If it spills:
 *   1. bump "density" one step  ("normal" -> "tight" -> "tighter")
 *   2. cut the flabbiest bullet clauses — trailing "for cross-functional
 *      teams", "in order to", hedges
 *   3. drop whole bullets that carry no number, never ones that do
 * Shrinking the body font below 9.5pt is a last resort; it reads as desperate.
 */

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, TabStopType, BorderStyle,
} = require('docx');

// ---------- Design tokens ----------
const FONT = 'Calibri';
// Page is 12240 DXA wide with 600 DXA margins -> 11040 DXA of usable width.
// docx's TabStopPosition.MAX is 9026, which stops ~1.4" short of the right
// margin and makes right-aligned dates look accidentally indented. Always set
// the tab stop to (page width - left margin - right margin).
const PAGE = { width: 12240, height: 15840 };
const MARGIN = { top: 540, bottom: 540, left: 600, right: 600 };
const RIGHT_TAB = PAGE.width - MARGIN.left - MARGIN.right;

const NAME_SIZE = 32;    // 16pt
const CONTACT_SIZE = 18; // 9pt
const SECTION_SIZE = 18; // 9pt
const BODY_SIZE = 19;    // 9.5pt
const COMPANY_SIZE = 20; // 10pt

const INK = '000000';
const MUTED = '4A4A4A';
const ACCENT = '1F3864';

const DENSITY = {
  // relaxed: for short histories, so an honest resume doesn't end at 2/3 page
  relaxed: { line: 300, bulletAfter: 90, skillAfter: 90, secBefore: 290, roleBefore: 240 },
  roomy:   { line: 262, bulletAfter: 62, skillAfter: 62, secBefore: 215, roleBefore: 175 },
  normal:  { line: 240, bulletAfter: 40, skillAfter: 45, secBefore: 165, roleBefore: 125 },
  tight:   { line: 230, bulletAfter: 30, skillAfter: 35, secBefore: 140, roleBefore: 105 },
  tighter: { line: 220, bulletAfter: 22, skillAfter: 26, secBefore: 115, roleBefore: 85 },
};

// ---------- Helpers ----------
// Split on **bold** markers so metrics can carry weight inside a sentence.
function runs(text, base) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((seg) => {
    const b = seg.startsWith('**') && seg.endsWith('**');
    return new TextRun({ ...base, text: b ? seg.slice(2, -2) : seg, bold: b || base.bold });
  });
}

function build(spec) {
  const d = DENSITY[spec.density] || DENSITY.normal;
  const kids = [];

  const sectionHeading = (t) => new Paragraph({
    spacing: { before: d.secBefore, after: 60 },
    border: { bottom: { color: ACCENT, space: 3, style: BorderStyle.SINGLE, size: 6 } },
    children: [new TextRun({
      text: t.toUpperCase(), bold: true, size: SECTION_SIZE,
      font: FONT, color: ACCENT, characterSpacing: 30,
    })],
  });

  const bullet = (t) => new Paragraph({
    bullet: { level: 0 },
    indent: { left: 230, hanging: 160 },
    spacing: { after: d.bulletAfter, line: d.line },
    children: runs(t, { size: BODY_SIZE, font: FONT, color: INK }),
  });

  const roleBlock = (items, heading) => {
    if (!(items || []).length) return;
    kids.push(sectionHeading(heading));
    for (const job of items) {
      kids.push(new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
        spacing: { before: d.roleBefore, after: 0 },
        children: [
          new TextRun({ text: job.company, bold: true, size: COMPANY_SIZE, font: FONT, color: INK }),
          ...(job.role ? [new TextRun({ text: '  ·  ' + job.role, size: COMPANY_SIZE, font: FONT, color: INK })] : []),
          new TextRun({ text: '\t' + (job.dates || ''), bold: true, size: BODY_SIZE, font: FONT, color: INK }),
        ],
      }));
      if (job.context || job.location) {
        kids.push(new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
          spacing: { after: 55 },
          children: [
            new TextRun({ text: job.context || '', italics: true, size: BODY_SIZE, font: FONT, color: MUTED }),
            new TextRun({ text: '\t' + (job.location || ''), italics: true, size: BODY_SIZE, font: FONT, color: MUTED }),
          ],
        }));
      }
      for (const b of job.bullets || []) kids.push(bullet(b));
    }
  };

  // ----- header -----
  kids.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({
      text: spec.name || '', bold: true, size: NAME_SIZE,
      font: FONT, color: INK, characterSpacing: 60,
    })],
  }));
  for (const line of spec.contact || []) {
    kids.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 30 },
      children: [new TextRun({ text: line, size: CONTACT_SIZE, font: FONT, color: MUTED })],
    }));
  }

  // ----- sections -----
  const order = spec.order || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'];

  const renderers = {
    summary() {
      if (!spec.summary) return;
      kids.push(sectionHeading(spec.summaryHeading || 'Summary'));
      kids.push(new Paragraph({
        spacing: { after: 20, line: d.line },
        children: runs(spec.summary, { size: BODY_SIZE, font: FONT, color: INK }),
      }));
    },

    skills() {
      if (!(spec.skills || []).length) return;
      kids.push(sectionHeading(spec.skillsHeading || 'Skills'));
      for (const [label, value] of spec.skills) {
        kids.push(new Paragraph({
          spacing: { after: d.skillAfter, line: d.line },
          children: [
            new TextRun({ text: label + '  ', bold: true, size: BODY_SIZE, font: FONT, color: ACCENT }),
            ...runs(value, { size: BODY_SIZE, font: FONT, color: INK }),
          ],
        }));
      }
    },

    experience() { roleBlock(spec.experience, spec.experienceHeading || 'Experience'); },
    projects() { roleBlock(spec.projects, spec.projectsHeading || 'Projects'); },

    certifications() {
      if (!(spec.certifications || []).length) return;
      kids.push(sectionHeading(spec.certificationsHeading || 'Certifications'));
      for (const c of spec.certifications) kids.push(bullet(c));
    },

    education() {
      if (!(spec.education || []).length) return;
      kids.push(sectionHeading(spec.educationHeading || 'Education'));
      for (const e of spec.education) {
        kids.push(new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
          spacing: { before: 60, after: 0 },
          children: [
            new TextRun({ text: e.school, bold: true, size: BODY_SIZE, font: FONT, color: INK }),
            new TextRun({ text: '\t' + (e.dates || ''), bold: true, size: BODY_SIZE, font: FONT, color: INK }),
          ],
        }));
        if (e.degree) {
          kids.push(new Paragraph({
            spacing: { after: 20 },
            children: [new TextRun({ text: e.degree, italics: true, size: BODY_SIZE, font: FONT, color: MUTED })],
          }));
        }
      }
    },
  };

  const known = Object.keys(renderers);
  for (const k of Object.keys(spec)) {
    if (Array.isArray(spec[k]) && !['contact','skills','order'].includes(k) && !known.includes(k)) {
      console.error(`warning: spec key "${k}" has no renderer and will not appear`);
    }
  }
  for (const k of known) {
    if (spec[k] && (!Array.isArray(spec[k]) || spec[k].length) && !order.includes(k)) {
      console.error(`warning: "${k}" has content but is not in "order", so it will not appear`);
    }
  }
  for (const s of order) {
    if (renderers[s]) renderers[s]();
    else console.error(`warning: unknown section "${s}" in order`);
  }

  return new Document({
    sections: [{ properties: { page: { size: PAGE, margin: MARGIN } }, children: kids }],
  });
}

// ---------- CLI ----------
const [specPath, outPath] = process.argv.slice(2);
if (!specPath || !outPath) {
  console.error('usage: node build_resume.js <spec.json> <out.docx>');
  process.exit(1);
}
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
Packer.toBuffer(build(spec)).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log('wrote ' + outPath);
});
