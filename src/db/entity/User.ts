import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Codec, string, Right, Either } from 'purify-ts'

export type UserParams = Omit<User, 'id'>

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

  static merdgeUsers(userOne: User, userTwo: User): User {
    const { name, password, email } = userTwo
    userOne.name = name
    userOne.password = password
    userOne.email = email
    return userOne
  }

  static userParamsToEitherUser(userParams: unknown): Either<string, User> {
    return User.userValidator.decode(userParams).chain(user => {
      const { name, password, email } = user
      const newUser = new User()
      newUser.name = name
      newUser.password = password
      newUser.email = email
      return Right(newUser)
    })
  }

  static userValidator: Codec<UserParams> = Codec.interface({
    name: string,
    email: string,
    password: string,
  })
}
