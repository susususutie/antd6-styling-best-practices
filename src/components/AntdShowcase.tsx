import { CheckCircleOutlined, CloudUploadOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Alert,
  App as AntdApp,
  Button,
  Card,
  Checkbox,
  Input,
  Progress,
  Select,
  Space,
  Table,
  Tag,
  type TableProps,
} from "antd";
import styles from "./AntdShowcase.module.css";

interface TaskRow {
  key: string;
  name: string;
  owner: string;
  status: "运行中" | "已完成" | "待处理";
}

const columns: TableProps<TaskRow>["columns"] = [
  { title: "任务", dataIndex: "name", key: "name" },
  { title: "负责人", dataIndex: "owner", key: "owner" },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status: TaskRow["status"]) => {
      const color =
        status === "已完成" ? "success" : status === "运行中" ? "processing" : "default";
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const data: TaskRow[] = [
  { key: "1", name: "主题变量检查", owner: "Lin", status: "已完成" },
  { key: "2", name: "暗色视觉回归", owner: "Chen", status: "运行中" },
  { key: "3", name: "业务组件审查", owner: "Xu", status: "待处理" },
];

export default function AntdShowcase() {
  const { message } = AntdApp.useApp();

  return (
    <section className={styles.section} aria-labelledby="antd-title">
      <div className={styles.sectionHeader}>
        <div>
          <p>BUILT-IN COMPONENTS</p>
          <h2 id="antd-title">Ant Design 组件</h2>
        </div>
        <Tag color="blue">theme.token</Tag>
      </div>

      <Card
        title="发布配置"
        extra={<Tag icon={<CheckCircleOutlined />}>校验通过</Tag>}
        className={styles.card}
        classNames={{ header: styles.cardHeader, body: styles.cardBody }}
      >
        <Alert showIcon type="info" title="当前组件由 ConfigProvider 统一管理主题" />

        <div className={styles.formGrid}>
          <label>
            <span>配置名称</span>
            <Input defaultValue="Production theme" />
          </label>
          <label>
            <span>发布环境</span>
            <Select
              defaultValue="staging"
              options={[
                { value: "staging", label: "Staging" },
                { value: "production", label: "Production" },
              ]}
            />
          </label>
        </div>

        <Checkbox defaultChecked>发布前执行视觉回归</Checkbox>

        <div className={styles.progressRow}>
          <span>主题覆盖率</span>
          <Progress percent={68} size="small" />
        </div>

        <Table<TaskRow>
          size="small"
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 480 }}
        />

        <Space wrap>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={() => void message.success("主题配置已发布")}
          >
            发布配置
          </Button>
          <Button icon={<SaveOutlined />}>保存草稿</Button>
        </Space>
      </Card>
    </section>
  );
}
