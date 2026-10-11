# kitchu-studio.github.io

Portfolio site for kitchu studio: mobile apps with Go backends for small shops.
Plain HTML, CSS and a little JavaScript. No build step.

## Edit

- `index.html`: all text, in Thai (`lang="th"`) and English (`lang="en"`) side by side.
- `style.css`: colours are variables at the top.
- `script.js`: language toggle. Set `LINE_ID` to show a LINE button in the contact section.
- `assets/shots/`: app screenshots (WebP, 540 px wide).

Open `index.html` in a browser to preview.

## Publish on GitHub Pages

1. Create a repository named `kitchu-studio.github.io` under the `kitchu-studio` organization.
2. Push this folder to its `main` branch.
3. Settings → Pages → Build and deployment → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. The site goes live at https://kitchu-studio.github.io within a minute or two.
