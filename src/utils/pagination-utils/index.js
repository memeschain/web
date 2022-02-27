export const LIMIT = 12;

export const getOffset = (page = 1) => (page - 1) * LIMIT;
