import { theme } from "antd";
import styles from "./TokenInspector.module.css";

export default function TokenInspector() {
  const { token } = theme.useToken();
  const tokens = [
    ["--app-color-primary", token.colorPrimary],
    ["--app-color-text", token.colorText],
    ["--app-color-bg-container", token.colorBgContainer],
    ["--app-color-border-secondary", token.colorBorderSecondary],
    ["--app-border-radius", `${token.borderRadius}px`],
    ["--app-font-size", `${token.fontSize}px`],
  ];

  return (
    <section className={styles.inspector} aria-labelledby="token-title">
      <div className={styles.heading}>
        <p>LIVE TOKEN OUTPUT</p>
        <h2 id="token-title">当前语义 Token</h2>
      </div>
      <div className={styles.tokenGrid}>
        {tokens.map(([name, value], index) => (
          <div className={styles.token} key={name}>
            {index < 4 ? (
              <span
                className={styles.swatch}
                style={{ backgroundColor: value }}
                aria-hidden="true"
              />
            ) : (
              <span className={styles.metric} aria-hidden="true">
                Aa
              </span>
            )}
            <div>
              <code>{name}</code>
              <output>{value}</output>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
