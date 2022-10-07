# Smart Playlist website

## Development

1. Clone the repository
1. `docker build --no-cache -t smartplaylist-www-dev .`
1. `docker run --rm -ti -v $(pwd)/app/src:/app/src -p 3001:3001 --env PORT=3001 --hostname smartplaylist-www smartplaylist-www-dev sh --login`
1. `cd /app`
1. `yarn start`
1. Open <http://localhost:3001> to see the website with hotreload

Requires a running API with data.
