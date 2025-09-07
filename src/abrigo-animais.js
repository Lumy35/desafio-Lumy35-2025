import {Animais} from './animais.js';

const animais = new Animais();

class AbrigoAnimais {

  // método principal para encontrar pessoas
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // separar strings em arrays
    const pessoa1 = this._parseBrinquedos(brinquedosPessoa1);
    const pessoa2 = this._parseBrinquedos(brinquedosPessoa2);
    const animaisOrdem = this._parseAnimais(ordemAnimais);

    // validar brinquedos
    const brinquedosValidosPessoa1 = this._validarBrinquedos(pessoa1);
    const brinquedosValidosPessoa2 = this._validarBrinquedos(pessoa2);
    if (brinquedosValidosPessoa1.erro || brinquedosValidosPessoa2.erro) {
      return { lista: false, erro: 'Brinquedo inválido' };
    }

    // validar animais
    const animaisValidos = this._validarAnimais(animaisOrdem);
    if (animaisValidos.erro) {
      return { lista: false, erro: 'Animal inválido' };
    }
    
    // mapeiar animais para pessoas/abrigo
    return this._mapearAnimaisParaPessoas(pessoa1, pessoa2, animaisOrdem);
    
  }

  // métodos auxiliar para separar strings em arrays
  _parseBrinquedos(brinquedos) {
    if (!brinquedos || brinquedos.trim() === '') return [];
    return brinquedos.split(',').map(b => b.trim().toUpperCase());
  }

  _parseAnimais(animais) {
    if (!animais || animais.trim() === '') return [];
    return animais.split(',').map(a => a.trim());
  }

  // método auxiliar para validar brinquedos
  _validarBrinquedos(brinquedos) {
    const vistos = new Set();
    for (const brinquedo of brinquedos) {
      if (!brinquedo || brinquedo.trim() === '') { return { erro: true }; }
      if (!animais.brinquedosValidos.includes(brinquedo)) {return { erro: true }; }
      if (vistos.has(brinquedo)) { return { erro: true }; }
      vistos.add(brinquedo);
    }
    return { erro: false };
  }

  // método auxiliar para validar animais
  _validarAnimais(animaisOrdem) {
    const vistos = new Set();
    for (const animal of animaisOrdem) {
      if (!animal || animal.trim() === '') { return { erro: true }; }
      if (!animais.animais.hasOwnProperty(animal)) { return { erro: true }; }
      if (vistos.has(animal)) { return { erro: true }; }
      vistos.add(animal);
    }
    return { erro: false };
  }

  // métodos auxiliares para verificar consistência de brinquedos
  _isSubsequence(pattern, arr) {
    if (!pattern || pattern.length === 0) return false;
    let patternIndex = 0;
    for (let i = 0; i < arr.length && patternIndex < pattern.length; i++) {
      if (arr[i] === pattern[patternIndex]) patternIndex++;
    }
    return patternIndex === pattern.length;
  }

  _hasAllItems(pattern, arr) {
    if (!pattern || pattern.length === 0) return false;
    const setArr = new Set(arr);
    return pattern.every(item => setArr.has(item));
  }

  // método específico para validar Loco
  _validarLoco(pessoa1, pessoa2, resultado) {
    const locoBrinquedos = animais.animais['Loco'].brinquedos.map(b => b.toUpperCase());

    const pessoa1TemLoco = this._hasAllItems(locoBrinquedos, pessoa1);
    const pessoa2TemLoco = this._hasAllItems(locoBrinquedos, pessoa2);

    const pessoa1TemAnimal = Object.values(resultado).some(v => v === 'pessoa 1');
    const pessoa2TemAnimal = Object.values(resultado).some(v => v === 'pessoa 2');

    const pessoa1PodeLevarLoco = pessoa1TemLoco && pessoa1TemAnimal;
    const pessoa2PodeLevarLoco = pessoa2TemLoco && pessoa2TemAnimal;

    // regras de validação
    if (pessoa1PodeLevarLoco && !pessoa2PodeLevarLoco) return 'pessoa 1';
    if (!pessoa1PodeLevarLoco && pessoa2PodeLevarLoco) return 'pessoa 2';
    return 'abrigo';
  }

  _mapearAnimaisParaPessoas(pessoa1, pessoa2, animaisOrdem) {
    const resultado = {};

    for (const animal of animaisOrdem) {
      if (animal === 'Loco') continue;

      const brinquedosAnimal = animais.animais[animal].brinquedos.map(b => b.toUpperCase());
      const podePessoa1 = this._isSubsequence(brinquedosAnimal, pessoa1);
      const podePessoa2 = this._isSubsequence(brinquedosAnimal, pessoa2);

      if (podePessoa1 && !podePessoa2) { resultado[animal] = 'pessoa 1';
      } else if (!podePessoa1 && podePessoa2) { resultado[animal] = 'pessoa 2';
      } else { resultado[animal] = 'abrigo'; }
    }
    
    if (animaisOrdem.includes('Loco')) {
      resultado['Loco'] = this._validarLoco(pessoa1, pessoa2, resultado);
    }

    for (const animal of animaisOrdem) {
      if (!resultado.hasOwnProperty(animal)) {
        resultado[animal] = 'abrigo';
      }
    }

    const listaResultado = Object.keys(resultado)
    .sort((a, b) => a.localeCompare(b))
    .map(animal => `${animal} - ${resultado[animal]}`);

    return { lista: listaResultado, erro: false };
  }

}

export { AbrigoAnimais as AbrigoAnimais };
