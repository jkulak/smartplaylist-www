# Smart Playlist website

## Development

The quickest way is `dev/setup_local_development.sh`, run from the repository root: it builds the
image and starts it on the `smartplaylist_network` Docker network, with `app/src` mounted for hot
reload at <http://localhost:3001>.

By hand:

1. Clone the repository
1. `docker build --no-cache -t jkulak/smartplaylist-www .`
1. `docker run --rm -ti -v $(pwd)/app/src:/app/src -p 3001:3001 --env PORT=3001 --name www jkulak/smartplaylist-www sh --login`
1. `cd /app`
1. `yarn start`
1. Open <http://localhost:3001> to see the website with hotreload

Requires a running API, which in turn needs a running database.
