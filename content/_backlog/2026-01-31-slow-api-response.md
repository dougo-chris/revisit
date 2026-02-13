"How do you deal with slow APIs to keep your UI responsive?"

Here’s a pattern that works:

1. Show a loading skeleton

Instead of a spinner, use skeleton screens to give users a sense of layout while data is loading. 

2. Use optimistic UI updates

If the API is for an action (like "Like" a post), immediately update the UI and roll back if the request fails.

3. Cache and reuse previous data

Tools like React Query (for React users) can cache responses and show stale data while fetching new data in the bg.

4. Lazy load where possible

Don't fetch everything at once. Split the page into sections and load data as needed.

5. Use polling or subscriptions for realtime updates

For data that changes frequently (like payment status), use polling or WebSockets to keep the UI updated.