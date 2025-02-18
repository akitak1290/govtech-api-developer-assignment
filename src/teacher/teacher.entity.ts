import { Student } from 'src/student/student.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('Teacher')
export class Teacher {
  @PrimaryColumn()
  email: string;

  @ManyToMany(() => Student, (student: Student) => student.teachers, {
    eager: true, // https://orkhan.gitbook.io/typeorm/docs/eager-and-lazy-relations
  })
  @JoinTable({
    name: 'TeacherStudent',
  })
  students: Student[];
}
