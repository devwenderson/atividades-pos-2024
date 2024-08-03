from xml.dom.minidom import parse

dom = parse("xsd/cardapio/cardapio.xml")
cardapio = dom.documentElement
pratos = cardapio.getElementsByTagName("prato")

for prato in pratos:
    id = prato.getAttribute('id')
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue 
    descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue 
    ingredientes = prato.getElementsByTagName("ingrediente")

    for ingrediente in ingredientes:
        ingrediente = ingrediente.firstChild.nodeValue
        # print(ingrediente)
    
    preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue 
    calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue 
    tempoPreparo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue 

    print(f"Nome: {nome}")
    print(f"Descrição: {descricao}")
    print(f"Preço: {preco}")
    
