
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity('inviteFriendShip')
export class InviteFriendShip {
  @PrimaryGeneratedColumn('increment')
    id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user_sent' })
    userSent: User

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user_received' })
    userReceived: User

  @Column()
    accepted_at: Date

  @Column()
    refused_at: Date
}
