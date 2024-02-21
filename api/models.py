from django.db import models


OCUPACAO_CHOICES = [
    (0, "Cliente"),
    (1, "Médico"),
    (2, "Nutricionista"),
    (3, "Preparador físico"),
    (4, "Administrador"),
]

class Usuario(models.Model):
    email = models.CharField(max_length=100)
    senha = models.CharField(max_length=100)
    ocupacao = models.IntegerField(choices=OCUPACAO_CHOICES)
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11)
    data_de_nascimento = models.DateField()
    genero = models.CharField(max_length=100, blank=True, null=True)
    cep = models.CharField(max_length=100, blank=True, null=True)
    logradouro = models.CharField(max_length=100, blank=True, null=True)
    numero = models.CharField(max_length=100, blank=True, null=True)
    complemento = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class DadosBancarios(models.Model):
    paciente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    numero_do_cartao = models.CharField(max_length=16)
    validade = models.CharField(max_length=5)   # E.g.:  01/32
    cvv = models.CharField(max_length=3)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Consulta(models.Model):
    CONSULTA_CHOICES = [
        (0, 'Agendada'),
        (1, 'Cancelada'),
        (2, 'Realizada'),
        (3, 'Vencida')
    ]

    paciente = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    profissional = models.IntegerField(choices=OCUPACAO_CHOICES)
    horario = models.DateTimeField()
    duracao_em_minutos = models.IntegerField(blank=True, null=True)
    status = models.IntegerField(choices=CONSULTA_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Medico(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    crm = models.CharField(max_length=13)
    especialidade = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class RelatorioMedico(models.Model):
    consulta = models.ForeignKey(Consulta, on_delete=models.CASCADE)
    massa = models.FloatField(blank=True, null=True)
    altura = models.FloatField(blank=True, null=True)
    nivel_de_acucar_no_sangue = models.FloatField(blank=True, null=True)
    gordura_no_figado = models.IntegerField(blank=True, null=True)
    hemoglobina_glicada = models.FloatField(blank=True, null=True)
    producao_de_insulina = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Nutricionista(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    crn = models.CharField(max_length=13)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Dieta(models.Model):
    descricao_curta = models.CharField(max_length=100, blank=True, null=True)
    descricao = models.CharField(max_length=300, blank=True, null=True)
    duracao_em_dias = models.IntegerField(blank=True, null=True)
    calorias = models.IntegerField(models.CharField(blank=True, null=True))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class RelatorioNutricionista(models.Model):
    consulta = models.ForeignKey(Consulta, on_delete=models.CASCADE)
    dieta = models.ForeignKey(Dieta, on_delete=models.CASCADE)
    detalhes_adicionais = models.CharField(max_length=300, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TreinoFisico(models.Model):
    treino = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class PreparadorFisico(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class RelatorioPreparadorFisico(models.Model):
    NIVEL_DE_ATIVIDADE_FISICA_CHOICES = [
        (0, 'Muito Ativo'),
        (1, 'Ativo'),
        (2, 'Insuficientemente Ativo A'),
        (3, 'Insuficientemente Ativo B'),
        (4, 'Sedentário')
    ]

    consulta = models.ForeignKey(Consulta, on_delete=models.CASCADE)
    treino_fisico = models.ForeignKey(TreinoFisico, on_delete=models.CASCADE)
    massa = models.FloatField(blank=True, null=True)
    altura = models.FloatField(blank=True, null=True)
    nivel_de_atividade_fisica = models.IntegerField(choices=NIVEL_DE_ATIVIDADE_FISICA_CHOICES, blank=True, null=True)
    gasto_calorico = models.IntegerField(blank=True, null=True)
    metabolismo_basal = models.IntegerField(blank=True, null=True)
    porcentagem_de_gordura = models.FloatField(blank=True, null=True)
    porcentage_de_musculo = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class DadosBancariosRecebimento(models.Model):
    profissional = models.IntegerField(choices=OCUPACAO_CHOICES)
    agencia = models.CharField(max_length=4)
    conta = models.CharField(max_length=9)
    digito_verificador = models.CharField(max_length=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
