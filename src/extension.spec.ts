import { getFixtureName } from './extension';
import * as vscode from 'vscode';

describe('getFixtureName', () => {
  let activeTextEditor = jest.spyOn(vscode.window, 'activeTextEditor', 'get');

  beforeEach(() => {
    activeTextEditor.mockReset();
  });

  it('returns false when activeTextEditor is undefined', () => {
    activeTextEditor.mockReturnValue(undefined);
    expect(getFixtureName()).toBe(false);
  });

  it('returns false when document is untitled', () => {
    activeTextEditor.mockReturnValue({
      document: {
        fileName: 'example.tsx',
        isUntitled: true
      }
    });
    expect(getFixtureName()).toBe(false);
  });

  describe('returns fixture for filename', () => {
    beforeEach(() => {
      activeTextEditor.mockReset();
    });

    it('exampleFile.ts', () => {
      activeTextEditor.mockReturnValue({
        document: {
          fileName: 'exampleFile.ts',
          isUntitled: false
        }
      });

      expect(getFixtureName()).toBe('exampleFile.fixture.ts');
    });

    it('myfile.tsx', () => {
      activeTextEditor.mockReturnValue({
        document: {
          fileName: 'myfile.tsx',
          isUntitled: false
        }
      });

      expect(getFixtureName()).toBe('myfile.fixture.tsx');
    });

    it('complex.file.jsx', () => {
      activeTextEditor.mockReturnValue({
        document: {
          fileName: 'complex.file.jsx',
          isUntitled: false
        }
      });

      expect(getFixtureName()).toBe('complex.file.fixture.jsx');
    });
  });
});
