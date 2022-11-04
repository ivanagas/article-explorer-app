# Article Explorer App

Show relevant articles on specific pages.

## Installation

1. Make sure you have enabled `opt_in_site_apps: true` in your `posthog-js` config.
2. Install this app from PostHog's app repository.
3. Enable and configure the app for your site.

## Configuration

Create a JSON string with a list of articles you'd like to link to with the URL where you'd like them showing and the CTA you'd like to show. For example:
```json
{
  "articles": [
    {
      "url": "https://app.posthog.com/insights",
      "content": "https://posthog.com/blog/aarrr-pirate-funnel",
      "cta": "Want one insight to rule them all? Build an AARRR funnel."
    },
    {
      "url": "https://app.posthog.com/data-management/events",
      "content": "https://posthog.com/tutorials/fewer-unwanted-events",
      "cta": "Too much noise? Find out how to capture fewer unwanted events."
    }
  ]
}
```
Paste the modified JSON string into the Article objects JSON field. You can add as many articles as you'd like.

### Match mode
Match mode options
- `exact`: Only show the article if the page URL exactly matches the article URL
- `contains`: Show the article if the page URL contains the article URL
- `wildcard`: Show the article if the page URL matches the article URL which can contain wildcards (`*`)

## Development

Clone the repo and run the following:
```bash
npx @posthog/app-dev-server
```
or
```bash
pnpm install
pnpm start
```
Then browse to http://localhost:3040/, open `site.ts` in an editor, and hack away.


## Future features

- don't show again
  - use localstorage
- better domain checking backup
  - use regex
  - use wildcards
- customize styling