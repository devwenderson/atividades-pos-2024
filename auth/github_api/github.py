import requests
from requests.auth import HTTPBasicAuth

password = "SUA CHAVE DE ACESSO"

available_funcs = {
    'follow': requests.put,
    'unfollow': requests.delete,
}

# Lista as funções
print("Escolha o número da função desejada")
print("="*30)
for i, function_name in enumerate(available_funcs.keys(), start=1):
    print(f"{i} - {function_name}")
print("="*30)

# Escolher a função
choice = int(input("Sua escolha: "))

# Caso seja uma opção errada
while (choice < 1 or choice > len(available_funcs.keys())):
    print("Escolha inválida")
    print("="*30)
    choice = int(input("Sua escolha: "))


chosen_function_name = list(available_funcs.keys())[choice - 1] # pega o nome da função
chosen_function = available_funcs[chosen_function_name] # seleciona a função

if choice == 1:
    user = input("Digite o nome do usuário para seguir: ")
    response = chosen_function(f'https://api.github.com/user/following/{user}',
            auth = HTTPBasicAuth('SEU USUARIO', password))
if choice == 2:
    user = input("Digite o nome do usuário para deixar de seguir: ")
    response = chosen_function(f'https://api.github.com/user/following/{user}',
            auth = HTTPBasicAuth('SEU USUARIO', password))

print(response.status_code)
