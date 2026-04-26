import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      <Navbar />
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  content: {
    padding: "30px",
  },
};
