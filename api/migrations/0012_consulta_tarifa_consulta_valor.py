# Generated by Django 5.0.1 on 2024-04-02 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_merge_20240325_1903'),
    ]

    operations = [
        migrations.AddField(
            model_name='consulta',
            name='tarifa',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='consulta',
            name='valor',
            field=models.FloatField(blank=True, null=True),
        ),
    ]