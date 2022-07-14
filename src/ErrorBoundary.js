import React from 'react'
import { log } from './util'

// https://reactjs.org/docs/error-boundaries.html
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    log(error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div id="errorPage">
          <div className="errorPageHeader">Arch Buddy</div>
          <div className="errorPageContent">
            <p>Ooppsss... Something has happened</p>
            <p>Try to refresh the page</p>
          </div>
        </div>
      )
    }
    if (this.props.children) {
      return this.props.children
    }
    return (
      <div id="errorPage">
        <div className="errorPageHeader">Arch Buddy</div>
        <div className="errorPageContent">
          <p>Ooppsss... Something has happened</p>
          <p>This is a leak :(</p>
        </div>
      </div>
    )
  }
}
