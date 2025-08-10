from app.services.calculo import calcular_demonstrativo


def test_sem_adicional():
    valores = {"receitas": 60000, "cmv": 30000, "despesas": 10000}
    calc = calcular_demonstrativo(valores)
    assert round(calc["irpj"], 2) == 3000.00
    assert round(calc["csll"], 2) == 1800.00
    assert calc["adicional_ir"] == 0


def test_com_prejuizo_limite():
    valores = {"receitas": 100000, "cmv": 40000, "despesas": 10000}
    calc = calcular_demonstrativo(valores, prejuizo_acumulado=50000)
    assert round(calc["prejuizo_compensado"], 2) == 15000.00
    base_calculo = 35000
    assert round(calc["base_calculo"], 2) == base_calculo
    assert round(calc["adicional_ir"], 2) == 1500.00
