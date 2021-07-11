import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'notes' })
class Note {
	@PrimaryGeneratedColumn('uuid')
  id!: string;

	@Column()
  text!: string;

	@Column({ default: false })
  is_completed!: boolean;

  @CreateDateColumn()
  created_at: any;

  @UpdateDateColumn()
  updated_at: any;
}

export default Note;
