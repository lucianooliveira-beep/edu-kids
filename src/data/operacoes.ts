export interface Operacao {
  a: number
  b: number
  operador: '+' | '-' | 'x' | '÷'
  resposta: number
  nivel: number
}

export function gerarOperacoes(tipo: string, quantidade: number): Operacao[] {
  const ops: Operacao[] = []
  for (let i = 0; i < quantidade; i++) {
    let a: number, b: number, resposta: number, operador: Operacao['operador'], nivel: number
    switch (tipo) {
      case 'adicao':
        a = Math.floor(Math.random() * 50) + 1
        b = Math.floor(Math.random() * 50) + 1
        resposta = a + b
        operador = '+'
        nivel = a + b > 50 ? 2 : 1
        break
      case 'subtracao':
        a = Math.floor(Math.random() * 50) + 10
        b = Math.floor(Math.random() * a) + 1
        resposta = a - b
        operador = '-'
        nivel = a > 30 ? 2 : 1
        break
      case 'multiplicacao':
        a = Math.floor(Math.random() * 10) + 1
        b = Math.floor(Math.random() * 10) + 1
        resposta = a * b
        operador = 'x'
        nivel = a > 5 || b > 5 ? 2 : 1
        break
      case 'divisao':
        b = Math.floor(Math.random() * 9) + 2
        resposta = Math.floor(Math.random() * 10) + 1
        a = b * resposta
        operador = '÷'
        nivel = a > 30 ? 2 : 1
        break
      default:
        a = Math.floor(Math.random() * 20) + 1
        b = Math.floor(Math.random() * 20) + 1
        resposta = a + b
        operador = '+'
        nivel = 1
    }
    ops.push({ a, b, operador, resposta, nivel })
  }
  return ops
}
