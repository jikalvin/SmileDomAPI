import { v4 as uuidv4 } from 'uuid';

export const generateUniqueFilename = (file) => {
    const extension = file.filename.split('.').pop();
    return `${uuidv4()}.${extension}`;
  }
