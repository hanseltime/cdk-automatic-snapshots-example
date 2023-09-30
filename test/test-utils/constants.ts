import path from 'path'

// Note - we make the temp dir outside of the source dir so that typescript rules
// don't panic on the temp directory's typescript files
export const TEMP_SYNTH_OUT_FOLDER = path.resolve(__dirname, '..', '..', 'temp.out')
