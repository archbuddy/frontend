import renderer from 'react-test-renderer'
import ErrorBoundary from '../src/ErrorBoundary'

test('render ErrorBoundary', () => {
  const component = renderer.create(<ErrorBoundary />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('render ErrorBoundary - with children', () => {
  const component = renderer.create(
    <ErrorBoundary>
      <h1>text</h1>
    </ErrorBoundary>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
