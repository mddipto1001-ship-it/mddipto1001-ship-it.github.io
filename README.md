# 18 - Sample Portfolio Website (freelancer self-introduction)

A ready-made portfolio for **Shalman Dipto**. It is built with plain HTML, CSS and JavaScript, with no frameworks. The page is light, about 110 KB, plus a 330 KB share-preview image.

| File | What it is |
|---|---|
| `index.html` | All page content (edit text here) |
| `style.css` | Colours, layout, light/dark theme, phone layout |
| `script.js` | Dark-mode toggle, mobile menu, scroll fade-in, automatic "Incoming" label before 1 Dec 2026 |
| `assets/avatar.svg` | Cartoon portrait (replace with a real photo later if you like) |
| `assets/illus-*.svg`, `assets/step-*.svg` | Cartoon/schematic illustrations (HPLC, gel/blot/cells, AI, spatial omics, pipeline steps) |

## Sections

Hero (freelance badge, cartoon portrait) → **From sample to insight** schematic (7 illustrated steps) → **Services** (★ featured: spatial & multi-omics) → **Research expertise** (★ spatial omics with [OmiCore Inc.](https://omi-core.com/), analytical chemistry, molecular biology, AI drug discovery, each with a cartoon diagram) → **Projects** → **Experience** → **How we work together** → **日本語 自己紹介** → **Contact**.

## Guides in this folder

- **`GUIDE_18_Sample_Portfolio_Website.pdf`**: cartoon slides showing how to publish the site on GitHub Pages and share the link
- **`PUBLISH_AND_SHARE.md`**: the same steps as text, with the commands, prompts, where to add the link on LinkedIn, Facebook and Instagram, and a sample announcement post
- `assets/og-image.png`: the picture shown when the link is shared (set your username in the `og:image` tag)

## 1. Preview on your PC

```bash
cd ~/Desktop/Dipto_home_Work/18_Sample_Portfolio_Website
python3 -m http.server 8000
# open http://localhost:8000  (Ctrl+C to stop)
```

## 2. Make it truly yours (required before publishing)

Search `index.html` for `ADD:` comments and fix each one:

- [ ] Real **email, LinkedIn and GitHub** links (Contact section)
- [ ] Exact **months, cities and degree title** (Experience section)
- [ ] 1-2 public-safe lines about your OmiCore work
- [ ] Keep only skills and services you can **really deliver**
- [ ] Replace the "In progress" project cards with live links as you finish projects 03-08 and 10-12
- [ ] Ask a Japanese colleague to check the 自己紹介 text

Or let Claude help:

```text
Read index.html. Ask me one question at a time for every "ADD:" comment, then update the page with my answers.
Do not invent any facts. Keep the design unchanged.
```

## 3. Publish free on GitHub Pages (full guide: `PUBLISH_AND_SHARE.md`)

```bash
# after creating the repo USERNAME.github.io on GitHub and setting up SSH:
git init && git add . && git commit -m "Portfolio website"
git branch -M main
git remote add origin git@github.com:USERNAME/USERNAME.github.io.git
git push -u origin main
# GitHub > repo > Settings > Pages > Deploy from a branch > main / (root)
```

The site is then live at `https://USERNAME.github.io`. Cloudflare Pages also works (see project 02).

## ⚠ Before advertising freelance services

You are employed in Japan, so check these **before** the site goes public with a "Hire me" button:

1. **Employer approval:** your contract and work rules (就業規則) on side jobs (副業). OmiCore itself offers data analysis and manuscript support, so services like "lab image quantification" and "publication figures" may overlap. Get **written approval**, or remove the overlapping services.
2. **Visa / residence status:** paid work outside your status of residence may need permission from the Immigration Services Agency first.
3. **Confidentiality:** show only public, synthetic or your own practice data. Never show employer or client data without permission.

Until the employer and visa checks are done, you can change the hero badge to *"Open to research collaboration"* and hide the Services section.

## Ideas for improvements (practise with Claude Code)

- "Add an English/日本語 language switch for the whole page."
- "Add a downloadable CV PDF button."
- "Add a contact form that works on GitHub Pages using a free form service. Explain the privacy implications."
- "Run a Lighthouse-style audit of this page and fix any accessibility issues."
