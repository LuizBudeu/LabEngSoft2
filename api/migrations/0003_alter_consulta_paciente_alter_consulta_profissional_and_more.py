# Generated by Django 5.0.1 on 2024-03-08 14:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_avaliacaonutricional'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consulta',
            name='paciente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='usuario', to='api.usuario'),
        ),
        migrations.AlterField(
            model_name='consulta',
            name='profissional',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profissional', to='api.usuario'),
        ),
        migrations.AlterField(
            model_name='dadosbancariosrecebimento',
            name='profissional',
            field=models.IntegerField(choices=[(0, 'Paciente'), (1, 'Médico'), (2, 'Nutricionista'), (3, 'Preparador físico'), (4, 'Administrador')]),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='ocupacao',
            field=models.IntegerField(choices=[(0, 'Paciente'), (1, 'Médico'), (2, 'Nutricionista'), (3, 'Preparador físico'), (4, 'Administrador')]),
        ),
    ]
