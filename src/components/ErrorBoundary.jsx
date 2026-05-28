import { Component } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="retail-shell grid min-h-screen place-items-center p-24">
        <div className="max-w-[480px] border border-border-muted bg-surface-1 p-32 text-center">
          <div className="mx-auto mb-20 grid h-44 w-44 place-items-center border border-accent-heat text-accent-heat">
            <AlertTriangle className="h-18 w-18" aria-hidden="true" />
          </div>
          <p className="meta mb-12">Route error</p>
          <h1 className="text-title-h4 font-semibold tracking-[-.02em]">Page failed to render</h1>
          <p className="mt-12 text-body-medium leading-6 text-ink-soft">
            {this.state.error?.message || 'A runtime error occurred.'}
          </p>
          <Link to="/" className="btn-primary mt-24">Back to home</Link>
        </div>
      </div>
    )
  }
}
