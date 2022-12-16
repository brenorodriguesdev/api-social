
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity('chatMessage')
export class ChatMessage {
  @PrimaryGeneratedColumn('increment')
    id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user_sent' })
    user_sent: User

  @Column()
    message: string

  @Column()
    create_at: Date

  @Column()
    recv_at: Date

  @Column()
    read_at: Date
}
