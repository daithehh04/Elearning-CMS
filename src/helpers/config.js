export default class TTCSconfig {
  static LOGIN_FAILED = -1;
  static LOGIN_SUCCESS = 0;
  static LOGIN_ACCOUNT_IS_USED = 1;
  static LOGIN_ACCOUNT_NOT_EXIST = 2;
  static LOGIN_WRONG_PASSWORD = 3;
  static LOGIN_WRONG_PROVIDER = 4;
  static LOGIN_ACCOUNT_NOT_ACTIVATED = 5;
  static LOGIN_TOKEN_INVALID = 8;
  static LOGIN_WAIT_FOR_EMAIL_VERIFICATION = 9;

  static STATUS_PUBLIC = 1;
  static STATUS_PRIVATE = 0;
  static STATUS_DELETED = -1;
  static STATUS_SUCCESS = 0;
  static RESPONSIVE_NULL = 1;
  static STATUS_FAIL = -1;
  static STATUS_NO_EXIST = 2;

  //trạng thái bài
  static STATUS_LEARNED = 2;
  static STATUS_LEARNING = 1;

  static GENDER_MALE = 1;
  static GENDER_FEMALE = 2;
  static GENDER_OTHER = 3;

  // user role
  static ROLE_ADMIN = 0;
  static ROLE_USER = 1;

  // type topic
  static TYPE_TOPIC_VIDEO = 4; // tiết học
  static TYPE_TOPIC_PARENT = 1; // chương học
  static TYPE_TOPIC_PRATICE = 2; // bài tập
  static TYPE_TOPIC_EXAM = 3; // đề kiểm tra
  static TYPE_TOPIC_DOCUMENT = 5; // tài liệu

  // loại đề mục
  static TYPE_LESSON = 1; // chương trình học
  static TYPE_EXAM = 2; // đề kiểm tra

  static GENDERS = [
    {
      value: TTCSconfig.GENDER_MALE,
      label: 'Nam',
    },
    {
      value: TTCSconfig.GENDER_FEMALE,
      label: 'Nữ',
    },
    {
      value: TTCSconfig.GENDER_OTHER,
      label: 'Khác',
    },
  ];

  static UserStatus = Object.freeze({
    NOT_ACTIVATED: -2,
    DELETED: -1,
    NORMAL: 0,
  });
}
