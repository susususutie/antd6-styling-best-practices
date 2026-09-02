import {
  ArrowUpOutlined,
  CheckOutlined,
  DatabaseOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "./CustomShowcase.module.css";

const checks = [
  { label: "语义变量覆盖", value: "24 / 24", state: "success" },
  { label: "固定颜色扫描", value: "0 项", state: "success" },
  { label: "视觉回归基线", value: "待更新", state: "warning" },
] as const;

const chartValues = [0.35, 0.48, 0.43, 0.7, 0.62, 0.88, 0.8];
const chartLabels = ["一", "二", "三", "四", "五", "六", "日"];

function ThemeLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { token } = theme.useToken();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");
      if (!context) return;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const plotHeight = height - 20;
      const xAt = (index: number) => 5 + ((width - 10) * index) / (chartValues.length - 1);
      context.font = `${token.fontSizeSM}px ${token.fontFamily}`;
      context.fillStyle = token.colorTextSecondary;
      context.textAlign = "center";
      chartLabels.forEach((label, index) => {
        context.fillText(label, xAt(index), height - 6);
      });

      context.beginPath();
      chartValues.forEach((value, index) => {
        const x = xAt(index);
        const y = plotHeight - value * (plotHeight - 8);
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.strokeStyle = token.colorPrimary;
      context.lineWidth = 2.5;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.stroke();
    };

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();

    return () => observer.disconnect();
  }, [token.colorPrimary, token.colorTextSecondary, token.fontFamily, token.fontSizeSM]);

  return (
    <div className={styles.metricChart}>
      <span>近 7 日检查</span>
      <canvas
        ref={canvasRef}
        className={styles.chart}
        role="img"
        aria-label="近 7 日主题检查通过率折线图"
      />
    </div>
  );
}

export default function CustomShowcase() {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="custom-title">
      <div className={styles.sectionHeader}>
        <div>
          <p>CUSTOM COMPONENTS</p>
          <h2 id="custom-title">普通自定义组件</h2>
        </div>
        <span className={styles.cssBadge}>CSS Modules</span>
      </div>

      <div className={styles.customPanel}>
        <div className={styles.panelTop}>
          <div className={styles.iconBox} aria-hidden="true">
            <DatabaseOutlined />
          </div>
          <div>
            <p className={styles.kicker}>THEME HEALTH</p>
            <h3>样式治理概览</h3>
          </div>
          <span className={styles.status}>运行正常</span>
        </div>

        <div className={styles.metricGrid}>
          <div className={styles.metricPrimary}>
            <span>主题覆盖率</span>
            <strong>96.4%</strong>
            <small>
              <ArrowUpOutlined /> 较上次检查 +4.2%
            </small>
          </div>
          <div className={styles.metricItem}>
            <span>语义 Token / 业务变量</span>
            <strong>42 / 8</strong>
          </div>
          <ThemeLineChart />
        </div>

        <div className={styles.checkList}>
          {checks.map((check) => (
            <div className={styles.checkRow} key={check.label}>
              <span
                className={check.state === "success" ? styles.checkSuccess : styles.checkWarning}
                aria-hidden="true"
              >
                {check.state === "success" ? <CheckOutlined /> : <SafetyCertificateOutlined />}
              </span>
              <span>{check.label}</span>
              <strong>{check.value}</strong>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          <span>变量来源</span>
          <code>var(--app-color-bg-container)</code>
        </div>

        {detailsVisible ? (
          <div className={styles.details}>
            <strong>检查结论</strong>
            <p>
              自定义组件未判断明暗模式，颜色、边框、圆角和控件高度均来自固定的 `--app-*` 语义变量。
            </p>
          </div>
        ) : null}

        <button
          className={styles.action}
          type="button"
          aria-expanded={detailsVisible}
          onClick={() => setDetailsVisible((visible) => !visible)}
        >
          {detailsVisible ? "收起检查详情" : "查看检查详情"}
          <RightOutlined aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
