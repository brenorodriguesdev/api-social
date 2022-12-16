
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('increment')
    id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user_opened' })
    user_opened: User

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_other_user' })
    other: User

  @Column()
    create_at: Date
}
