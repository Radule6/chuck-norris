import xss from 'xss';

interface Input {
  [key: string]: string;
}
export const sanitizeInput = (input: Input): Input => {
  const sanitizedInput: Input = {};

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const value = input[key];
      sanitizedInput[key] = xss(value);
    }
  }
  return sanitizedInput;
};
