export const window = {
  get activeTextEditor() {
    return {
      document: {
        fileName: 'example.tsx',
        isUntitled: false
      }
    };
  },
  showInformationMessage: jest.fn()
};
