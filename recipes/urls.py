from django.conf.urls import url
from recipes import views

urlpatterns = [
    url(r'^users-categories/$',
        views.UserList.as_view(),
        name=views.UserList.name),
    url(r'^users-categories/(?P<pk>[0-9]+)$',
        views.UserDetail.as_view(),
        name=views.UserDetail.name),
    url(r'^$',
        views.ApiRoot.as_view(),
        name=views.ApiRoot.name),
]