import type { Config } from '@jest/types'
import { main } from '../../bin/deploy'
import { TEMP_SYNTH_OUT_FOLDER  } from './constants'
import { existsSync, mkdirSync, rmdirSync } from 'fs'

/**
 * Global Config only runs once.  We want to use it to run the cdk snapshots exactly once (for overhead reasons)
 * since we are running all stacks at once
 */
export default async function (globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig): Promise<void> {
  console.info('Creating temporary CDK synth')
  if (existsSync(TEMP_SYNTH_OUT_FOLDER)) {
    rmdirSync(TEMP_SYNTH_OUT_FOLDER, {
      recursive: true,
    })
    mkdirSync(TEMP_SYNTH_OUT_FOLDER)
  }
  const app = await main(TEMP_SYNTH_OUT_FOLDER)
  app.synth()
}
