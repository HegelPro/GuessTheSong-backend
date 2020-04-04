import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {Codec, string, Either} from 'purify-ts'

type OfParams = Omit<User, 'id'>

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  static of({name, email, password}: OfParams): User {
    const newUser = new User()
    newUser.name = name
    newUser.password = password
    newUser.email = email
    return newUser
  }

  static userParamsToEitherUser(userParams: unknown): Either<string, User> {
    return User.userValidator.decode(userParams).map(User.of)
  }

  static userValidator: Codec<OfParams> = Codec.interface({
    name: string,
    email: string,
    password: string,
  })
}
