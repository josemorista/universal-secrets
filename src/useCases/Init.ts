import { writeFile } from 'fs/promises';

interface Input {
  providers: Array<string>;
  outfile?: string;
}

export class InitUseCase {
  async execute(input: Input) {
    const providersConfig: Array<string> = [];
    if (input.providers.includes('ssm')) {
      providersConfig.push('ssm: { variables: [] },');
    }
    if (input.providers.includes('dotenv')) {
      providersConfig.push("dotenv: { path: '.env' },");
    }

    await writeFile(
      input.outfile || 'shiu-config.js',
      `/**
 * @type {import('shiu').ConfigFile}
 */
module.exports = {
  ${providersConfig.join('\n  ')}
};
`
    );
  }
}
