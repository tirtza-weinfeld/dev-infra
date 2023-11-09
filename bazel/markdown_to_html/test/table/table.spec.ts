import {parseMarkdown} from '../../src/index';
import {runfiles} from '@bazel/runfiles';

describe('markdown to html', () => {
  let parsedMarkdown: string;
  beforeAll(async () => {
    const kitchenSyncFilePath = runfiles.resolvePackageRelative('table/table.md');
    parsedMarkdown = await parseMarkdown(kitchenSyncFilePath);
  });

  it('should wrap the table in custom div', () => {
    expect(parsedMarkdown).toContain('<div class="docs-table adev-scroll-track-transparent">');
  });

  it('should place the initial row as table header cells', () => {
    expect(parsedMarkdown).toContain('<th>Sports</th>');
    expect(parsedMarkdown).toContain('<th>Season</th>');
  });

  it('should place the subsequent rows as regular table cells', () => {
    expect(parsedMarkdown).toContain('<td>Baseball</td>');
    expect(parsedMarkdown).toContain('<td>Year Round</td>');
  });
});