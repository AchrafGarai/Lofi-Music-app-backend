import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Playlist = objectType({
  name: 'Playlist',
  definition(t) {
    t.string('id')

    t.string('title')

    t.string('imageUrl')

    t.list.field('track', {
      type: 'Track',
      resolve(parent, _args, ctx) {
        return ctx.prisma.track.findMany({
          where: {
            playlists: {
              some: {
                id: parent.id != null ? parent.id : undefined,
              },
            },
          },
        })
      },
    })
  },
})

export const getAllPlaylists = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('playlists', {
      type: 'Playlist',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.playlist.findMany()
      },
    })
  },
})

export const getPlaylistById = extendType({
  type: 'Query',
  definition(t) {
    t.field('playlist', {
      type: 'Playlist',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.playlist.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})
