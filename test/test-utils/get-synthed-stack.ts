import { TEMP_SYNTH_OUT_FOLDER } from './constants'
import * as cxapi from 'aws-cdk-lib/cx-api'

/**
 * Test tooling method that will grab the rendered
 * cdk stack from the fully output that was done once
 * for caching purposes in jestGlobalSetup.ts
 */
export function getSynthedStack(stackName: string) {
  const assembly = new cxapi.CloudAssembly(TEMP_SYNTH_OUT_FOLDER, {})
  const stack = assembly.getStackByName(stackName)
  return stack
}
