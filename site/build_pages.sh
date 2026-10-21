#!/usr/bin/env bash
# Wraps site/index.html (artifact format: no doctype/body) into a full page for GitHub Pages at docs/index.html.
set -e
cd "$(dirname "$0")/.."
{
  echo '<!doctype html>'
  echo '<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  echo '<meta name="description" content="A free Claude skill for job seekers: honest fit checks, one-page resumes from things you have actually done, a tracker that learns from your replies.">'
  echo '<meta property="og:title" content="Job Search Copilot"><meta property="og:description" content="Free, open-source job search copilot for Claude. Try a two-minute demo.">'
  echo '</head><body style="margin:0">'
  cat site/index.html
  echo '</body></html>'
} > docs/index.html
touch docs/.nojekyll
echo "jobs.ziyizhang.app" > docs/CNAME
echo "wrote docs/index.html"
