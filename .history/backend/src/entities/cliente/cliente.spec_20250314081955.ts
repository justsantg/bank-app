import { Cliente } from './cliente.entity';

describe('Cliente', () => {
  it('should be defined', () => {
    expect(new Cliente()).toBeDefined();
  });
});
