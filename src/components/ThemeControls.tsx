import {
  BgColorsOutlined,
  CompressOutlined,
  LaptopOutlined,
  MoonOutlined,
  ReloadOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Button, ColorPicker, Divider, Segmented, Slider, Switch, Tooltip } from "antd";
import type { ThemeMode, ThemeSettings } from "../theme/themeConfig";
import styles from "./ThemeControls.module.css";

interface ThemeControlsProps {
  settings: ThemeSettings;
  onChange: (patch: Partial<ThemeSettings>) => void;
  onReset: () => void;
}

const COLOR_PRESETS = ["#1677ff", "#0f8a6a", "#c24158", "#7c5cfc"];

export default function ThemeControls({ settings, onChange, onReset }: ThemeControlsProps) {
  return (
    <aside className={styles.panel} aria-label="主题控制面板">
      <div className={styles.panelHeader}>
        <div>
          <p>THEME CONTROLS</p>
          <h2>主题控制</h2>
        </div>
        <Tooltip title="恢复默认主题">
          <Button aria-label="恢复默认主题" icon={<ReloadOutlined />} onClick={onReset} />
        </Tooltip>
      </div>

      <div className={styles.controlGroup}>
        <label>主题模式</label>
        <Segmented<ThemeMode>
          block
          value={settings.mode}
          options={[
            { label: "亮色", value: "light", icon: <SunOutlined /> },
            { label: "暗色", value: "dark", icon: <MoonOutlined /> },
            { label: "系统", value: "system", icon: <LaptopOutlined /> },
          ]}
          onChange={(mode) => onChange({ mode })}
        />
      </div>

      <Divider />

      <div className={styles.controlGroup}>
        <div className={styles.labelRow}>
          <label>品牌主色</label>
          <code>{settings.primaryColor}</code>
        </div>
        <ColorPicker
          value={settings.primaryColor}
          showText
          onChange={(color) => onChange({ primaryColor: color.toHexString() })}
        />
        <div className={styles.swatches} aria-label="预设主色">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`使用主色 ${color}`}
              aria-pressed={settings.primaryColor === color}
              className={styles.swatch}
              style={{ backgroundColor: color }}
              onClick={() => onChange({ primaryColor: color })}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className={styles.controlGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="border-radius">基础圆角</label>
          <output>{settings.borderRadius}px</output>
        </div>
        <Slider
          id="border-radius"
          min={0}
          max={12}
          value={settings.borderRadius}
          tooltip={{ formatter: (value) => `${value}px` }}
          onChange={(borderRadius) => onChange({ borderRadius })}
        />
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="font-size">基础字号</label>
          <output>{settings.fontSize}px</output>
        </div>
        <Slider
          id="font-size"
          min={12}
          max={18}
          value={settings.fontSize}
          tooltip={{ formatter: (value) => `${value}px` }}
          onChange={(fontSize) => onChange({ fontSize })}
        />
      </div>

      <Divider />

      <div className={styles.switchRow}>
        <span className={styles.switchIcon} aria-hidden="true">
          <CompressOutlined />
        </span>
        <div>
          <label htmlFor="compact-mode">紧凑算法</label>
          <p>重算字号、控件高度和间距 Token</p>
        </div>
        <Switch
          id="compact-mode"
          checked={settings.compact}
          onChange={(compact) => onChange({ compact })}
        />
      </div>

      <div className={styles.scopeNote}>
        <BgColorsOutlined aria-hidden="true" />
        <div>
          <strong>固定变量作用域</strong>
          <code>cssVar.prefix = "app"</code>
        </div>
      </div>
    </aside>
  );
}
