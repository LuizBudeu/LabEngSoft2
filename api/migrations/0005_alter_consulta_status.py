# Generated by Django 5.0.1 on 2024-03-08 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_paciente_delete_dadosbancarios'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consulta',
            name='status',
            field=models.IntegerField(choices=[(0, 'Agendada'), (1, 'Cancelada'), (2, 'Realizada'), (3, 'Vencida'), (4, 'Pendente')]),
        ),
    ]
