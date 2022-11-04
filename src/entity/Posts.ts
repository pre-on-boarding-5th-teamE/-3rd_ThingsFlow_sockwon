import reflectMetadata from "reflect-metadata";
import {
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";

@Entity()
class Posts {
  @PrimaryColumn()
  id!: number;

  @Column("varchar", { length: 20 })
  title!: string;

  @Column("varchar", { length: 200 })
  content!: string;

  @Column()
  weather!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

module.exports = {
  Posts,
};
