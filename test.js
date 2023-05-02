function mixinRunner(BaseClass) {
  return class extends BaseClass {};

  return NewClass;
}

class Student extends Person {}

var NewStudent = mixinRunner(Student);
