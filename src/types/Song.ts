import { extendType, objectType } from 'nexus'

export const Song = objectType({
  name: 'Track',
  definition(t) {
    t.string('id')

    t.string('title')

    t.string('url')

    t.string('artistId')

    t.field('artist', {
      type: 'Artist',
      resolve(parent, _args, ctx) {
        return ctx.prisma.artist.findUnique({
          where: {
            id: parent.artistId != null ? parent.artistId : undefined,
          },
        })
      },
    })
  },
})

export const getAllSongs = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Tracks', {
      type: 'Track',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.track.findMany()
      },
    })
  },
})
