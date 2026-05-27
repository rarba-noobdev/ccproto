import { Component } from 'react'
import { Link } from 'react-router-dom'

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
      <div className="retail-shell grid min-h-screen place-items-center p-6">
        <div className="panel max-w-lg rounded-2xl p-6 text-center">
          <p className="kicker mb-3 justify-center">Route error</p>
          <h1 className="text-2xl font-black">Something failed to render</h1>
          <p className="mt-3 text-sm leading-6 text-white/58">
            {this.state.error?.message || 'The page hit a runtime error.'}
          </p>
          <Link to="/" className="btn-primary mt-6">Back to home</Link>
        </div>
      </div>
    )
  }
}
