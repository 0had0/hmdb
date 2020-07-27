export const loading = (state, key) => {
  return {
    ...state,
    loading: { ...state.loading, [key]: true },
    error: { ...state.error, [key]: null },
  };
};

export const success = (state, payload) => {
  const { key, value } = payload;
  return {
    ...state,
    loading: { ...state.loading, [key]: false },
    data: { ...state.data, [key]: value },
    error: { ...state.error, [key]: null },
  };
};

export const update = (state, payload) => {
  const { key, value } = payload;
  return {
    ...state,
    loading: { ...state.loading, [key]: false },
    data: {
      ...state.data,
      [key]: [...state.data[key], ...value],
    },
  };
};

export const error = (state, payload) => {
  const { key, value } = payload;
  return {
    ...state,
    loading: { ...state.loading, [key]: false },
    data: { ...state.data, [key]: null },
    error: { ...state.error, [key]: value },
  };
};

export const setPageLeftOf = (state, payload) => {
  const { key, value } = payload;
  return {
    ...state,
    left_pages: { ...state.page_left, [key]: value },
  };
};
