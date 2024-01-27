export default class ENDPONTAPI {
  static LOGIN = '/login';
  static REGISTER = '/register';
  static LOGOUT = '/logout';

  static UPDATE_USER = '/update-user';
  static LOAD_USER_BY_ID = '/load-user-by-id';
  static CHANGE_PASSWORD = '/change-password';
  static UPDATE_STUDYED_FOR_USER = '/user/updateStudyedForUser';
  static GET_TOTAL_LEARNED_TOPIC = '/user/getTotalLearnedTopic';
  static GET_USER_FROM_TOKEN = '/get-user-from-token';

  // upload
  static UPLOAD = '/upload';
  static UPLOAD_MULTIPLE = '/upload-multiple';
  static UPLOAD_MULTIPLE_VIDEO = '/upload-multiple-video';

  // category
  static GET_CATEGORYS_BY_STATUS = '/category/load-category-by-status';
  static UPDATE_CATEGORY = '/category/update-category';
  static ORDER_CATEGORY = '/category/order-category';
  static GET_CATEGORYS_BY_SLUG = '/category/getCategoryBySlug';

  // course
  static GET_COURSES_BY_STATUS = '/course/load-course-by-status';
  static GET_COURSES_BY_ID = '/course/loadCourseById';
  static UPDATE_COURSE = '/course/update-course';
  static GET_COURSES_BY_ID_CATEGORY = '/course/load-course-by-id-category';
  static GET_COURSES_BY_ID_TAG_AND_CATEGORY =
    '/course/load-course-by-id-tag-and-category';
  static GET_COURSE_BY_SLUG = '/course/getCoursesBySlug';

  // lesson
  static GET_LESSONS_BY_STATUS = '/lesson/load-lesson-by-status';
  static GET_LESSONS_BY_IDTOPIC = '/lesson/load-lesson-by-idTopic';
  static UPDATE_LESSON = '/lesson/update-lesson';

  // question
  static GET_QUESTIONS_BY_STATUS = '/question/load-question-by-status';
  static GET_QUESTIONS_BY_TOPIC = '/question/load-question-by-topic';
  static UPDATE_QUESTION = '/question/update-question';
  static ORDER_QUESTION = '/question/orderQuestion';

  // tag
  static GET_TAGS_BY_STATUS = '/tag/load-tag-by-status';
  static UPDATE_TAG = '/tag/update-tag';
  static GET_TAGS_BY_ID_CATEGORY = '/tag/load-tag-by-id-category';

  // topic
  static GET_TOPICS_BY_STATUS = '/topic/load-topic-by-status';
  static GET_TOPICS_BY_ID_COURSE = '/topic/load-topic-by-id-course';
  static UPDATE_TOPIC = '/topic/update-topic';
  static GET_TOPICS_BY_PARENT_ID = '/topic/load-topic-by-parent-id';
  static GET_TOPIC_BY_COURSE = '/topic/getTopicByCourse';
  static ORDER_TOPIC = '/topic/orderTopic';
  static GET_TOPIC_BY_ID = '/topic/load-topic-by-id';

  // feedback
  static GET_FEEDBACKS = '/loadFeedbacks';
  static GET_FEEDBACKS_BY_COURSE = '/loadFeedbacksByIdCourse';
  static CREATE_FEEDBACK = '/createFeedback';
  static GET_FEEDBACKS_BY_TYPE_OR_COURSE = '/loadFeedbacksByTypeOrCourse';

  // statistic
  static LOAD_STATISTIC = '/loadStatistic';
}
