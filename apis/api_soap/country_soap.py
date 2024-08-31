from zeep import Client

wsdl_url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL"
client = Client(wsdl=wsdl_url)
# Lista as funções disponíveis
available_funcs = {
	"CapitalCity": client.service.CapitalCity,
	"CountryFlag ": client.service.CountryFlag,
	"CountryCurrency": client.service.CountryCurrency,
}

print("Escolha o número da função desejada")
print("="*30)
for i, function_name in enumerate(available_funcs.keys(), start=1):
    print(f"{i} - {function_name}")
print("="*30)
    
choice = int(input("Sua escolha: "))

while (choice < 1 or choice > len(available_funcs.keys())):
    print("Escolha inválida")
    print("="*30)
    choice = int(input("Sua escolha: "))

chosen_function_name = list(available_funcs.keys())[choice - 1]
chosen_function = available_funcs[chosen_function_name]

data = input("Digite a sigla do país: ").upper()
result = chosen_function(sCountryISOCode=data)

if choice == 1:
	print(f"A capital de {data} é {result}")
elif choice == 2:
    print(f"Link da bandeira de {data}: {result}")
elif choice == 3:
    currency_code = result['sISOCode']
    currency_name = result['sName']
    print("="*30)
    print(f"Código da moeda: {currency_code}")
    print(f"Nome da moeda: {currency_name}")
    print("="*30)
