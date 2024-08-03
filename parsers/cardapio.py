from xml.dom.minidom import parse

dom = parse("xsd/cardapio/cardapio.xml")
cardapio = dom.documentElement
pratos = cardapio.getElementsByTagName("prato")

# Lista os pratos
for prato in pratos:
    id = prato.getAttribute("id")
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    print(f"{id} - {nome}")

# Seleciona um prato
id_prato = int(input("Selecione o id do prato: "))
prato = pratos[id_prato-1]

nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue 
descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue 
ingredientes = prato.getElementsByTagName("ingrediente")
ingredientes = [f"   - {ingrediente.firstChild.nodeValue}" for ingrediente in ingredientes] # List Comprehension

preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue 
calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue 
tempoPreparo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue 

print("")
print("="*30)
print(f"Nome: {nome}")
print(f"Descrição: {descricao}")
print("Ingredientes:")
print("\n".join(ingredientes))
print(f"Preço: R$ {preco}")
print(f"Calorias: {calorias} kcal")
print(f"Tempo de preparo: {tempoPreparo}")
print("="*30)
    