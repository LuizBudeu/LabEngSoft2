# Generated by Django 5.0.1 on 2024-03-23 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_nutricionista_usuario_pedidoexamenutricionista'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedidoexamenutricionista',
            name='status',
            field=models.IntegerField(choices=[(0, 'Pendente'), (1, 'Finalizada')], default=1),
        ),
    ]
