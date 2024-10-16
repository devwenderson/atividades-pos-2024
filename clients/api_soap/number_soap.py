from zeep import Client

# define a URL do WSDL
wsdl_url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"

# inicializa o cliente zeep
client = Client(wsdl=wsdl_url)

# define o código do país para BR
number = int(input("Digite um número: "))

# faz a chamada do serviço
result = client.service.NumberToWords(
	ubiNum=number
)
# imprime o resultado
print(result)
