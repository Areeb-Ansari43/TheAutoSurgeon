import { Component, type ReactNode } from "react";
import { ArrowRight, RotateCcw, ShieldAlert } from "lucide-react";
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error("Website rendering error", error.message);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <section className="not-found container">
        <ShieldAlert size={48} color="#f26a00" style={{ marginBottom: 30 }} />
        <div className="eyebrow">A SMALL BUMP IN THE ROAD</div>
        <h1>
          Let’s get you
          <br />
          back on track.
        </h1>
        <p>
          This page couldn’t load. Try reloading it, or return to the homepage.
        </p>
        <div className="intro-buttons">
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            <RotateCcw size={16} />
            Reload this page
          </button>
          <a href="/" className="btn btn-ghost">
            Return home
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    );
  }
}
export default ErrorBoundary;
