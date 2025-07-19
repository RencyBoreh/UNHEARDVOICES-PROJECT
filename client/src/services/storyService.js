import API from './api';

export const getStories = () => API.get('/stories');
export const getStoryById = (id) => API.get(`/stories/${id}`);
export const createStory = (data) => API.post('/stories', data);
