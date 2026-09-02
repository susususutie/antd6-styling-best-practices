import { ExperimentOutlined, MoonOutlined, SettingOutlined, SunOutlined } from "@ant-design/icons";
import { App as AntdApp, Button, ConfigProvider, Drawer, Layout, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import AntdShowcase from "./components/AntdShowcase";
import CustomShowcase from "./components/CustomShowcase";
import ThemeControls from "./components/ThemeControls";
import TokenInspector from "./components/TokenInspector";
import styles from "./App.module.css";
import {
  createThemeConfig,
  DEFAULT_THEME_SETTINGS,
  resolveDarkMode,
  type ThemeSettings,
} from "./theme/themeConfig";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export default function App() {
  const [settings, setSettings] = useState(DEFAULT_THEME_SETTINGS);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const mobileLayout = useMediaQuery("(max-width: 760px)");
  const dark = resolveDarkMode(settings.mode, systemDark);
  const themeConfig = useMemo(
    () => createThemeConfig(settings, systemDark),
    [settings, systemDark],
  );

  const updateSettings = (patch: Partial<ThemeSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <AntdApp className={styles.app}>
        <Layout className={styles.shell}>
          <Layout.Header className={styles.header}>
            <div className={styles.brand}>
              <span className={styles.brandMark} aria-hidden="true">
                <ExperimentOutlined />
              </span>
              <div>
                <p className={styles.eyebrow}>ANT DESIGN 6</p>
                <h1>Styling Lab</h1>
              </div>
            </div>

            <div className={styles.headerActions}>
              <div className={styles.headerMeta}>
                <Tag icon={dark ? <MoonOutlined /> : <SunOutlined />}>
                  {dark ? "暗色算法" : "亮色算法"}
                </Tag>
                <Tag>CSS Variables: --app-*</Tag>
              </div>
              <Button
                className={styles.mobileSettings}
                aria-label="打开主题设置"
                icon={<SettingOutlined />}
                onClick={() => setMobileControlsOpen(true)}
              />
            </div>
          </Layout.Header>

          <Layout className={styles.workspace} hasSider={!mobileLayout}>
            {mobileLayout ? null : (
              <Layout.Sider width={296} theme={dark ? "dark" : "light"}>
                <ThemeControls
                  settings={settings}
                  onChange={updateSettings}
                  onReset={() => setSettings(DEFAULT_THEME_SETTINGS)}
                />
              </Layout.Sider>
            )}

            <Layout.Content className={styles.content}>
              <section className={styles.intro} aria-labelledby="lab-title">
                <div>
                  <p className={styles.sectionIndex}>实时主题实验台</p>
                  <h2 id="lab-title">同一套 Token，两类组件</h2>
                </div>
                <p>
                  左侧修改主题算法和全局 Token。右侧的 Ant Design
                  组件与普通自定义组件消费相同语义变量，可直接比较主题响应结果。
                </p>
              </section>

              <TokenInspector />

              <div className={styles.showcaseGrid}>
                <AntdShowcase />
                <CustomShowcase />
              </div>
            </Layout.Content>
          </Layout>
        </Layout>

        {mobileLayout ? (
          <Drawer
            title="主题设置"
            placement="left"
            size="min(320px, 88vw)"
            open={mobileControlsOpen}
            destroyOnHidden
            classNames={{ body: styles.drawerBody }}
            onClose={() => setMobileControlsOpen(false)}
          >
            <div className={styles.drawerControls}>
              <ThemeControls
                settings={settings}
                onChange={updateSettings}
                onReset={() => setSettings(DEFAULT_THEME_SETTINGS)}
              />
            </div>
          </Drawer>
        ) : null}
      </AntdApp>
    </ConfigProvider>
  );
}
