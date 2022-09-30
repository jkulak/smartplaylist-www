# Smart Playlist website

* Dockerfile is used for production build only

## Development

1. Clone the repository
1. `docker run -ti --env SERVER_CONFIG_FILE=/config.toml --env PORT=8787 -v $(pwd)/sws_config.toml:/config.toml -v $(pwd)/app:/app -p 8787:8787 --hostname smartplaylist-www --name www-dev node:17-alpine3.14 sh --login` (On MacOS starting might take >30 seconds due to slow Docker mounts.)
1. `cd /app`
1. `yarn start`
1. Open <http://localhost:8787> to see the website with hotreload

Requires a running API with data.
