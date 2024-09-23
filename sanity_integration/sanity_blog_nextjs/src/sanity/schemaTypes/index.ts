import { type SchemaTypeDefinition } from 'sanity'


import { BlogType } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [BlogType],
}
