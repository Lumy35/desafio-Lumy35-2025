import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'PEDRA,LASER', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });
  
  test('Deve rejeitar brinquedo vazio', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', ' ,LASER', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,LASER', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Loco deve ir para o abrigo se escolhido sozinho', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', '', 'Loco');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
  });

  test('Loco deve ir para pessoa1 se ela tiver outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO,BOLA', 'RATO,LASER', 'Loco,Rex');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
  });

  test('Loco deve ir para o abrigo em caso de empate', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
  });

  test('Animal deve ir para quem tem a ordem correta de brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA', 'NOVELO,CAIXA', 'Bebe,Bola');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Bola - abrigo');
    expect(resultado.lista.length).toBe(2);
  });

  test('Animal sem correspondência deve ir para o abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'BOLA,RATO', 'Bebe,Mimi');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.lista[1]).toBe('Mimi - abrigo');
    expect(resultado.lista.length).toBe(2);
  });

  test('Todos animais encontrados corretamente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA', 'CAIXA,RATO,NOVELO', 'Rex,Bola,Bebe');
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Bola - pessoa 2');
    expect(resultado.lista[2]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(3);
  });

  test('Alguns animais vão para o abrigo, outros para pessoas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'CAIXA,BOLA,NOVELO', 'Rex,Bola,Fofo,Mimi'
    );
    expect(resultado.erro).toBeFalsy();
    expect(resultado.lista[0]).toBe('Bola - pessoa 2');
    expect(resultado.lista[1]).toBe('Fofo - abrigo');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(4);
  });
});
