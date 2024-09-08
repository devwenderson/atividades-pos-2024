def calcular_media(nome_aluno, **kwargs):
    print(nome_aluno)
    media = 0
    for nota in kwargs:
        media += kwargs[nota]
    media = media / len(kwargs.keys())
    return media

media = calcular_media('Wenderson', nota1=2, nota2=2, nota3=2, nota4=2)
print(f"Media final: {media}")
	
	