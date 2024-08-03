import json

# Importar de um arquivo
with open('parsers/imobiliaria.json', encoding='utf-8') as json_file:
    parsed_data = json.load(json_file)
    
imoveis = parsed_data["imoveis"]
id_imovel = 1
for imovel in imoveis:
    print(f"Imóvel {id_imovel}")
    id_imovel += 1

print("")
print("="*30)   
id_selecionado = int(input("Para mais informações, digite o ID do imóvel: ")) 
imovel = imoveis[id_selecionado - 1]

descricao = imovel["descricao"]
proprietario = imovel["proprietario"]
tel_proprietario = proprietario["telefone"]
email_proprietario = proprietario["email"]
endereco = imovel["endereco"]
caracteristicas = imovel["caracteristicas"]
valor = imovel["valor"]

print("="*30)
print("****** Descrição: ******")
print(descricao)
print("")

print("****** Proprietário(a): ******")
print(f"  - {proprietario["nome"]}")
print("")

print("****** Tel.: ******")
# Indentar números de telefone
for tel in tel_proprietario:
    print(f"  - {tel}")
print("")

print("****** Email: ******")
# Indentar e-mails
for email in email_proprietario:
    print(f"  - {email}")
print("")

print("****** Endereço: ******")
print(f"   Rua: {endereco["rua"]}")
print(f"   Bairro: {endereco["bairro"]}")
print(f"   Cidade: {endereco["cidade"]}")
print(f"   N°: {endereco["numero"]}")
print("")

print("****** Características: ******")
print(f"  Tamanho: {caracteristicas["tamanho"]} m^2")
print(f"  N° de quartos: {caracteristicas["numQuartos"]}")
print(f"  N° de banheiros: {caracteristicas["numBanheiros"]}")
print("")

print(f"****** Valor: R$ {valor} ******")

print("="*30)

