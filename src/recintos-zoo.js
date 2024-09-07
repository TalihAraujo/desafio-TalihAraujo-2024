class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    validarAnimal(especie) {
      return this.animais[especie] ? true : false;
    }
  
    validarQuantidade(quantidade) {
      return Number.isInteger(quantidade) && quantidade > 0;
    }
  
    isRecintoViavel(recinto, especie, quantidade) {
      const animalInfo = this.animais[especie];
      const totalEspacoNecessario = (animalInfo.tamanho * quantidade) + (recinto.animais.length > 0 ? 1 : 0);
      const espacoOcupado = recinto.animais.reduce((sum, animal) => sum + (animal.tamanho * animal.quantidade), 0);
  
      if (recinto.tamanho < espacoOcupado + totalEspacoNecessario) return false;
      if (!animalInfo.biomas.includes(recinto.bioma)) return false;
      if (animalInfo.carnivoro && recinto.animais.length > 0) return false;
      if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) return false;
      if (especie === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) return false;
  
      return true;
    }
  
    analisaRecintos(especie, quantidade) {
      if (!this.validarAnimal(especie)) {
        return { erro: "Animal inválido" };
      }
  
      if (!this.validarQuantidade(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
  
      const recintosViaveis = this.recintos
      .filter(recinto => this.isRecintoViavel(recinto, especie, quantidade))
      .map(recinto => {
        const espacoOcupado = recinto.animais.reduce((sum, animal) => sum + (animal.tamanho * animal.quantidade), 0);
        
        const especiesNoRecinto = new Set(recinto.animais.map(animal => animal.especie));
        
        const espacoExtra = especiesNoRecinto.size > 0 && !especiesNoRecinto.has(especie) ? 1 : 0;
    
        const espacoLivre = recinto.tamanho - espacoOcupado - (this.animais[especie].tamanho * quantidade) - espacoExtra;
        
        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
      });
    
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  const zoo = new RecintosZoo();
  const resultado = zoo.analisaRecintos('MACACO', 2);
  console.log(resultado);
  
  export { RecintosZoo as RecintosZoo };
  