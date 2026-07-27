/**
 * Testes Unitários do Motor de Cálculo da Dobradinha e Classificação de Território
 * Executáveis via runner nativo ou Vitest/Jest
 */

import assert from 'node:assert';
import { test, describe } from 'node:test';
import { calcularEstatisticasDobradinha, UnidadeBruta } from '../dobradinhaCalculator';
import { calcularPercentil } from '../territoryClassifier';

describe('Motor de Cálculo da Dobradinha', () => {
  test('deve calcular corretamente aderência, força, sobreposição e complementaridade', () => {
    const unidades: UnidadeBruta[] = [
      {
        id: '1',
        camada: 'municipio',
        nome: 'Recife',
        uf: 'PE',
        mesorregiao: 'Metropolitana',
        microrregiao: 'Recife',
        votos_A: 300,
        votos_B: 100,
        comparecimento: 1000,
        aptos: 1200,
        total_secoes: 5,
      },
      {
        id: '2',
        camada: 'municipio',
        nome: 'Olinda',
        uf: 'PE',
        mesorregiao: 'Metropolitana',
        microrregiao: 'Recife',
        votos_A: 200,
        votos_B: 200,
        comparecimento: 800,
        aptos: 1000,
        total_secoes: 4,
      },
    ];

    const resultado = calcularEstatisticasDobradinha(unidades, '2022-1', '2026-07-27');

    assert.strictEqual(resultado.length, 2);

    // Recife: vA=300, vB=100, comp=1000 => adA=0.3, adB=0.1, forca=0.4
    const recife = resultado.find((r) => r.nome === 'Recife')!;
    assert.strictEqual(recife.aderencia_A, 0.3);
    assert.strictEqual(recife.aderencia_B, 0.1);
    assert.strictEqual(recife.forca_dobradinha, 0.4);
    assert.ok(Math.abs(recife.sobreposicao - (0.1 / 0.3)) < 1e-6);
    assert.ok(Math.abs(recife.complementaridade - 0.2) < 1e-6); // |0.3 - 0.1|

    // Olinda: vA=200, vB=200, comp=800 => adA=0.25, adB=0.25, forca=0.5
    const olinda = resultado.find((r) => r.nome === 'Olinda')!;
    assert.strictEqual(olinda.aderencia_A, 0.25);
    assert.strictEqual(olinda.aderencia_B, 0.25);
    assert.strictEqual(olinda.forca_dobradinha, 0.5);
    assert.strictEqual(olinda.sobreposicao, 1.0); // 0.25 / 0.25
    assert.strictEqual(olinda.complementaridade, 0.0); // |0.25 - 0.25|
  });

  test('deve tratar seções com dados nulos mantendo tem_dados_nulos = true sem converter para zero', () => {
    const unidades: UnidadeBruta[] = [
      {
        id: '3',
        camada: 'secao',
        nome: 'Seção 123',
        uf: 'PE',
        mesorregiao: 'Agreste',
        microrregiao: 'Caruaru',
        votos_A: null,
        votos_B: 50,
        comparecimento: 200,
        aptos: 250,
        total_secoes: 1,
      },
    ];

    const resultado = calcularEstatisticasDobradinha(unidades, '2022-1', '2026-07-27');
    assert.strictEqual(resultado[0].tem_dados_nulos, true);
    assert.strictEqual(resultado[0].votos_A, 0);
    assert.strictEqual(resultado[0].votos_B, 50);
  });

  test('deve calcular percentis corretamente', () => {
    const arr = [10, 20, 30, 40, 50];
    assert.strictEqual(calcularPercentil(arr, 0.5), 30);
    assert.strictEqual(calcularPercentil(arr, 0), 10);
    assert.strictEqual(calcularPercentil(arr, 1), 50);
  });
});
