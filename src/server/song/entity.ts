import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Codec, string, Right, Either, array } from 'purify-ts'

export type ISongParams = Omit<Song, 'id'>

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

  static merdgeSongs(songOne: Song, songTwo: Song): Song {
    const { name, author, url, tags } = songTwo
    songOne.name = name
    songOne.author = author
    songOne.url = url
    songOne.tags = [...tags]
    return songOne
  }

  static songParamsToEitherSong(songParams: unknown): Either<string, Song> {
    return Song.songValidator.decode(songParams).chain(song => {
      const { name, author, url, tags } = song
      const newSong = new Song()
      newSong.name = name
      newSong.author = author
      newSong.url = url
      newSong.tags = [...tags]
      return Right(newSong)
    })
  }

  static songValidator: Codec<ISongParams> = Codec.interface({
    name: string,
    author: string,
    url: string,
    tags: array(string),
  })
}
