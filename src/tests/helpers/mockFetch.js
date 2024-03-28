import mockData from './mockData';

const mockFetch = () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
};

export default mockFetch;
