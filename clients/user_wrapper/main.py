from users_wrapper import Users_wrapper
users_wrapper = Users_wrapper()

print("Digite 1 para listar os usuários")
print("Digite 2 para ler um usuário")
print("Digite 3 para deletar um usuário")
print("Digite 4 para atualizar um usuário")
print("Digite 5 para criar um usuário")
option = int(input())

if option == 1:
    for user in users_wrapper.list_users():
        print(f"{user['id']} - {user['name']}")
        
elif option == 2:
    user_id = str(input("Digite o ID do usuário: "))
    user = users_wrapper.read_user(user_id)
    print(f"{user['name']} - {user['username']} - {user['email']}")

elif option == 3:
    user_id = str(input("Digite o ID do usuário: "))
    status = users_wrapper.delete_user(user_id)
    if status == 200:
        print("Usuário atualizado")
    else:
        print("Erro ao atulizar")

elif option == 4:
    user_id = str(input("Digite o ID do usuário: "))
    name = input("Nome: ")
    username = input("Username: ")
    email = input("Email: ")
    user_data = {
        "name": name,
        "username": username,
        "email": email,
        "address": {
            "street": None,
            "suite": None,
            "city": None,
            "zipcode": None,
            "geo": {
                "lat": None,
                "lng": None
            }
        },
        "phone": None,
        "website": None,
        "company": {
            "name": None,
            "catchPhrase": None,
            "bs": None
        }
    }

    status = users_wrapper.update_user(user_id, user_data)
    if status == 200:
        print("Usuário atualizado")
    else:
        print("Erro ao atulizar")

elif option == 5:
    name = input("Nome: ")
    username = input("Username: ")
    email = input("Email: ")
    user_data = {
        "name": name,
        "username": username,
        "email": email,
    }

    status = users_wrapper.create_user(user_data)
    if status == 201:
        print("Usuário criado")
    else:
        print("Erro ao criar")


# print(users_wrapper.create_user("Arnaldo", "Fonsa", "arnaldo@email"))
# print(users_wrapper.delete_user(2))
# print(users_wrapper.detail_user(4))
# print(users_wrapper.update_user(2, "Alguém"))