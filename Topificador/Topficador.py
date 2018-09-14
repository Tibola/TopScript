#!/usr/bin/env python3
import argparse
import re

def topficador(codigo):
  codigo = re.sub(r"\btop\b", "🔝", codigo)
  codigo = re.sub(r"\bend\b", "🔚", codigo)
  codigo = re.sub(r"\bfor\b", "🔁", codigo)
  codigo = re.sub(r"\bwhile\b", "🔄", codigo)
  codigo = re.sub(r"\bif\b", "🤔", codigo)
  codigo = re.sub(r"\belse\b", "🙄", codigo)
  codigo = re.sub(r"\bint\b", "#️⃣", codigo)
  codigo = re.sub(r"\bstring\b", "🔡", codigo)
  codigo = re.sub(r"\bboolean\b", "🚻", codigo)
  codigo = re.sub(r"\blist\b", "📝", codigo)
  codigo = re.sub(r"{", "👉", codigo)
  codigo = re.sub(r"}", "👈", codigo)
  codigo = re.sub(r"\[", "✒️", codigo)
  codigo = re.sub(r"\]", "🖋", codigo)
  codigo = re.sub(r"\band\b", "🅰️", codigo)
  codigo = re.sub(r"\bor\b", "🅾️", codigo)
  codigo = re.sub(r"\bclass\b", "🧐", codigo)
  codigo = re.sub(r"\bprotected\b", "🛡", codigo)
  codigo = re.sub(r"\bpublic\b", "🚌", codigo)
  codigo = re.sub(r"\bprivate\b", "🚧", codigo)
  codigo = re.sub(r"\bprint\b", "🤬", codigo)
  codigo = re.sub(r"\blength\b", "📏", codigo)
  codigo = re.sub(r"==", "↔️", codigo)
  codigo = re.sub(r"=", "✍️", codigo)
  codigo = re.sub(r"\bimport\b", "🛬", codigo)
  codigo = re.sub(r"\bexport\b", "🛫" , codigo)
  codigo = re.sub(r"!=", "❗", codigo)
  codigo = re.sub(r"\bfalse\b", "👎", codigo)
  codigo = re.sub(r"\btrue\b", "👍", codigo)
  codigo = re.sub(r"\bnil\b", "🤷‍", codigo)

  return codigo

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('filename')
  args = parser.parse_args()

  codigo = ""

  with open(args.filename) as file:
    codigo = file.read()
  
  print(codigo)
  codigoTop = topficador(codigo)
  print(codigoTop)
  
  with open(args.filename + ".🔝", "w") as file:
    file.write(codigoTop)

if __name__ == "__main__":
  main()