import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
    id: number

  @Column()
    name: string

  @Column()
    description: string

  @Column()
    avatar: string

  @Column()
    email: string

  @Column()
    password: string

  @Column()
    create_at: Date

  @Column()
    last_access: Date

  @Column()
    is_connected: boolean

  @Column()
    is_active: boolean
}
