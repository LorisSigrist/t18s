# Internationalized Routing
Out of the box, `t18s` only provides message translations. It does not hold any opinions on how you should resolve a user's locale. This is up to you. Here are some common patterns:

- `/en/page`, `/de/page` - Each locale has it's own subroute
- `/page`, `/de/page` - The default locale is in the root, with each secondary locale getting it's own subroute.
- `/page?lang=en`, `/page?lang=de` - Using a query parameter for the language (does not support prerendering)
- `/page#en`, `/page#de` - Using a hash for the language. This is not recommended since it doesn't work with prerenering or Server Sider Rendering.

