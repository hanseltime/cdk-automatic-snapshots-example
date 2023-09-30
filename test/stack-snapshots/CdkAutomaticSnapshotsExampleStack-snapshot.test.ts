import { getSynthedStack } from '../test-utils'
import { dump } from 'js-yaml'

it('CdkAutomaticSnapshotsExampleStack snapshots', () => {
  const stack = getSynthedStack('CdkAutomaticSnapshotsExampleStack')
  expect(dump(stack.template)).toMatchSnapshot()
})