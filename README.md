# ATLAS Face Community Content

Welcome to the ATLAS Face Community Content repository! This is where users share study materials including vaults, projects, and topics.

## 📚 What is this?

This repository hosts community-contributed study content for the ATLAS Face study application. Users can:

- **Browse** shared content from the Community Marketplace in the app
- **Install** content directly into their local study vault
- **Share** their own study materials with the community

## 📦 Content Types

| Type | Description |
|------|-------------|
| **Vault** | Complete study environment with multiple projects |
| **Project** | Collection of related topics |
| **Topic** | Single study topic with flashcards and notes |

## 🚀 How to Submit Content

### Option 1: Via the App (Recommended)

1. Open ATLAS Face
2. Go to **Community Marketplace** (in activity rail or Ctrl+K → "Community")
3. Click **Publish Content**
4. Fill out the form and click **Submit to GitHub**
5. This opens a GitHub issue - submit it and we'll review your content

### Option 2: Manual Submission

1. Fork this repository
2. Create your content package JSON (see format below)
3. Add it to the `content/` folder
4. Update `content-catalog.json` with your item metadata
5. Submit a pull request

## 📝 Content Package Format

```json
{
  "meta": {
    "id": "unique-id",
    "type": "topic",
    "name": "Display Name",
    "description": "Description of the content",
    "author": "Your GitHub username",
    "category": "languages",
    "tags": ["tag1", "tag2"],
    "cardCount": 50,
    "version": "1.0.0"
  },
  "data": {
    "topics": [
      {
        "name": "Topic Name",
        "document": "# Markdown content for notes",
        "cards": [
          {
            "title": "Card Front",
            "content": "Card Back",
            "type": "basic"
          }
        ]
      }
    ]
  }
}
```

### Card Types

- `basic` - Simple front/back flashcard
- `cloze` - Fill-in-the-blank (use `{{...}}` for blanks)
- `multiple-choice` - Multiple choice question
- `true-false` - True/False question

## 📂 Categories

- `languages` - Language learning
- `science` - Biology, Chemistry, Physics
- `programming` - Coding and CS
- `math` - Mathematics
- `history` - History and Social Studies
- `arts` - Arts, Music, Literature
- `business` - Business and Economics
- `health` - Health and Medicine
- `other` - Everything else

## ✅ Submission Guidelines

1. **Quality Content** - Ensure accuracy and usefulness
2. **No Copyrighted Material** - Only submit content you created or have rights to
3. **Appropriate Content** - Keep it educational and family-friendly
4. **Clear Descriptions** - Help users understand what they're getting
5. **Proper Tags** - Use relevant tags for discoverability

## 🔧 For AI Agents

This repository is designed to be AI-agent friendly:

```bash
# CLI access via ATLAS Face CLI
af market browse              # List available content
af market search "spanish"    # Search content
af market install <id>        # Install content
af market publish             # Publish local content
```

**Programmatic Access:**
```
Catalog URL: https://raw.githubusercontent.com/Samurai412/atlasface-community/main/content-catalog.json
Package URL: https://raw.githubusercontent.com/Samurai412/atlasface-community/main/content/{id}.json
```

## 📜 License

All contributed content is shared under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). By submitting, you agree to license your content under these terms.

## 🤝 Contributing

Questions? Issues? Open a GitHub issue or discussion!

---

Made with ❤️ by the ATLAS Face community
