import { SimpleClassNamePipe } from './simple-class-name.pipe';

describe('SimpleClassNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SimpleClassNamePipe();
    expect(pipe).toBeTruthy();
  });
});
