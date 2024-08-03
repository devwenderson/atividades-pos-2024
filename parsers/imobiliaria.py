from xml.dom.minidom import parse
import json

dom = parse("xsd/imobiliaria/imobiliaria.xml")
imobiliaria = dom.documentElement
imoveis = imobiliaria.getElementsByTagName("imovel")

data = {"imoveis": []}

for imovel in imoveis:
    descricao = imovel.getElementsByTagName("descricao")[0].firstChild.nodeValue
    
    nome_proprietario = imovel.getElementsByTagName("nome")[0].firstChild.nodeValue
    telefones_proprietario = imovel.getElementsByTagName("telefone")
    telefones = [tel.firstChild.nodeValue for tel in telefones_proprietario]
    
    emails_proprietario = imovel.getElementsByTagName("email")
    emails = [email.firstChild.nodeValue for email in emails_proprietario]

    rua = imovel.getElementsByTagName("rua")[0].firstChild.nodeValue
    bairro = imovel.getElementsByTagName("bairro")[0].firstChild.nodeValue
    cidade = imovel.getElementsByTagName("cidade")[0].firstChild.nodeValue
    numero = imovel.getElementsByTagName("numero")[0].firstChild.nodeValue
    
    tamanho = float(imovel.getElementsByTagName("tamanho")[0].firstChild.nodeValue)
    numQuartos = int(imovel.getElementsByTagName("numQuartos")[0].firstChild.nodeValue)
    numBanheiros = int(imovel.getElementsByTagName("numBanheiros")[0].firstChild.nodeValue)
    
    valor = float(imovel.getElementsByTagName("valor")[0].firstChild.nodeValue)

    # Dicionário com a estrutura do JSON
    data["imoveis"].append({
        "descricao": descricao,
        "proprietario": {
            "nome": nome_proprietario,
            "telefone": telefones,
            "email": emails
        },
        "endereco": {
            "rua": rua,
            "bairro": bairro,
            "cidade": cidade,
            "numero": numero,
        },
        "caracteristicas": {
            "tamanho": tamanho,
            "numQuartos": numQuartos,
            "numBanheiros": numBanheiros
        },
        "valor": valor
    })

# Gera o arquivo JSON
with open("parsers/imobiliaria.json", "w", encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)





