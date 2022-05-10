import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const Artist = objectType({
  name: 'Artist',
  definition(t) {
    t.string('id')

    t.string('name')

    t.string('imageUrl')

    t.list.field('track', {
      type: 'Track',
      resolve(parent, _args, ctx) {
        return ctx.prisma.track.findMany({
          where: {
            artistId: parent.id != null ? parent.id : undefined,
          },
        })
      },
    })
  },
})

export const getAllArtists = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('Artist', {
      type: 'Artist',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.artist.findMany()
      },
    })
  },
})
