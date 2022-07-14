import renderer from 'react-test-renderer'
import Footer from '../src/pages/common/Footer'

test('render footer', () => {
  const component = renderer.create(<Footer />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
