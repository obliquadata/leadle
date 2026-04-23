# World Leaderle

A daily geography game where you guess the country of world leaders.

**Play here:** https://obliquadata.github.io/

## How it works

Each day, a mystery world leader is selected.

Your goal is to guess the **country** they lead in **6 attempts**.

After each guess, the game gives you hints:

- **Continent hint** tells you whether your guess is on the correct continent.
- **Corruption hint** tells you whether your guessed country is more corrupt, similarly corrupt, or less corrupt than the mystery country.
- **Distance hint** shows how geographically close your guess is.
- **Role hint** shows whether the leader is a **head of state**, **head of government**, or **head of both**.

## Features

- Daily puzzle
- Random mode with non-repeating leader queues
- Progress tracking by random leader pool
- Light, dark, and system themes
- Shareable results
- Country alias matching
- Responsive layout

## Privacy

- No login required
- No personal data required to play
- Game progress and preferences are stored locally in the browser
- Optional analytics are used only with consent

See [privacy.html](privacy.html) for more information.

## Project structure

```
.
├── index.html
├── about.html
├── privacy.html
├── site.webmanifest
├── sitemap.xml
├── data/
│   ├── leaders.json
│   └── daily-schedule.json
├── scripts/
│   ├── update-leaders.mjs
│   └── generate-daily-schedule.mjs
└── .github/workflows/
    ├── update_leaders.yml
    └── generate_daily_schedule.yml
```

## Data sources

This project uses public data from:

- Wikidata
- Wikipedia
- World Bank governance indicators

## Data pipeline

Leader data and the daily puzzle schedule are generated with Node.js scripts.

- `scripts/update-leaders.mjs` builds the leader dataset.
- `scripts/generate-daily-schedule.mjs` creates the daily schedule.

These scripts can be run manually or through GitHub Actions workflows.

## Run locally

Clone the repository:

```bash
git clone https://github.com/obliquadata/obliquadata.github.io.git
cd obliquadata.github.io
```

Because this is a static site, you can open `index.html` directly in a browser.

For best results, serve the project locally with a simple static server.

Example with Python:

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

## GitHub Actions

This project includes workflows to update the data files:

- `update_leaders.yml` updates the leaders database and regenerates the schedule.
- `generate_daily_schedule.yml` regenerates the daily schedule only.

## Roadmap

Possible future improvements:

- Directional distance hints
- Streak tracking
- Difficulty settings
- Progressive Web App support
- Self-hosted leader images

## Contributing

Suggestions and improvements are welcome.

If you would like to contribute, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

Note: This project uses data from Wikidata, Wikipedia, and the World Bank.  
These sources may have their own licenses and terms of use.

## Author

Built by **Obliqua Data**.

Website: https://obliquadata.github.io/
