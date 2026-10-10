# Publish as its own GitHub repo (not inside Union Jack)

The Cloud Agent token for this workspace can only push to
`HarrisCrypto/Union-Jack-Rebuild-`. To give Ad Intelligence **its own GitHub
section**, create an empty repo and either:

- reply **repo ready** in the agent chat (preferred — agent will push + clean Union Jack), or
- run the local commands below with your own GitHub login.

## Option A — you create empty repo, agent finishes

1. Create empty public repo: https://github.com/new  
   - Name: `ad-intelligence`  
   - **No** README / gitignore / license  
2. Grant the Cursor GitHub App access to that repo.  
3. Tell the agent: `repo ready`.

## Option B — publish yourself in one shot

From your machine (GitHub CLI logged in as HarrisCrypto):

```bash
git clone https://github.com/HarrisCrypto/Union-Jack-Rebuild-.git
cd Union-Jack-Rebuild-
git checkout cursor/ad-intelligence-skill-3683

# Turn the package folder into its own repository root
cd ad-intelligence
git init -b main
git add -A
git commit -m "Initial commit: Ad Intelligence skill v2.1"
gh repo create HarrisCrypto/ad-intelligence --public --source=. --remote=origin --push
```

Then install in Cursor: **Customize → From GitHub Repository →**  
`https://github.com/HarrisCrypto/ad-intelligence`

## After it’s live

Delete `ad-intelligence/` (and the root marketplace entry) from
`Union-Jack-Rebuild-` so the auto site stays separate.
