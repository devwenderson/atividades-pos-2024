from rest_framework import routers

from api import views

router = routers.DefaultRouter()
router.register(r'artistas', views.ArtistaViewSet)
router.register(r'albuns', views.AlbumViewSet)
router.register(r'musicas', views.MusicaViewSet)