import {
  ClockCircleOutlined,
  EditOutlined,
  LoadingOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  Collapse,
  Modal,
  notification,
  Radio,
  Space,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import moment from 'moment';
import { memo, useEffect, useRef, useState } from 'react';
import { apiUploadMultipleVideo } from '../../api/uploadApi';
import ModalCreateAndUpdateQuestion from '../../components/ModalCreateAndUpdateQuestion/ModalCreateAndUpdateQuestion';
import TinymceEditor from '../../components/TinymceEditor/TinymceEditor';
import { requestLoadQuestionsByIdTopic } from '../../stores/middlewares/questionMiddleware';
import TTCSconfig from '../../helpers/config';
import { answers } from '../../utils/constraint';
import { STATUSES } from '../../utils/constraint';
import styles from './CourseDetail.module.scss';
import {
  requestLoadTopicById,
  requestUpdateTopic,
} from '../../stores/middlewares/topicMiddleware';
import { FaSync } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  setQuestionInfo,
  setQuestions,
} from '../../stores/slices/questionSlice';
import { useDispatch } from 'react-redux';
export const LessonCourse = memo((prop) => {
  const {
    onloadTopic = () => {},
    type = 0,
    setIndexActiveDataChild = () => {},
    setIndexActive = () => {},
  } = prop;
  const dispatch = useDispatch();
  const descRef = useRef();
  const refVideo = useRef();
  const [form] = useForm();
  const dataTopic = useSelector((state) => state.topic.dataTopic);
  const courseInfo = useSelector((state) => state.course.courseInfo);
  const loading = useSelector((state) => state.question.loading);
  const questions = useSelector((state) => state.question.questions);
  const questionInfo = useSelector((state) => state.question.questionInfo);

  // const [progress, setProgress] = useState(0);
  const isTopicParent = !dataTopic?.parentId;
  const [isUploadVideo, setIsUploadVideo] = useState(1);
  const [urlVideo, setUrlVideo] = useState('');
  const [urlVideoUpload, setUrlVideoUpload] = useState('');
  const [keyUpload, setKeyUpload] = useState(Math.random());
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const topicType = dataTopic?.topicType;

  // config exam in video
  const [isPraticeInVideo, setIsPraticeInVideo] = useState(false);

  // time practive in video
  const [timePratice, setTimePratice] = useState(0);

  console.log('isUploadVideo::', isUploadVideo);
  useEffect(() => {
    setIsUploadVideo(1);
    setKeyUpload(Math.random());
    if (dataTopic) {
      form.setFieldsValue({
        name: dataTopic?.name,
        status: dataTopic?.status,
        timeExam: dataTopic?.timeExam,
      });
      setUrlVideo(dataTopic?.video || '');
      setUrlVideoUpload(dataTopic?.video || '');
    }
    if (
      (dataTopic?.id && topicType === TTCSconfig.TYPE_TOPIC_PRATICE) ||
      dataTopic?.type === TTCSconfig.TYPE_EXAM
    ) {
      handleLoadQuestionByIdtopic(
        dataTopic?.id || '',
        TTCSconfig.STATUS_PUBLIC
      );
    } else if (dataTopic?.id && topicType === TTCSconfig.TYPE_TOPIC_VIDEO) {
      // video
      if (dataTopic.timePracticeInVideo?.length) {
        setIsPraticeInVideo(true);
        setTimePratice(dataTopic.timePracticeInVideo[0].time);
        dispatch(setQuestions(dataTopic.timePracticeInVideo[0].questionData));
      } else {
        setIsPraticeInVideo(false);
        setTimePratice(0);
        dispatch(setQuestions([]));
      }
    } else {
      dispatch(setQuestions([]));
    }
  }, [dataTopic]);

  const props = {
    name: 'files',
    customRequest: async (options) => {
      const {
        onSuccess = () => {},
        onError = () => {},
        onProgress,
        file,
      } = options;
      try {
        const res = await apiUploadMultipleVideo(file);
        const data = res.data[0];
        setUrlVideoUpload(data?.url);
        setUrlVideo(data?.url);
        form.setFieldValue('timeExam', Math.floor(data?.duration));
        onSuccess('oke');
      } catch (error) {
        onError(error);
      }
    },
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      const isMp4 = file.type === 'video/mp4' || file.type === 'video/ogg';
      if (!isMp4) {
        message.error('You can only upload MP4/OGG file!');
      }
      const isLt100M = file.size / 1024 / 1024 < 100; // 100MB
      if (!isLt100M) {
        message.error('Image must smaller than 100MB!');
      }

      if (isMp4 && isLt100M) {
        return true;
      } else {
        return false;
      }
    },
    accept: 'video/*',
  };

  const handleRemoveVideo = () => {
    setUrlVideo('');
    setUrlVideoUpload('');
    form.setFieldValue('timeExam', 0);
  };

  const handleUpdateOrCreateTopic = async (value) => {
    const video = isUploadVideo === 1 ? urlVideoUpload : urlVideo;
    if (!video && topicType === TTCSconfig.TYPE_TOPIC_VIDEO) {
      message.error('vui lòng upload video');
      return;
    }
    try {
      const actionResult = await dispatch(
        requestUpdateTopic({
          ...dataTopic,
          ...value,
          idCourse: courseInfo._id,
          des: descRef?.current?.getContent(),
          video,
          updateDate: moment().valueOf(),
        })
      );
      const data = unwrapResult(actionResult);
      onloadTopic(courseInfo?.id || '', type);
      setIndexActiveDataChild((prev) => {
        return `${prev}:${data?.data?.index - 1}`;
      });
      setIndexActive(data?.data?.index - 1);
      message.success('cập nhật thành công');
      data?.status === 0 &&
        dispatch(requestLoadTopicById({ id: data?.data?.id }));
    } catch (error) {
      notification.error({
        message: 'không tải được danh sach danh mục',
      });
    }
  };

  const handleUpdatePraticeForTopic = async (question) => {
    const timePracticeInVideo = {
      time: timePratice,
      totalQuestion: dataTopic?.timePracticeInVideo?.length
        ? dataTopic?.timePracticeInVideo[0]?.totalQuestion + 1
        : 1,
      idQuestion: dataTopic?.timePracticeInVideo?.length
        ? [question.id || '', ...dataTopic?.timePracticeInVideo[0]?.idQuestion]
        : [question.id || ''],
    };

    try {
      const actionResult = await dispatch(
        requestUpdateTopic(
          new Topic({
            ...dataTopic,
            timePracticeInVideo: [timePracticeInVideo],
            updateDate: moment().valueOf(),
          })
        )
      );
      const data = unwrapResult(actionResult);
      handleClickTopicChild(dataTopic?.id || '');
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickTopicChild = async (id) => {
    try {
      const requestResult = await dispatch(requestLoadTopicById({ id }));
      unwrapResult(requestResult);
    } catch (error) {
      message.error('không load được, lỗi server');
    }
  };

  const handleLoadQuestionByIdtopic = async (idTopic, status) => {
    try {
      const res = await dispatch(
        requestLoadQuestionsByIdTopic({
          idTopic,
          status,
        })
      );
      unwrapResult(res);
    } catch (error) {
      notification.error({
        message: 'server error!!',
        duration: 1.5,
      });
    }
  };

  const handleAsyncTime = () => {
    setTimePratice(Math.floor(refVideo.current.currentTime));
  };

  const itemQuestionView = (props) => {
    const { question } = props;
    return (
      <div>
        <div className={clsx(styles.questionNumber)}>
          Câu hỏi {question.index}
          <Button
            icon={<EditOutlined color="#52c41a" />}
            onClick={() => {
              dispatch(setQuestionInfo(question));
              setIsOpen(true);
              setIsEdit(false);
            }}
          />
        </div>
        <div style={{ fontWeight: 500 }}>Đề bài :</div>
        <div dangerouslySetInnerHTML={{ __html: question.question }} />
        <div className={clsx(styles.questionAnswer)}>
          {question.answer.map((item) => {
            return (
              <p
                style={{
                  color: item.isResult ? 'red' : '',
                }}
              >
                {answers[item.index]}.{' '}
                <div
                  className={clsx(styles.textAnswer)}
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </p>
            );
          })}
        </div>
        <p
          style={{
            color: !question.hint ? 'rgb(250, 173, 20)' : '',
          }}
        >
          giải thích :
          {question.hint ? (
            <div dangerouslySetInnerHTML={{ __html: question.hint }} />
          ) : (
            ' chưa cập nhật'
          )}
        </p>
      </div>
    );
  };

  const renderInfoTopic = () => {
    return (
      <Form
        layout="vertical"
        name="register"
        form={form}
        onFinish={handleUpdateOrCreateTopic}
      >
        <Row gutter={{ xl: 48, md: 16, xs: 0 }}>
          <Col xl={8} md={8} xs={24}>
            <Form.Item
              name="name"
              label="Tên bài"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trường này!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="status" label="Trạng thái">
              <Select options={STATUSES} />
            </Form.Item>

            {!isTopicParent && topicType !== TTCSconfig.TYPE_TOPIC_DOCUMENT && (
              <Form.Item
                name="timeExam"
                label={
                  topicType === TTCSconfig.TYPE_TOPIC_VIDEO
                    ? 'Độ dài Video (s)'
                    : 'Thời gian làm bài (p)'
                }
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập trường này!',
                  },
                ]}
              >
                <Input
                  disabled={topicType === TTCSconfig.TYPE_TOPIC_VIDEO}
                  suffix={<ClockCircleOutlined />}
                />
              </Form.Item>
            )}
          </Col>

          <Col
            xl={16}
            md={16}
            xs={24}
            style={{ borderRight: '0.1px solid #ccc' }}
          >
            <Form.Item label="Mô tả">
              <TinymceEditor
                id="descriptionTopic"
                key={keyUpload}
                editorRef={descRef}
                value={dataTopic?.des ?? ''}
                heightEditor={
                  topicType === TTCSconfig.TYPE_TOPIC_DOCUMENT
                    ? '500px'
                    : '250px'
                }
              />
            </Form.Item>

            {!isTopicParent && topicType === TTCSconfig.TYPE_TOPIC_VIDEO && (
              <div>
                <div className={clsx(styles.videoStudy)}>
                  <p className={clsx(styles.require)}>*</p>
                  Video bài giảng
                </div>
                <Radio.Group
                  onChange={(e) => {
                    setIsUploadVideo(e.target.value);
                  }}
                  value={isUploadVideo}
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Radio value={1}>tải video lên</Radio>
                  <Radio value={2}>đường dẫn</Radio>
                </Radio.Group>
                <div>
                  {isUploadVideo === 1 && (
                    <div>
                      <Upload {...props} key={keyUpload}>
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                      {urlVideoUpload && (
                        <div>
                          <video
                            ref={refVideo}
                            width="340"
                            height="250"
                            controls
                            style={{
                              margin: '10px 10px 0 0',
                              borderRadius: '4px',
                            }}
                            key={keyUpload}
                          >
                            <source src={urlVideoUpload} />
                            Trình duyệt của bạn không hỗ trợ video này
                          </video>
                          <div
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={handleRemoveVideo}
                          >
                            Xóa video
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {isUploadVideo === 2 && (
                    <Input
                      onChange={(e) => {
                        setUrlVideo(e.target.value);
                      }}
                      value={urlVideo}
                    />
                  )}
                </div>
                {dataTopic?.id && (
                  <>
                    <div
                      style={{
                        marginTop: 10,
                      }}
                    >
                      Có bài tập khi xem video :{' '}
                    </div>
                    <Switch
                      checked={!!isPraticeInVideo}
                      onChange={(checked) => {
                        setIsPraticeInVideo(checked);
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </Col>
        </Row>
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button danger>HỦY</Button>
          <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
            LƯU
          </Button>
        </div>
      </Form>
    );
  };

  return (
    <div>
      <Typography.Title level={4}>
        {dataTopic?.id
          ? topicType === TTCSconfig.TYPE_TOPIC_VIDEO
            ? 'Sửa bài học'
            : topicType === TTCSconfig.TYPE_TOPIC_PRATICE
            ? 'Sửa bài tập'
            : 'Sửa tài liệu'
          : topicType === TTCSconfig.TYPE_TOPIC_VIDEO
          ? 'Tạo bài học'
          : topicType === TTCSconfig.TYPE_TOPIC_PRATICE
          ? 'Tạo bài tập'
          : 'Tạo tài liệu'}
        {` ${dataTopic?.name}`}
      </Typography.Title>
      {topicType === TTCSconfig.TYPE_TOPIC_PRATICE ||
      topicType === TTCSconfig.TYPE_TOPIC_VIDEO ||
      dataTopic?.type === TTCSconfig.TYPE_EXAM ? (
        <>
          <Collapse
            defaultActiveKey={
              topicType === TTCSconfig.TYPE_TOPIC_VIDEO ? ['1'] : ['2']
            }
            // onChange={handleChangeCollapse}
          >
            <Collapse.Panel header="Thông tin bài tập" key="1">
              {renderInfoTopic()}
            </Collapse.Panel>
            {dataTopic?.id &&
              (topicType === TTCSconfig.TYPE_TOPIC_PRATICE ||
                isPraticeInVideo ||
                dataTopic?.type === TTCSconfig.TYPE_EXAM) && (
                <Collapse.Panel header="Danh sách câu hỏi" key="2">
                  <Typography.Title
                    level={5}
                    style={{
                      margin: 0,
                      marginBottom: 10,
                      borderBottom: '1px solid',
                    }}
                  >
                    Danh sách câu hỏi
                  </Typography.Title>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsEdit(false);
                      setIsOpen(true);
                      dispatch(setQuestionInfo(null));
                    }}
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    Tạo câu hỏi
                  </Button>
                  {topicType === TTCSconfig.TYPE_TOPIC_VIDEO && (
                    <Space direction="horizontal">
                      <label htmlFor="timePractice">Tại thời điểm (s)</label>
                      <input
                        id="timePractice"
                        value={timePratice}
                        onChange={(e) => {
                          if (Number(e.target.value) >= 0) {
                            setTimePratice(Number(e.target.value));
                          } else {
                            setTimePratice(1);
                          }
                        }}
                      />
                      <Tooltip title="Thời điểm hiện tại">
                        <Button
                          icon={<FaSync />}
                          type="primary"
                          onClick={handleAsyncTime}
                        />
                      </Tooltip>
                    </Space>
                  )}
                  {loading ? (
                    <LoadingOutlined />
                  ) : questions.length ? (
                    questions.map((question) => itemQuestionView({ question }))
                  ) : (
                    <div>không có dữ liệu</div>
                  )}
                </Collapse.Panel>
              )}
          </Collapse>
          <ModalCreateAndUpdateQuestion
            isEdit={isEdit}
            isOpen={isOpen}
            question={questionInfo}
            setIsOpen={setIsOpen}
            handleUpdatePraticeForTopic={handleUpdatePraticeForTopic}
            key={questionInfo?.id || ''}
          />
        </>
      ) : (
        <div>{renderInfoTopic()}</div>
      )}
    </div>
  );
});
