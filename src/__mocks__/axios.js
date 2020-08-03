export default {
  get: jest.fn().mockResolvedValue({ data: { results: [] } }),
  all: jest.fn(),
  spread: jest.fn(),
  CancelToken: {
    source: jest.fn().mockImplementation(() => ({
      cancel: jest.fn(),
      token: '',
    })),
  },
};
