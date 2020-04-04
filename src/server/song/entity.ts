import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {
  Codec,
  string,
  Either,
  array,
  oneOf,
  undefinedType,
  Maybe,
} from 'purify-ts'

export interface OfParams {
  id: string | undefined
  name: string
  author: string
  url: string
  tags: string[]
}

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  author: string

  @Column()
  url: string

  @Column('simple-array')
  tags: string[]

  static of({id, name, author, url, tags}: OfParams): Song {
    const newSong = new Song()
    newSong.id = Maybe.fromNullable(id).orDefault(newSong.id)
    newSong.name = name
    newSong.author = author
    newSong.url = url
    newSong.tags = [...tags]
    return newSong
  }

  static songParamsToEitherSong(songParams: unknown): Either<string, Song> {
    return Song.ofParamsValidator.decode(songParams).map(Song.of)
  }

  static ofParamsValidator: Codec<OfParams> = Codec.interface({
    id: oneOf([string, undefinedType]),
    name: string,
    author: string,
    url: string,
    tags: array(string),
  })

  static validator: Codec<Song> = Codec.interface({
    id: string,
    name: string,
    author: string,
    url: string,
    tags: array(string),
  })
}
