#!/usr/bin/env bash
# Wraps site/index.html (artifact format: no doctype/head/body) into a full page for GitHub Pages at docs/index.html.
# Share assets (og.png, icons) live in docs/ and are kept as is.
set -e
cd "$(dirname "$0")/.."
URL="https://jobs.ziyizhang.app"
DESC="Free Claude skill for job seekers: honest fit checks, one-page resumes from things you've really done, and a 2-minute demo."
{
  echo '<!doctype html>'
  echo '<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  grep -m1 '<title>' site/index.html
  echo "<meta name=\"description\" content=\"$DESC\">"
  echo "<link rel=\"canonical\" href=\"$URL/\">"
  echo "<link rel=\"icon\" type=\"image/png\" href=\"/favicon-32.png\"><link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">"
  echo "<meta property=\"og:type\" content=\"website\"><meta property=\"og:url\" content=\"$URL/\">"
  echo "<meta property=\"og:title\" content=\"Please, just let me be a corporate slave | Job Search Copilot\"><meta property=\"og:description\" content=\"$DESC\">"
  echo "<meta property=\"og:image\" content=\"$URL/og.png\"><meta property=\"og:image:width\" content=\"1200\"><meta property=\"og:image:height\" content=\"630\">"
  echo "<meta name=\"twitter:card\" content=\"summary_large_image\"><meta name=\"twitter:image\" content=\"$URL/og.png\">"
  echo '</head><body style="margin:0">'
  sed '0,/<title>/{/<title>/d}' site/index.html
  echo '</body></html>'
} > docs/index.html
touch docs/.nojekyll
printf 'jobs.ziyizhang.app' > docs/CNAME
echo "wrote docs/index.html"
