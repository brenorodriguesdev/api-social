
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity('userFriendList')
export class UserFriendList {
  @PrimaryGeneratedColumn('increment')
    id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user' })
    user: User

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_friend' })
    friend: User

  @Column()
    create_at: Date
}
