import { readFileSync, writeFileSync } from 'fs'
import Handlebars from 'handlebars'
import { dirname, join, relative, resolve } from 'path'

export function createStackSnapshotTest(stackName: string, snapshotTestLocation: string) {
  const templateStr = readFileSync(resolve(join(__dirname, 'stack-snapshot.test.ts.handlebars'))).toString()
  const template = Handlebars.compile(templateStr)
  const context = {
    pathToTestUtils: relative(dirname(snapshotTestLocation), __dirname),
    stackName,
  }
  writeFileSync(snapshotTestLocation, template(context))
}
