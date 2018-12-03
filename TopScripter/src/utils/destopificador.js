export const tussi = (code) => {
  let coisa = code.split(/\n/)
  let codigoTranspilado = ''
  // continental, 4x4

  coisa.forEach(linha => {
    // match de funcao
    // linha[1] = nome funcao
    // linha[2] = parametros
    const funcao = linha.match(/▶️\s(.*)\s✍️\s\[(.*)\]\s👉/i)

    if (funcao) {
      linha = `let ${funcao[1]} = (${funcao[2]}) => {`;
      linha = linha.replace(`#️⃣`, ``)
      linha = linha.replace(`🔡`, ``)
      linha = linha.replace(`🚻`, ``)
    }

    const repeticaoFor = linha.match(/🔁\s(.*)👌(.*)👌(.*)👉/)

    if (repeticaoFor) {
      linha = `for (${repeticaoFor[1]}; ${repeticaoFor[2]}; ${repeticaoFor[3]}) { `
    }

    const repeticaoWhile = linha.match(/🔄(.*) 👉/)

    if (repeticaoWhile) {
      linha = `while (${repeticaoWhile[1]}) { `
    }

    const condicionalIf = linha.match(/🤔(.*)👉/)

    if (condicionalIf) {
      linha = `if (${condicionalIf[1]}) {`
    }

    linha = linha.replace(/🔝/g, ``)
    linha = linha.replace(/🔚/g, ``)
    linha = linha.replace(/👉/g, `{`)
    linha = linha.replace(/👈/g, `}`)

    linha = linha.replace(/🙄/g, `else`)
    linha = linha.replace(/#️⃣/g, `let`)
    linha = linha.replace(/🔡/g, `let`)
    linha = linha.replace(/🚻/g, `let`)
    linha = linha.replace(/🅰️/g, `and`)
    linha = linha.replace(/🅾️/g, `or`)
    linha = linha.replace(/🤝/g, `==`)
    linha = linha.replace(/❗/g, `!=`)
    linha = linha.replace(/✍️/g, `=`)
    linha = linha.replace(/👎/g, `false`)
    linha = linha.replace(/👍/g, `true`)
    linha = linha.replace(/↪️/g, `return`)
    linha = linha.replace(/print/g, `console.log`)

    codigoTranspilado += linha + '\n'
  });

  return codigoTranspilado
}