from django.db import models

class Artista(models.Model):
    nome = models.CharField(max_length=100)
    local = models.CharField(max_length=100)

    def __str__(self):  
        return f'{self.nome}'

class Album(models.Model):
    artista = models.ForeignKey(Artista, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    ano = models.IntegerField()

    def __str__(self):  
        return f'{self.nome} - {self.artista} - {self.ano}'

class Musica(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    segundos = models.IntegerField()

    def __str__(self):  
        return f'{self.nome} {self.album} - {self.segundos}'