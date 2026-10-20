#!/usr/bin/env bash
# qc.sh — programmatic checks for a rendered resume PDF.
#   bash qc.sh resume.pdf "NAME AS ON RESUME" "email@example.com"
# Exits non-zero if any check fails. Every failure is a bug to fix.
set -u
pdf="$1"; name="${2:-}"; email="${3:-}"
fail=0
txt="$(pdftotext -layout "$pdf" - 2>/dev/null)"

pages="$(pdfinfo "$pdf" 2>/dev/null | awk '/^Pages:/{print $2}')"
if [ "$pages" = "1" ]; then echo "ok   one page"; else echo "FAIL pages=$pages (must be 1)"; fail=1; fi

if printf '%s' "$txt" | grep -n '—' >/dev/null; then
  echo "FAIL em dash found:"; printf '%s\n' "$txt" | grep -n '—'; fail=1
else echo "ok   no em dashes"; fi
# En dashes are fine in date ranges ("Jan 2024 – Present"); flag any others.
stray="$(printf '%s\n' "$txt" | grep -n '–' | grep -vE '[0-9]{4} – ([A-Z][a-z]{2,8} )?([0-9]{4}|Present)')"
if [ -n "$stray" ]; then echo "FAIL en dash outside a date range:"; printf '%s\n' "$stray"; fail=1
else echo "ok   en dashes only in date ranges"; fi

words='\b(leverage[sd]?|leveraging|seamless(ly)?|robust|delve|realm|spearhead(ed)?|synergy|cutting-edge|passionate)\b'
if printf '%s' "$txt" | grep -niE "$words" >/dev/null; then
  echo "FAIL filler words:"; printf '%s\n' "$txt" | grep -niE "$words"; fail=1
else echo "ok   no filler words"; fi

for s in "$name" "$email"; do
  [ -z "$s" ] && continue
  if printf '%s' "$txt" | grep -qiF "$s"; then echo "ok   header has: $s"; else echo "FAIL header missing: $s"; fail=1; fi
done

# Page fill: where does the last line of text sit, as a share of page height?
fill="$(pdftotext -bbox -f 1 -l 1 "$pdf" - 2>/dev/null | python3 -c '
import re,sys
s=sys.stdin.read()
h=re.search(r"<page width=\"[\d.]+\" height=\"([\d.]+)\"",s)
ys=[float(y) for y in re.findall(r"yMax=\"([\d.]+)\"",s)]
print(round(100*max(ys)/float(h.group(1))) if h and ys else "")
')"
if [ -z "$fill" ]; then echo "info could not measure page fill"
elif [ "$fill" -ge 85 ]; then echo "ok   page fill ${fill}% (text reaches near the bottom)"
elif [ "$fill" -ge 75 ]; then echo "WARN page fill ${fill}%: add true material, or loosen density one step (\"roomy\", then \"relaxed\")"
else echo "WARN page fill ${fill}%: short page. Add true material (projects, certifications, a supported extra bullet), then loosen density one step at a time (\"roomy\", then \"relaxed\"). Never pad; if nothing true is left, ship it and tell the user how full it is"
fi
exit $fail
